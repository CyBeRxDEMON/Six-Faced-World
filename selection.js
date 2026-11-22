'use strict';

let sourcePreferred = false;
try { sourcePreferred = localStorage.getItem('chronicle.sourceArt') === 'yes' } catch {}
let deckIndex = 0, pins = [], history = [], undoing = false;
const selectionKeys = ['budgetMode','pointLots','bodyDesign','native','attunement','foreign','origin','region','freeLanguage','teachers','teacher',...listGroups,...countGroups];
const isStepped = g => ['specialties','advantages','fates'].includes(g);
function originalPicture(g,id) {
  if(g==='races'&&catalog.races[id]?.sourceId)return ''; 
  if (['races','blessings','curses','companions','fates'].includes(g)) return id;
  if (g === 'ranks') {
    const [track,lev] = id.split('-');
    if (['mana','spirit'].includes(track)) return track+'-'+(+lev ? BOOK.ranks[Math.min(7,+lev)-1].id : track==='mana'?'average':'none');
  }
  return '';
}
function choicePicture(g,id) {
  if(g==='ranks'){const [track,n]=id.split('-');if(+n>7)id=track+'-7'}
  const painting = window.CHOICE_ART[g+'/'+id]||window.DEPTH_ART[g+'/'+id]||(g==='races'?window.DEPTH_ART['dxd/'+catalog.races[id]?.sourceId]:null);
  const original = originalPicture(g,id);
  if (original && (sourcePreferred || !painting)) {
    return {art:original,alt:(catalog[g]?.[id]?.name || id)+' from the original CYOA sheet',title:'Original sheet illustration'};
  }
  return painting;
}
function choiceImage(g,id,cl='') {
  const p=choicePicture(g,id);
  return p ? img(p.art,cl,p.alt || catalog[g]?.[id]?.name || id) : '';
}
function heroDeck() {
  const box=document.querySelector('#lineage-deck');
  const it=BOOK.races[deckIndex], selected=getBuild().races.includes(it.id);
  const cardMarkup='<div class="deck-picture">'+choiceImage('races',it.id,'deck-portrait')+'</div><div class="deck-caption"><h2>'+esc(it.name)+'</h2><span>'+esc(badge('races',it)[0])+'</span></div>';
  box.innerHTML='<div class="deck-stack"><div class="deck-back back-two"></div><div class="deck-back back-one"></div><div class="deck-front">'+cardMarkup+'</div></div><div class="deal-controls">'+bt('turn-deck','‹','deck-arrow','-1','aria-label="Previous lineage"')+bt('select',icon(selected?'check':'plus')+(selected?'Chosen':'Choose lineage'),'deck-take','races|'+it.id,'aria-pressed="'+selected+'"')+bt('turn-deck','›','deck-arrow','1','aria-label="Next lineage"')+'</div>';
}
function readRank(id) {
  const [track,level]=id.split('-'), i=Number(level), school=catalog.schools[track];
  const baseline=track==='mana'?'Average':track==='spirit'?'No spirit':'Untrained';
  const desc=track==='mana'?'You have the mana pool of an average person. It is enough for a few small spells or a swordfight before running out. You may need an external source of mana for anything major.':track==='spirit'?'You cannot turn mana into fighting spirit, no matter how hard you train. You can still purchase fighting styles, but you may find yourself outclassed by trained warriors.':'You have yet to train in this school.';
  if(i>7)return {name:rankName(i),desc:'Extended '+trackLabel(track)+' training, '+(i-7)+' steps beyond God. The total investment is '+tri(i)+' points.',track,level:i};
  return {name:i?BOOK.ranks[i-1].name:baseline,desc:i?(school?school.ranks[i-1]:BOOK.ranks[i-1][track]):desc,track,level:i};
}
function pickInfo(ref) {
  const [g,id]=ref.split('|'), s=getBuild();
  if(g==='ranks'){
    const r=readRank(id);
    return {...r,name:trackLabel(r.track)+' · '+r.name,price:tri(r.level)+' pts total',action:'rank',arg:r.track+'|'+r.level,on:count(s.ranks,r.track)===r.level};
  }
  if(isDepthGroup(g))return sourcePickInfo(g,id);
  const it=catalog[g][id], custom=id==='custom-companion';
  const n=isStepped(g)?count(s[g],id):0;
  const price=g==='fates'?pointLabel(Math.max(0,n+1-ledger(s).fate))+' for next rank':badge(g,it)[0];
  return {...it,price,action:custom?'add-ally':isStepped(g)?'step':'select',arg:ref+(isStepped(g)?'|1':''),on:custom?false:selection(s,g,id),n};
}
function pinButton(g,id) {
  const ref=g+'|'+id, on=pins.includes(ref);
  const name=g==='ranks'?pickInfo(ref).name:catalog[g][id].name;
  const pin=bt('pin-choice',icon('book')+(on?'Pinned':'Pin'),'pin-choice',ref,'aria-label="'+esc((on?'Unpin ':'Pin ')+name+' for comparison')+'" aria-pressed="'+on+'"');
  return '<span class="choice-accessories">'+bt('art-study',icon('eye'),'art-study',ref,'title="Inspect illustrated card" aria-label="'+esc('Inspect '+name+' in 3D')+'"')+pin+'</span>';
}
function toolbar() {
  return '<div class="choice-tools" aria-label="Choice tools">'+bt('deal',icon('dice')+'Draw a choice','tool-chip primary-tool')+bt('compare',icon('book')+'Compare'+(pins.length?' ('+pins.length+')':''),'tool-chip','','aria-label="Compare pinned choices"')+bt('undo-choice','↶ Undo','tool-chip','',history.length?'':'disabled')+'<label class="art-pref"><span>Artwork</span><select data-art-pref aria-label="Artwork preference"><option value="painted" '+(!sourcePreferred?'selected':'')+'>Painted</option><option value="source" '+(sourcePreferred?'selected':'')+'>Prefer originals</option></select></label></div>';
}
function recordPick(oldBuild,newBuild) {
  if(undoing)return;
  const changes=selectionKeys.filter(k=>JSON.stringify(oldBuild[k])!==JSON.stringify(newBuild[k])).map(k=>({k,old:copy(oldBuild[k]),after:copy(newBuild[k])}));
  if(!changes.length)return;
  history.push({actor:editAlly,changes});
  if(history.length>25)history.shift();
}
function clearChoiceSession(){pins=[];history=[]}
function undoPick() {
  const h=history.at(-1);if(!h||h.actor!==editAlly)return;
  if(h.changes.some(c=>JSON.stringify(getBuild()[c.k])!==JSON.stringify(c.after))){notify('This choice has changed since it was made.');return}
  undoing=true;
  history.pop();
  try {
    if(!mutate(s=>{for(const c of h.changes)s[c.k]=copy(c.old)},'Choice undone. Your resources have been restored.')){history.push(h);render()}
  } finally {undoing=false}
}
function describeImpact(before,after) {
  const old=ledger(before,allowance(),editAlly!==null), next=ledger(after,allowance(),editAlly!==null);
  const diff=next.points-old.points;return diff?(diff>0?'+':'−')+Math.abs(diff)+' point'+(Math.abs(diff)===1?'':'s'):'';
}
function runPick(d,act,arg) {
  const [g,id,delta]=arg.split('|');
  if(act==='source-pick')return changeDepthChoice(d,g,id,Number(delta));
  if(act==='select')return selectValue(d,g,id);
  if(act==='step')return stepValue(d,g,id,Number(delta));
  if(act==='rank'){if(+id)d.ranks[g]=+id;else delete d.ranks[g];return}
}
function inspectPick(info) {
  const draft=copy(mainBuild), actor=editAlly===null?draft:draft.custom[editAlly].build;
  if(info.action==='add-ally') {
    if(editAlly!==null)return {error:'Companions cannot recruit another party.'};
    const child=fresh();child.freeLanguage=actor.freeLanguage;child.region=actor.region;
    if(actor.curses.includes('curse-of-hatred'))child.races=actor.races.slice(0,1);
    actor.custom.push({slots:2,build:child});
  }
  const error=runPick(actor,info.action,info.arg)||problem(draft);
  return {error,impact:describeImpact(getBuild(),actor)};
}
function drawChoice(previous='') {
  const eligible=[...document.querySelectorAll('#chapter [data-ref]:not([hidden])')].map(el=>el.dataset.ref).filter(ref=>{
    const it=pickInfo(ref);
    if(it.on && it.action==='source-pick')return false;
    if(it.on && it.action!=='step')return false;
    if(it.action==='rank' && count(getBuild().ranks,it.track)>=it.level)return false;
    return !inspectPick(it).error;
  });
  if(!eligible.length){notify('All the choices on this page are already taken or outside your remaining budget.');return}
  const others=eligible.filter(x=>x!==previous);
  openDialog('deal',pick(others.length?others:eligible));
}
function renderPickDetail(ref,comparison) {
  const [g,id]=ref.split('|'),it=pickInfo(ref), preview=inspectPick(it);
  let label=it.action==='add-ally'?'Create companion':it.action==='step'?'Add one rank':it.action==='rank'?'Set rank':it.on?'Remove':'Choose';
  const locked=it.on&&(it.action==='rank'||g==='origins'||(g==='languages'&&id===getBuild().freeLanguage));
  if(locked)label='Current choice';
  return '<article class="compare-card">'+choiceImage(g,id,'compare-ill')+'<div><h3>'+esc(it.name)+'</h3><span class="cost">'+esc(it.price)+'</span>'+(it.role?'<p class="card-role">'+esc(it.role)+'</p>':'')+'<p>'+esc(it.desc)+'</p>'+(it.hook?'<p>'+esc(it.hook)+'</p>':'')+(g==='origins'?'<p>'+it.boons+' upbringing points covered · '+it.slots+' companion slots</p>':'')+'<p class="impact">'+esc(locked?'Currently selected':preview.error||preview.impact||'Free to choose')+'</p><div class="pick-detail-actions">'+bt(it.action,label,'inscribe',it.arg,locked||preview.error?'disabled':'')+(comparison?bt('pin-choice','Unpin','linkbtn',ref):pinButton(g,id))+'</div></div></article>';
}
function choiceDialog(type,arg){
  if(type==='picks')return picksPage();
  if(type==='art-study')return artStudy(arg);
  if(type==='compare')return centerTitle('Your pinned choices','Compare choices')+(pins.length?'<div class="compare-grid" style="--columns:'+pins.length+'">'+pins.map(ref=>renderPickDetail(ref,true)).join('')+'</div>':'<p>Pin up to three choices from any chapter to see their artwork, abilities, and costs side by side.</p>');
  if(type==='deal')return centerTitle('Drawn from this page','A possible choice')+'<div class="drawn-card">'+renderPickDetail(arg,false)+'</div><div class="button-row">'+bt('redraw',icon('dice')+'Draw again','soft-btn',arg)+bt('close','Return to choices','linkbtn')+'</div>';
  return '';
}
function artStudy(ref){
 const [g,id]=ref.split('|'), info=pickInfo(ref), painting=choicePicture(g,id), original=originalPicture(g,id);
 const flipped=modalState.extra==='turned', showSource=sourcePreferred&&original;
 const rear=original?(showSource?img((window.CHOICE_ART[g+'/'+id]||window.CHOICE_ART[g+'/'+id.replace(/-\d+$/,'-7')]||painting).art,'',info.name):img(original,'','Original CYOA illustration of '+info.name)):'';
 const preview=inspectPick(info),locked=info.on&&(info.action==='rank'||g==='origins'||(g==='languages'&&id===getBuild().freeLanguage));
 const action=locked?'Current choice':info.action==='rank'?'Set rank':info.action==='step'?'Add one rank':info.action==='add-ally'?'Create companion':info.on?'Remove choice':'Choose';
 const front='<div class="study-face study-front">'+choiceImage(g,id)+'<span>'+esc(info.name)+'</span></div>';
 const back='<div class="study-face study-back">'+(rear?rear+'<span>'+(showSource?'Painted edition':'Original sheet illustration')+'</span>':'<div class="engraved-back">'+icon('compass')+'<strong>Six-Faced<br><em>Chronicle</em></strong><small>'+esc(info.name)+'</small></div>')+'</div>';
 const archived=(g==='races'&&['human','elf'].includes(id))?'<figure class="alternate-art">'+img(window.DEPTH_ART['dxd/'+raceSource(id)].art,'','Alternate source illustration')+'<figcaption>Alternate source illustration</figcaption></figure>':'';
 return centerTitle('Illustrated card',info.name)+'<div class="study-layout"><div><div class="study-stage" tabindex="0" aria-label="Three-dimensional card. Use arrow keys to tilt."><div class="study-motion"><div class="study-solid '+(flipped?'turned':'')+'">'+front+back+'</div></div></div><div class="study-tools">'+bt('flip-art',flipped?'Turn to front':rear?(showSource?'Turn to painting':'Turn to original'):'Turn the card','soft-btn',ref)+'<small>Drag or use arrow keys to tilt</small></div></div><div class="study-copy"><span class="cost">'+esc(info.price)+'</span>'+(painting?.title?'<h3>'+esc(painting.title)+'</h3>':'')+'<p>'+esc(info.desc)+'</p>'+(info.hook?'<p>'+esc(info.hook)+'</p>':'') +archived+'<p class="impact">'+esc(locked?'Currently selected':preview.error||preview.impact||'Free to choose')+'</p>'+bt(info.action,action,'gold-btn',info.arg,locked||preview.error?'disabled':'')+'</div></div>';
}
function tiltStudy(stage,x,y){
 const clamp=v=>Math.max(-27,Math.min(27,v));
 stage.style.setProperty('--turn-x',clamp(x)+'deg');stage.style.setProperty('--turn-y',clamp(y)+'deg');
}
let dragging=null;
document.addEventListener('pointerdown',e=>{
 const stage=e.target.closest('.study-stage');if(!stage)return;
 dragging={stage,x:e.clientX,y:e.clientY};stage.setPointerCapture(e.pointerId);
});
document.addEventListener('pointermove',e=>{if(dragging)tiltStudy(dragging.stage,(dragging.y-e.clientY)*.24,(e.clientX-dragging.x)*.24)});
for(const end of ['pointerup','pointercancel'])document.addEventListener(end,()=>{dragging=null});
document.addEventListener('keydown',e=>{
 if(!e.target.matches('.study-stage')||!['ArrowLeft','ArrowRight','ArrowDown','ArrowUp','Home'].includes(e.key))return;
 e.preventDefault();const stage=e.target,x=parseFloat(stage.style.getPropertyValue('--turn-x'))||0,y=parseFloat(stage.style.getPropertyValue('--turn-y'))||0;
 tiltStudy(stage,e.key==='Home'?0:x+(e.key==='ArrowUp'?-5:e.key==='ArrowDown'?5:0),e.key==='Home'?0:y+(e.key==='ArrowLeft'?-5:e.key==='ArrowRight'?5:0));
});
function goToPick(ref){
  const [g,id]=ref.split('|');
  const locations={
    races:['lineage'],origins:['origin','origin','birth'],regions:['origin','origin','birth'],
    advantages:['origin','origin','boons'],languages:['origin','origin','boons'],scenarios:['origin','origin','scenario'],
    specialties:['magic','magic','special'],techniques:['magic','magic','tech'],eyes:['eyes'],
    blessings:['gifts','gifts','blessings'],curses:['gifts','gifts','curses'],companions:['party'],fates:['fate']
  };
  if(isDepthGroup(g)){closeDialog();openSourceChoice(g,id);return}
  let dest=locations[g];if(g==='races')tabs.heritage='species';
  if(g==='ranks'){
    const {track}=readRank(id),martial=['spirit','sword','water','north'].includes(track);
    dest=martial?['martial','martialTrack',track]:['magic','magicTrack',track];
    if(!martial)tabs.magic='ranks';
  }
  if(!dest)return;
  closeDialog();
  if(dest[1])tabs[dest[1]]=dest[2];
  navigate(dest[0],false);
  const card=document.querySelector('#chapter [data-ref="'+ref+'"]');
  if(card){card.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});card.querySelector('button')?.focus({preventScroll:true});card.classList.add('found-choice')}
}
function picksPage(){
  const s=getBuild();
  const groups=[['races','Lineage'],['origins','Family'],['regions','Homeland'],['advantages','Advantages'],['languages','Languages'],['scenarios','Scenarios'],['ranks','Training'],['specialties','Specialties'],['techniques','Advanced magic'],['eyes','Demon eyes'],['blessings','Blessings'],['curses','Curses'],['companions','Companions'],['fates','Fate']];
  let html=centerTitle('Character selections',s.name?s.name+'’s choices':'My choices')+budgetStrip(s,allowance(),editAlly!==null);
  for(const [g,label] of groups){
    const keys=g==='ranks'?Object.entries(s.ranks).map(([k,n])=>k+'-'+n):BOOK[g].filter(it=>selection(s,g,it.id)||(g==='fates'&&(s.weak.includes(it.id)||s.forgo[it.id]))).map(it=>it.id);
    if(!keys.length&&!(g==='companions'&&s.custom.length))continue;
    html+='<section class="pick-group"><h3>'+esc(label)+'</h3><div class="picks-shelf">'+keys.map(id=>{
      const ref=g+'|'+id,it=pickInfo(ref);
      const detail=g==='fates'?(fateBreakdown(s,id).total+'% fate'):g==='eyes'?(s.equipped.includes(id)?'Active':'Dormant'):it.n?'× '+it.n:it.price;
      return bt('go-pick',choiceImage(g,id)+'<span><strong>'+esc(it.name)+'</strong><small>'+esc(detail)+'</small></span>','shelf-pick',ref,'aria-label="'+esc('Review '+it.name)+'"');
    }).join('')+(g==='companions'?s.custom.map((ally,i)=>bt('open-companion',choiceImage('companions','custom-companion')+'<span><strong>'+esc(ally.build.name||'Custom companion')+'</strong><small>'+ally.slots+' slots</small></span>','shelf-pick',i)).join(''):'')+'</div></section>';
  }
  return html+depthShelf(s);
}
document.addEventListener('click',e=>{
  const btn=e.target.closest('button[data-act]');if(!btn||btn.disabled)return;
  const act=btn.dataset.act,arg=btn.dataset.arg;
  if(act==='turn-deck'){deckIndex=(deckIndex+Number(arg)+BOOK.races.length)%BOOK.races.length;heroDeck();document.querySelector('#lineage-deck [data-arg="'+arg+'"]').focus({preventScroll:true})}
  if(act==='pin-choice'){
    if(pins.includes(arg))pins=pins.filter(x=>x!==arg);
    else if(pins.length>=3){notify('Three choices are pinned. Unpin one to make room.');return}
    else pins.push(arg);
    renderChapter();if(modalState)renderDialog();
    const scope=modalState?document.querySelector('#modal'):document.querySelector('#chapter');
    scope.querySelector('[data-act="pin-choice"][data-arg="'+arg+'"]')?.focus({preventScroll:true});
    notify(pins.includes(arg)?'Pinned for comparison.':'Pin removed.');
  }
  if(act==='compare')openDialog('compare');
  if(act==='art-study')openDialog('art-study',arg);
  if(act==='flip-art'){
    modalState.extra=modalState.extra==='turned'?'':'turned';
    const flipped=modalState.extra==='turned', [g,id]=arg.split('|');
    document.querySelector('.study-solid').classList.toggle('turned',flipped);
    btn.textContent=flipped?'Turn to front':originalPicture(g,id)?(sourcePreferred?'Turn to painting':'Turn to original'):'Turn the card';
  }
  if(act==='picks')openDialog('picks');
  if(act==='go-pick')goToPick(arg);
  if(act==='open-companion'){closeDialog();clearChoiceSession();editAlly=Number(arg);current='lineage';tabs={};render();focusChoices()}
  if(act==='deal'||act==='redraw')drawChoice(act==='redraw'?arg:'');
  if(act==='undo-choice')undoPick();
});
document.addEventListener('change',e=>{
  if(!e.target.matches('[data-art-pref]'))return;
  sourcePreferred=e.target.value==='source';
  try{localStorage.setItem('chronicle.sourceArt',sourcePreferred?'yes':'no')}catch{}
  render();document.querySelector('[data-art-pref]')?.focus({preventScroll:true});
});
const narrowChoices = matchMedia('(max-width:800px)');
function placeExtras(){
 const tools=document.querySelector('.sidefoot');
 (narrowChoices.matches?document.querySelector('#mobile-extras'):document.querySelector('.contents')).append(tools);
}
placeExtras();
narrowChoices.addEventListener('change',placeExtras);
const deckSurface=document.querySelector('#lineage-deck');
let deckTouch=null;
deckSurface.addEventListener('pointermove',e=>{
 if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const r=deckSurface.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
 deckSurface.style.setProperty('--deck-x',(-y*12+4).toFixed(2)+'deg');
 deckSurface.style.setProperty('--deck-y',(x*20-7).toFixed(2)+'deg');
});
deckSurface.addEventListener('pointerleave',()=>{deckSurface.style.removeProperty('--deck-x');deckSurface.style.removeProperty('--deck-y')});
deckSurface.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&e.target.closest('.deck-stack'))deckTouch=[e.clientX,e.clientY];});
deckSurface.addEventListener('pointercancel',()=>{deckTouch=null});
deckSurface.addEventListener('pointerup',e=>{
 if(!deckTouch)return;
 const dx=e.clientX-deckTouch[0],dy=e.clientY-deckTouch[1];deckTouch=null;
 if(Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy)*1.5){deckIndex=(deckIndex+(dx<0?1:-1)+BOOK.races.length)%BOOK.races.length;heroDeck()}
});

