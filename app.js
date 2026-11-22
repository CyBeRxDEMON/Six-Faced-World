'use strict';
const paths={
  feather:'<path d="M3 21c4-6 9-11 16-16M6 16C4 5 16 1 21 3c0 9-5 17-15 13Zm6-4 5 0"/>',
  dice:'<rect x="3" y="3" width="18" height="18" rx="4"/><g fill="currentColor" stroke="none"><circle cx="7.5" cy="7.5" r="1.4"/><circle cx="16.5" cy="7.5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="7.5" cy="16.5" r="1.4"/><circle cx="16.5" cy="16.5" r="1.4"/></g>',
  book:'<path d="M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2zM12 6v15"/>',
  index:'<path d="M5 5h15v15H5zM8 5v15M11 9h6m-6 4h5"/>',
  pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0z"/><circle cx="12" cy="10" r="2"/>',
  gem:'<path d="m3 9 4-6h10l4 6-9 12zm0 0h18M7 3l5 18 5-18"/>',
  leaf:'<path d="M5 19c-4-9 5-15 15-15-1 10-7 16-14 13m-2 4 12-13"/>',
  people:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m3 9v-2a6 6 0 0 0-2-5"/>',
  star:'<path d="m12 2 2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3z"/>',
  lineage:'<path d="M7 2c0 10 10 10 10 20M17 2c0 10-10 10-10 20M8 5h8M9 8h6M9 16h6m-7 3h8"/>',
  mountain:'<path d="m2 20 7-14 5 9 3-6 5 11zm4-8 3 2 2-3"/>',
  magic:'<path d="m3 21 12-12m-3-1 4 4m0-10 1 3 3 1-3 1-1 3-1-3-3-1 3-1zm4 12 1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/>',
  swords:'<path d="m3 3 5 2 12 14-2 2L5 7zM3 20l6-6m6-6 4-5h3l-1 4-5 5M3 15l5 5m8-1 4-4"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.7"/>',
  moon:'<path d="M19.5 15.5a8.6 8.6 0 0 1-11-11 8.7 8.7 0 1 0 11 11ZM17 3v5m-2.5-2.5h5"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m16 7-2 7-6 3 2-7z"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  list:'<path d="M4 6h2m3 0h11M4 12h2m3 0h11M4 18h2m3 0h11"/>',
  check:'<path d="m4 12 5 5L20 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',x:'<path d="m6 6 12 12M18 6 6 18"/>',
  map:'<path d="m2 5 6-2 8 3 6-2v15l-6 2-8-3-6 2zm6-2v15m8-12v15"/>',
  save:'<path d="M4 3h13l4 4v14H3V3zm3 0v7h9V3M7 21v-8h10v8"/>',
  scroll:'<path d="M7 3h12a2 2 0 0 1 2 2v3h-4V5a2 2 0 0 0-4 0v14a2 2 0 0 1-4 0v-3H3v2a3 3 0 0 0 3 3h5M7 3h8"/>',
  lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'
};
const icon=k=>'<svg class="ic" aria-hidden="true" viewBox="0 0 24 24">'+(paths[k]||paths.star)+'</svg>';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const asset=filename=>window.embeddedAsset?window.embeddedAsset(filename):filename;
function img(id,cl='',alt=''){
 const slug=id==='crystalized-mana'?'crystallized-mana':raceArt(id)||id, size=window.ART_SIZES[slug]||window.DEPTH_SIZES[slug];
 const dimensions=size?' width="'+size[0]+'" height="'+size[1]+'"'+(cl==='card-img'?' style="aspect-ratio:auto '+size[0]+' / '+size[1]+'"':''):'';
 return '<img loading="'+(cl==='deck-portrait'?'eager':'lazy')+'"'+dimensions+' class="'+cl+'" src="'+asset('art/'+slug+'.webp')+'" alt="'+esc(alt)+'">';
}
const bt=(act,label,cls='soft-btn',arg='',more='')=>'<button class="'+cls+'" data-act="'+act+'" data-arg="'+esc(arg)+'" '+more+'>'+label+'</button>';
const key='six-faced-chronicle.v1';
let mainBuild=fresh(),shelf=[],editAlly=null,current='lineage',listView=false,tabs={},modalState=null,randomDraft=null,toastTimer,storageFailed=false;
function getBuild(){return editAlly===null?mainBuild:mainBuild.custom[editAlly].build}
function allowance(){return editAlly===null?100:50+25*(mainBuild.custom[editAlly].slots-2)}
function unpack(payload){
  if(payload?.edition!==1||!payload.build)throw Error('Choose a Six-Faced Chronicle character file.');
  const build=normalized(payload.build),error=problem(build);if(error)throw Error(error);
  return {build};
}
try{
  const saved=JSON.parse(localStorage.getItem(key)||'null');
  if(saved){const loaded=unpack(saved);mainBuild=loaded.build;shelf=(Array.isArray(saved.shelf)?saved.shelf:[]).flatMap(x=>{try{return [{edition:1,build:unpack(x).build,savedAt:x.savedAt}]}catch{return []}}).slice(0,20);listView=!!saved.listView}
}catch{}
function payload(){return {edition:1,build:copy(mainBuild)}}
function persist(){try{localStorage.setItem(key,JSON.stringify({...payload(),shelf,listView}));storageFailed=false}catch{storageFailed=true;notify('Browser storage is unavailable. Export your grimoire to keep a copy.')}}
function notify(message){
  const toast=document.querySelector('#toast'),dialog=document.querySelector('#modal');
  (dialog.open?document.querySelector('.dialog-shell'):document.body).append(toast);toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),4200);
}
const chapters=[
 ['lineage','Species & hybrids','lineage','Choose your ancestry','Select one race, or combine several at full cost to create a rare hybrid.'],
 ['body','Physical build','people','Design your physical build','Choose the frame, features, colors, and distinguishing details of your grown character.'],
 ['rules','Rules & points','gem','Set your starting points','Choose the starting balance shared by all of your selections.'],
 ['origin','Origins','mountain','Set your origins','Choose a family, a homeland, and the advantages that shape your childhood.'],
 ['magic','Magic','magic','Study the arcane arts','Build your mana pool and train in the schools of elemental, holy, and summoning magic.'],
 ['martial','Fighting spirit','swords','Train your fighting spirit','Choose your reserves of fighting spirit and learn the forms of the three great sword schools.'],
 ['sourcebooks','Talents & relics','book','Choose talents and relics','Find an ability by what you want your character to do, from healing a companion to shaping a new element.'],
 ['eyes','Demon eyes','eye','Awaken your demon eyes','Acquire as many eyes as your points allow. Keep up to two active at a time.'],
 ['gifts','Blessings & curses','moon','Choose your gifts','Discover the gifts and burdens your soul will carry into this life.'],
 ['party','Companions','people','Gather your companions','Recruit someone from the Six-Faced World or create an ally with a life and abilities of their own.'],
 ['fate','Fate','compass','Weave your fate','Shape the chances that follow you through the world. Each field rewards a different kind of life.']
];
const schoolArt={elemental:'elemental-magic',holy:'holy-magic',arrays:'summoning-magic-arrays',sword:'sword-god-style',water:'water-god-style',north:'north-god-style'};
const roman=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
function selection(s,g,id){if(isDepthGroup(g))return editionCount(s,g,id)>0;if(g==='origins')return s.origin===id;if(g==='regions')return s.region===id;if(g==='languages'&&s.freeLanguage===id)return true;return Array.isArray(s[g])?s[g].includes(id):!!s[g]?.[id]}
function badge(g,it){
  if(g==='languages'&&getBuild().freeLanguage===it.id)return ['First language',true];
  if(g==='curses')return ['+'+it.cost+' pts',true];
  if(g==='companions')return [it.id==='custom-companion'?'2–4 places':ledger(getBuild(),allowance(),editAlly!==null).slots?'Included':'1 pt',false];
  if(['regions','advantages','languages'].includes(g)&&it.cost){const b=ledger(getBuild(),allowance(),editAlly!==null);const credit=b.boons+(selection(getBuild(),g,it.id)?it.cost:0);return [Math.max(0,it.cost-credit)?Math.max(0,it.cost-credit)+' pts':'Included',credit>=it.cost]} const unit='pt';
  return [it.cost?it.cost+' '+unit+(it.cost===1?'':'s'):'Free',!it.cost]
}
function card(g,it){
 const s=getBuild(), id=it.id, selected=selection(s,g,id), illustration=choicePicture(g,id), [price,free]=badge(g,it), custom=id==='custom-companion';
 const label=custom?'Create companion':selected?(g==='origins'||(g==='languages'&&id===s.freeLanguage)?'Current choice':'Selected'):(g==='companions'?'Recruit':'Choose');
 const benefit=g==='origins'?it.boons+' upbringing points covered · '+it.slots+' companion slot'+(it.slots===1?'':'s'):it.role||'';
 const artButton=illustration?bt(custom?'add-ally':'select',choiceImage(g,id,'card-img')+'<span class="corner-pick">'+icon(selected?'check':'plus')+'</span>','art-pick',g+'|'+id,'aria-label="'+esc(label+' '+it.name+' from illustration')+'" '+(custom?'':'aria-pressed="'+selected+'"')):'';
 const action=bt(custom?'add-ally':'select',icon(selected?'check':'plus')+'<span>'+label+'</span>','inscribe',g+'|'+id,(custom?'':'aria-pressed="'+selected+'" ')+'aria-label="'+esc(label+' '+it.name+', '+price)+'"');
 return '<article data-ref="'+g+'|'+esc(id)+'" data-choice="'+esc(id)+'" class="choice '+(selected?'selected ':'')+(illustration?'illustrated':'noimg')+'"><div class="plate-title"><h3>'+esc(it.name)+'</h3><span class="cost '+(free?'free':'')+'">'+price+'</span></div>'+(illustration?'<figure class="art-mat">'+artButton+'</figure>':'')+'<div class="cardcopy">'+(benefit?'<div class="card-role">'+esc(benefit)+'</div>':'')+'<p>'+esc(it.desc)+'</p>'+(g==='races'?raceNotes(it):'')+(it.hook?'<p class="character-hook">'+esc(it.hook)+'</p>':'')+'</div><div class="plate-foot">'+action+pinButton(g,id)+'</div></article>';
}
function cards(g,items=BOOK[g]){return '<div class="cardgrid '+g+'-plates '+(listView?'listview':'')+'">'+items.map(it=>card(g,it)).join('')+'</div>'}
function jewel(id){
 const palette={gem:['#fff1ba','#eac37f','#ac773f','#725039'],leaf:['#d6f6d4','#89c8a2','#488e77','#375951'],people:['#e1edff','#9ac1e6','#6c91b5','#494e77'],star:['#f0e1ff','#c9a6e7','#9774bd','#554e79']}[id];
 const [a,b,c,d]=palette;return '<svg class="facet-emblem" viewBox="0 0 48 48" aria-hidden="true"><path d="M6 17 15 6h18l9 11-18 25z" fill="'+d+'" stroke="'+b+'" stroke-width="1.3"/><path d="m6 17 9-11 4 11z" fill="'+b+'"/><path d="m15 6 9 0-5 11z" fill="'+a+'"/><path d="m24 6 9 0-4 11-10 0z" fill="'+b+'"/><path d="m33 6 9 11H29z" fill="'+c+'"/><path d="m6 17 13 0 5 25z" fill="'+c+'"/><path d="m19 17h10l-5 25z" fill="'+b+'"/><path d="m29 17 13 0-18 25z" fill="'+d+'"/><path d="m7 17 34 0M15 7l4 10 5 23" fill="none" stroke="'+a+'" stroke-width=".8" opacity=".8"/></svg>'
}
function renderLedger(){
 const b=ledger(getBuild(),allowance(),editAlly!==null);
 const s=getBuild(),names=s.races.map(id=>catalog.races[id].name);
 const caption=s.name|| (names.length>1?'Hybrid ancestry':names[0]||'Your character');
 document.querySelector('#ledger').innerHTML='<button class="resource balance-main" data-act="chapter" data-arg="rules" aria-label="Set starting points. '+b.points+' points available"><div class="gem" style="--tone:#e1bd78">'+jewel('gem')+'</div><div class="res-body"><strong>'+b.points.toLocaleString()+'</strong><span class="res-label"> Points available</span></div></button><div class="ledger-character"><strong>'+esc(caption)+'</strong>'+(names.length>1?'<small>'+esc(names.join(' × '))+'</small>':'')+'</div>'+bt('picks','My choices','outline-btn');
}
function tabsBar(key,entries,def=entries[0][0]){
 const selected=tabs[key]||def;
 return '<div class="subtabs" aria-label="'+esc(key)+' options">'+entries.map(([id,name])=>bt('tab',esc(name),id===selected?'on':'',key+'|'+id,'aria-pressed="'+(id===selected)+'"')).join('')+'</div>'
}
function inputField(label,key,type='text',range=''){
 const val=getBuild()[key],basic='data-field="'+key+'" '+range;
 if(type==='textarea')return '<label class="field">'+label+'<textarea maxlength="1500" '+basic+'>'+esc(val)+'</textarea></label>';
 return '<label class="field">'+label+'<input type="'+type+'" maxlength="'+(['name','epithet'].includes(key)?70:1500)+'" '+basic+' value="'+esc(val)+'"></label>';
}
function dropdown(label,k,data,chosen){return '<label class="field">'+label+'<select data-field="'+k+'">'+data.map(it=>'<option value="'+it.id+'" '+(it.id===chosen?'selected':'')+'>'+esc(it.name)+'</option>').join('')+'</select></label>'}
function step(g,id,n){return '<div class="stepper">'+bt('step','−','',g+'|'+id+'|-1','aria-label="Decrease '+esc(catalog[g]?.[id]?.name||id)+'" '+(!n?'disabled':''))+'<span>'+n+'</span>'+bt('step','+','',g+'|'+id+'|1','aria-label="Increase '+esc(catalog[g]?.[id]?.name||id)+'"')+'</div>'}
function stepItem(g,it){const n=count(getBuild()[g],it.id);return '<div data-ref="'+g+'|'+it.id+'" class="step-row illustrated-step '+(n?'purchased':'')+'">'+bt('step',choiceImage(g,it.id,'step-img'),'step-picture',g+'|'+it.id+'|1','aria-label="Add one '+esc(it.name)+'"')+'<div><strong>'+esc(it.name)+'</strong> <span class="cost">'+(g==='advantages'?(Math.max(0,it.cost-ledger(getBuild(),allowance(),editAlly!==null).boons)||'Included'):(it.cost+' pts'))+'</span><p>'+esc(it.desc)+'</p>'+(g==='specialties'&&n?'<p>Effective rank · '+rankName(n+count(getBuild().ranks,it.school))+'</p>':'')+'<div class="step-actions">'+step(g,it.id,n)+pinButton(g,it.id)+'</div></div></div>'}
function renderOrigin(s){
 const t=tabs.origin||'birth';
 let html=tabsBar('origin',[['birth','Birth & homeland'],['boons','Advantages & languages'],['scenario','Scenarios']]);
 if(t==='birth')return html+'<h3 class="section-title">Family circumstances</h3><p class="hint">Your origin covers upbringing costs and grants places in your party. Additional choices use character points.</p>'+cards('origins')+'<h3 class="section-title">Homeland</h3><p class="hint">'+bt('atlas',icon('map')+'Explore the world map','linkbtn')+'</p>'+cards('regions');
 if(t==='boons')return html+'<div class="block">'+BOOK.advantages.filter(it=>editAlly===null||it.id!=='connections').map(it=>stepItem('advantages',it)).join('')+'</div>'+(s.advantages.teacher?Array.from({length:s.advantages.teacher},(_,i)=>dropdown('Teacher '+(i+1)+' · school','teacher-'+i,BOOK.schools,s.teachers[i]||s.teacher)).join(''):'')+(s.advantages.gear?inputField('Describe your equipment','gear','textarea'):'')+'<h3 class="section-title">Languages</h3>'+dropdown('Your free language','freeLanguage',BOOK.languages,s.freeLanguage)+'<p class="hint">Each additional language uses one included upbringing point, then one character point.</p>'+cards('languages');
 return html+cards('scenarios',BOOK.scenarios.filter(it=>editAlly===null||it.id!=='multiplayer'))+(s.scenarios.includes('alternate-era')?inputField('Arrival year · K330 to K507','era','number','min="330" max="507"'):'')+(s.scenarios.includes('quick-start')?inputField('Starting age','age','number','min="0" max="9999"'):'');
}
function rankPanel(id){
 const s=getBuild(), n=count(s.ranks,id), school=catalog.schools[id],label=trackLabel(id);
 const intro=school?banner(schoolArt[id],school.desc,school.name):'';
 return intro+'<div class="track-current"><strong>'+esc(label)+' · '+esc(printedRank(id,n))+'</strong>'+bt('jump-ascension','Beyond God rank','outline-btn',id)+'</div><div class="rank-plates">'+Array.from({length:8},(_,i)=>{
  const {name,desc:description}=readRank(id+'-'+i);
  const art=bt('rank',choiceImage('ranks',id+'-'+i,'rank-illustration'),'rank-art',id+'|'+i,'aria-label="Set '+esc(label+' to '+name)+'"');
  return '<article data-ref="ranks|'+id+'-'+i+'" class="rank-leaf '+(i===n?'active':'')+'">'+art+'<div class="rank-leaf-body"><div class="rank-line"><h4>'+name+'</h4><span class="cost">'+tri(i)+' pts total</span></div><p>'+esc(description)+'</p><div class="rank-actions">'+bt('rank',icon(i===n?'check':'plus')+(i===n?'Current rank':i<n?'Return to this rank':'Train to this rank'),'inscribe',id+'|'+i,'aria-pressed="'+(i===n)+'" aria-label="'+esc(label+', '+name+', '+tri(i)+' points total')+'"')+pinButton('ranks',id+'-'+i)+'</div></div></article>'
 }).join('')+'</div>'+beyondPanel(id);
}
function trackSection(id,options){const selected=tabs[id]||options[0];return '<div class="track-deck">'+options.map(k=>bt('tab',(['elemental','holy','arrays'].includes(k)?choiceImage('chapter',k):schoolArt[k]?img(schoolArt[k],'',trackLabel(k)):choiceImage('ranks',k+'-4'))+'<span>'+esc(trackLabel(k))+'</span>',k===selected?'on':'',id+'|'+k,'aria-pressed="'+(k===selected)+'"')).join('')+'</div>'+rankPanel(selected)}
function renderMagic(s){
 const t=tabs.magic||'ranks';let html=tabsBar('magic',[['ranks','Mana & schools'],['special','Specialties'],['tech','Advanced techniques']]);
 if(t==='ranks')return html+'<p class="rules">Each rank includes all earlier ranks. Prices below show the total investment.</p>'+trackSection('magicTrack',['mana','elemental','holy','arrays']);
 return html+(t==='special'?'<p class="rules">Each purchase raises one specialty a rank above its school, including beyond God rank.</p>':'<p class="rules">Unlock an advanced practice. Its strength scales with your talent in the related school.</p>')+BOOK.schools.filter(it=>it.kind==='magic').map(it=>'<div class="school-heading">'+choiceImage('chapter',it.id)+'<h3>'+esc(it.name)+'</h3></div>'+(t==='special'?'<div class="block">'+BOOK.specialties.filter(x=>x.school===it.id).map(x=>stepItem('specialties',x)).join('')+'</div>':cards('techniques',BOOK.techniques.filter(x=>x.school===it.id)))).join('');
}
function banner(id,txt,title){return '<div class="block rankintro">'+img(id,'',title)+'<div><h3>'+esc(title)+'</h3><p>'+esc(txt)+'</p></div></div>'}
function renderChapter(){
 if(current==='lab'||current==='studio'){renderWorkshopPage();return}
 const oldRelic=document.querySelector('#lab-relic');if(oldRelic)window.Relic?.unmount(oldRelic);
 const s=getBuild(),idx=chapters.findIndex(c=>c[0]===current),[id,title,,heading,lede]=chapters[idx],b=ledger(s,allowance(),editAlly!==null);
 document.querySelector('#chapters').innerHTML=chapters.filter(c=>editAlly===null||c[0]!=='party').map(c=>bt('chapter',icon(c[2])+esc(c[1]),'chapterlink '+(current===c[0]?'active':''),c[0],current===c[0]?'aria-current="step"':'')).join('');
 let body='';
 if(id==='body')body=physicalPage(s);
 if(id==='rules')body=fundingPage(s);
 if(id==='sourcebooks')body=sourcebookPage(s);
 if(id==='lineage')body=ancestryPage(s)+reading('Reincarnation and hybrid lineages',[BOOK_ONE.rules.premise,BOOK_ONE.rules.points,BOOK_ONE.rules.races])+(!Number.isInteger(editAlly)?inputField('Character name (optional)','name')+inputField('Describe your appearance (optional)','appearance','textarea'):'');
 if(id==='origin')body=renderOrigin(s);
 if(id==='magic')body=renderMagic(s)+bookDoor('Browse sorcery & miracles','spellcraft')+reading('How magical training works',[BOOK_ONE.rules.mana,BOOK_ONE.rules.magic,BOOK_ONE.rules.ranks,BOOK_ONE.rules.advancedMagic]);
 if(id==='martial')body='<p class="rules">Each rank includes all earlier ranks. Your styles and fighting spirit advance independently.</p>'+trackSection('martialTrack',['spirit','sword','water','north'])+inputField('Describe your personal fighting style (optional)','style','textarea');
 if(id==='martial')body+=bookDoor('Browse ascension & power growth','growth')+reading('How martial training works',[BOOK_ONE.rules.spirit,BOOK_ONE.rules.martial,BOOK_ONE.rules.ranks]);
 if(id==='eyes')body=banner('demon-eyes',window.BOOK_TWO.rules.eyes,'The Demon Empress’s gift')+(s.eyes.length?'<h3 class="section-title">Active eyes · '+s.equipped.length+' / 2</h3><div class="subtabs">'+s.eyes.map(k=>bt('equip',esc(catalog.eyes[k].name)+(s.equipped.includes(k)?' ✓':''),s.equipped.includes(k)?'on':'',k,'aria-pressed="'+s.equipped.includes(k)+'"')).join('')+'</div>':'')+cards('eyes');
 if(id==='gifts'){let g=tabs.gifts||'blessings';body=tabsBar('gifts',[['blessings','Blessings'],['curses','Curses']])+banner(g,window.BOOK_TWO.rules[g],g==='curses'?'A bargain with fate':'The Blessed Ones')+cards(g)+(g==='blessings'&&s.blessings.includes('unaging')?inputField('Age at which time stops','unaging','number','min="0" max="9999"'):'')}
 if(id==='party')body='<div class="rules">Your origin covers your first party places. Each additional place costs one character point. '+esc(window.BOOK_TWO.rules.companions.replace('determine your companion slots','determine how many companion places are covered'))+'</div>'+s.custom.map((c,i)=>'<div class="block"><h3>'+esc(c.build.name||'Custom companion')+'</h3><p>'+c.slots+' slots · '+(50+25*(c.slots-2))+' character points</p><div class="button-row">'+bt('edit-ally','Edit companion','linkbtn',i)+bt('ally-slot','Change slot budget','linkbtn',i)+bt('remove-ally','Remove','linkbtn',i)+'</div></div>').join('')+cards('companions');
 if(id==='fate')body=renderFates(s,b)+reading('Fate, fortune, and childhood',[BOOK_TWO.rules.fates,BOOK_TWO.rules.companionFate,BOOK_TWO.rules.weakFate,BOOK_TWO.rules.childhood]);
 const next=chapters.slice(idx+1).find(c=>editAlly===null||c[0]!=='party');
 document.querySelector('#chapter').innerHTML=(editAlly!==null?'<div class="note">Companion build · '+esc(s.name||'New companion')+' · '+bt('end-ally','Return to your character','linkbtn')+'</div>':'')+'<div class="eyebrow">Chapter '+roman[idx]+' <span aria-hidden="true">/</span> '+esc(title)+'</div><div class="chapter-head"><h2>'+heading+'</h2>'+(['lineage','origin','eyes','gifts','party'].includes(id)?'<div class="viewSwitch">'+bt('view',icon('grid'),'iconbtn '+(!listView?'on':''),'grid','title="Card view" aria-label="Card view" aria-pressed="'+!listView+'"')+bt('view',icon('list'),'iconbtn '+(listView?'on':''),'list','title="List view" aria-label="List view" aria-pressed="'+listView+'"')+'</div>':'')+'</div><p class="lede">'+lede+'</p>'+(['rules','body'].includes(id)?depthUndoTool():toolbar())+(editAlly!==null&&id==='lineage'?inputField('Companion’s name','name')+inputField('Family, appearance, and personality','personality','textarea'):'')+body+'<div class="chapter-next"><span>'+(['lineage','origin'].includes(id)?(id==='lineage'?s.races.length+' selected':catalog.origins[s.origin].name):'Chapter '+roman[idx]+' of '+roman[chapters.length-1])+'</span>'+bt(next?'chapter':editAlly!==null?'end-ally':'grimoire',next?'Continue to '+next[1].toLowerCase():editAlly!==null?'Return to your character':'Review your grimoire','outline-btn',next?.[0]||'')+'</div>';
 if(id==='sourcebooks')filterSourceCards();
 if(id==='body')window.ChronicleFigure?.mount(document.querySelector('#body-preview'),s.bodyDesign);

}
function renderFates(s,b){
 return banner('weak-fate','Four fate steps are included. Further steps cost one point each. Weaken an untouched field to cover another step. Characters without curses gain +25% across all fields.','Threads of fortune')+(b.slots?'<p class="rules">'+b.unassigned+' unused companion slot'+(b.unassigned===1?'':'s')+' available to dedicate. Each adds 2% to one field.</p>':'')+BOOK.fates.map(f=>{
 const d=fateBreakdown(s,f.id),n=count(s.fates,f.id),w=s.weak.includes(f.id);
 return '<article data-ref="fates|'+f.id+'" class="fate-panel">'+choiceImage('fates',f.id)+'<div class="fate-content"><div class="fate-head"><h3>'+f.name+'</h3><span class="cost">'+(d.total>=0?'+':'')+d.total+'%</span></div><p>'+esc(f.desc)+'</p><div class="fate-controls">'+step('fates',f.id,n)+bt('weak',w?'Weak fate ✓':'Weaken','soft-btn '+(w?'selected-control':''),f.id,'aria-pressed="'+w+'"')+(b.slots?bt('dedicate','Dedicate slot'+(s.forgo[f.id]?' · '+s.forgo[f.id]:''),'linkbtn',f.id):'')+(s.forgo[f.id]?bt('reclaim','Reclaim slot','linkbtn',f.id):'')+bt('fate-info','Breakdown','linkbtn',f.id)+pinButton('fates',f.id)+'</div></div></article>'}).join('')+inputField('Your quest or lifelong ambition','quest','textarea');
}
function render(){heroDeck();renderLedger();renderChapter();refreshRelics();refreshNavigation()}
function reading(title,paragraphs){return '<section class="reading"><h3>'+icon('book')+esc(title)+'</h3>'+paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')+'</section>'}
function focusChoices(){document.getElementById('forge').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})}
function navigate(id,scroll=true){if(!chapters.some(c=>c[0]===id))return;current=id;renderChapter();refreshNavigation();if(scroll){focusChoices();document.getElementById('chapter').focus({preventScroll:true})}}
function mutate(fn,msg=''){
 const before=document.activeElement,focusAction=before?.dataset.act,focusArg=before?.dataset.arg;
 const focusScope=before?.closest('dialog')?'#modal':before?.closest('#lineage-deck')?'#lineage-deck':'#chapter';
 const draft=copy(mainBuild),s=editAlly===null?draft:draft.custom[editAlly].build,err=fn(s,draft);if(typeof err==='string'&&err){notify(err);return false}
 const invalid=problem(draft);if(invalid){notify(invalid);return false}
 const impact=describeImpact(getBuild(),s);recordPick(getBuild(),s);
 mainBuild=draft;persist();render();if(modalState)renderDialog();
 if(focusAction){const scope=document.querySelector(focusScope);const next=[...scope.querySelectorAll('button')].find(el=>el.dataset.act===focusAction&&el.dataset.arg===focusArg);next?.focus({preventScroll:true})}
 if(msg||impact)notify(msg||impact);return true;
}
function toggle(a,id){const i=a.indexOf(id);if(i<0)a.push(id);else a.splice(i,1)}
function selectValue(s,g,id){
 if(g==='races'&&!s.races.includes(id)){
   if(id==='youkai'&&s.races.includes('nine-tailed-kitsune'))return 'Nine-Tailed Kitsune already includes Youkai ancestry.';
   if(id==='nine-tailed-kitsune')s.races=s.races.filter(k=>k!=='youkai');
  }
  if(g==='origins'){s.origin=id;return}
 if(g==='regions'){s.region=s.region===id?'':id;return}
 if(g==='languages'&&s.freeLanguage===id)return 'Use the free-language menu to change your first language.';
 if(g==='eyes'){toggle(s.eyes,id);if(s.eyes.includes(id)&&s.equipped.length<2)s.equipped.push(id);if(!s.eyes.includes(id))s.equipped=s.equipped.filter(x=>x!==id);return}
 toggle(s[g],id);
}
function changeSelection(g,id){return mutate(s=>selectValue(s,g,id))}
function stepValue(s,g,id,delta){const n=count(s[g],id)+delta;if(n<0)return 'This choice is already at zero.';if(g==='advantages'&&n>(catalog[g][id].max||128))return 'You have reached the limit for this advantage.';if(n)s[g][id]=n;else delete s[g][id];if(g==='advantages'&&id==='teacher'){s.teachers=Array.from({length:n},(_,i)=>s.teachers[i]||s.teacher)}}
function bump(g,id,delta){return mutate(s=>stepValue(s,g,id,delta))}
function centerTitle(k,title){return '<div class="eyebrow">'+esc(k)+'</div><h2 id="modal-title">'+esc(title)+'</h2>'}
function summary(s){return buildSummary(s).map(([k,v])=>'<div class="summary-row"><span>'+esc(k)+'</span><b>'+esc(v)+'</b></div>').join('')}
function budgetStrip(s,base=100,ally=false){const b=ledger(s,base,ally);return '<div class="balance-strip"><b>'+b.points.toLocaleString()+' points available</b><span>'+startingPoints(s,base,ally).toLocaleString()+' starting points</span></div>'}
function openDialog(type,arg='',extra=''){
 modalState={type,arg,extra};const d=document.querySelector('#modal');if(!d.open)d.showModal();renderDialog();d.scrollTop=0
}
function closeDialog(){modalState=null;const d=document.querySelector('#modal');if(d.open)d.close()}
function confirmPanel(title,body,act,arg='',back='close'){return centerTitle('Grimoire',title)+'<p>'+esc(body)+'</p><div class="actions">'+bt(act,'Confirm','gold-btn',arg)+bt(back,'Cancel')+'</div>'}
function renderDialog(){
 if(!modalState)return;const {type,arg,extra}=modalState,s=getBuild();let html=type==='sources'?sourcesPage():choiceDialog(type,arg);
 if(type==='atlas'){
 const chosen=arg||s.region||'central-north',r=catalog.regions[chosen],coords={'central-north':[19,21],'central-south':[35,68],millis:[85,77],begaritt:[19,78],demon:[83,24]};
 html=centerTitle('Six-Faced World','World atlas')+'<div class="atlas-map">'+img('world-map','','Map of the Six-Faced World')+BOOK.regions.map((it,i)=>bt('atlas-region',icon('pin'),'pin '+(chosen===it.id?'on':''),it.id,'style="left:'+coords[it.id][0]+'%;top:'+coords[it.id][1]+'%" aria-label="'+esc(it.name)+'"')).join('')+'</div><div class="subtabs">'+BOOK.regions.map(it=>bt('atlas-region',esc(it.name),it.id===chosen?'on':'',it.id)).join('')+'</div>'+choiceImage('regions',chosen,'atlas-scenery')+'<h3>'+esc(r.name)+'</h3><p>'+esc(r.desc)+'</p><div class="actions">'+bt('atlas-choose',s.region===chosen?'Chosen homeland ✓':'Choose homeland · '+(r.cost?r.cost+' boon'+(r.cost>1?'s':''):'Free'),'gold-btn',chosen)+bt('close','Close atlas')+'</div>';
 }
 if(type==='archive'){
 const n=arg==='2'?'2':'1';html=centerTitle('Original edition · v1.1','The source sheets')+'<p>The complete illustrated CYOA by 53413760. Choose a sheet and zoom in to read its original wording.</p><div class="archive-tabs">'+bt('sheet','I · Reincarnation','soft-btn '+(n==='1'?'selected-control':''),'1')+bt('sheet','II · Gifts & fate','soft-btn '+(n==='2'?'selected-control':''),'2')+bt('zoom',extra?'Fit to width':'Zoom to original','outline-btn')+'</div><div class="sheetbox '+(extra?'zoom':'')+'"><img src="'+asset('art/sheet-'+n+'.jpg')+'" alt="Mushoku Tensei CYOA original sheet '+n+'"></div>'
 }
 if(type==='grimoire')html=grimoire(s);
 if(type==='roll'&&randomDraft)html=centerTitle('A possible life',randomDraft.name+'’s grimoire')+renderRollControls(randomDraft)+budgetStrip(randomDraft)+summary(randomDraft)+'<div class="actions">'+bt('use-roll','Use this character','gold-btn')+bt('reroll',icon('dice')+'Roll again')+bt('close','Keep my build')+'</div>';
 if(type==='replace-roll')html=confirmPanel('Use the rolled character?','Your current character will be kept on the save shelf.','apply-roll','','roll-return');
 if(type==='fate-info'){const d=fateBreakdown(s,arg);html=centerTitle('Fate calculation',catalog.fates[arg].name)+'<p>'+esc(catalog.fates[arg].desc)+'</p>'+[['Related purchases','+'+d.related+'%'],['No-curse bonus','+'+d.clean+'%'],['Purchased ranks','+'+d.rank+'%'],['Weak fate',d.weak+'%'],['Forgone companions','+'+d.slots+'%'],['Multiplier',d.mult+'×'],['Final modifier',(d.total>=0?'+':'')+d.total+'%']].map(([k,v])=>'<div class="summary-row"><span>'+k+'</span><b>'+v+'</b></div>').join('')+(arg==='quest'?'<p>Quest doubles the modifiers assigned here until the quest is fulfilled.</p>':'')}
 if(type==='ally-slots'){const c=mainBuild.custom[Number(arg)];html=centerTitle('Custom companion','Companion budget')+'<p>Spend two slots for 50 points. Each extra slot grants another 25 points.</p><div class="actions">'+[2,3,4].map(n=>bt('set-ally-slots',n+' slots · '+(n*25)+' pts',n===c.slots?'gold-btn':'soft-btn',arg+'|'+n)).join('')+'</div>'}
 if(type==='remove-ally')html=confirmPanel('Release this companion?','Their individual build will be removed and the slots returned to your ledger.','confirm-remove-ally',arg);
 if(type==='new')html=confirmPanel('Begin a fresh character?','Your current character will be kept on the save shelf.','confirm-new','','grimoire');
 if(type==='load')html=confirmPanel('Open this saved life?','Your current character will be kept on the save shelf before the selected save opens.','confirm-load',arg,'grimoire');
 if(type==='import'&&incoming)html=confirmPanel('Open imported grimoire?','Open '+(incoming.build.name||'the imported traveler')+' and keep your current character on the save shelf.','confirm-import','','grimoire');
 if(type==='delete-save')html=confirmPanel('Delete this save?','This removes the selected snapshot from your browser’s save shelf.','confirm-delete',arg,'grimoire');
 if(type==='storage-full')html=centerTitle('Save shelf','Your shelf is full')+'<p>Export or delete a saved life before adding another.</p>'+bt('grimoire','Back to grimoire');
 document.querySelector('#modal-body').innerHTML=html;
}
function grimoire(s){
 const ally=editAlly!==null;let html=centerTitle(ally?'Companion profile':'Character sheet',s.name||'My grimoire')+budgetStrip(s,allowance(),ally)+inputField('Character name','name')+inputField('Appearance and background','appearance','textarea')+summary(s)+inputField('Journal notes','notes','textarea');
 if(ally)return html+'<div class="actions">'+bt('end-ally','Return to your character','gold-btn')+'</div>';
 const need=ready(s);
 return html+'<div class="actions">'+bt('studio',icon('feather')+'Character atelier','gold-btn')+bt('body-editor','Physical build','outline-btn')+bt('save',icon('save')+'Save snapshot','outline-btn')+'</div><p class="small">'+esc(need||'Your build is complete. You can keep any unspent resources.')+'</p><h3>Save shelf</h3><p class="small">'+(storageFailed?'Export a copy to keep this character.':'Your current grimoire saves automatically in this browser.')+'</p>'+shelf.map((v,i)=>'<div class="saved-row"><div><b>'+esc(v.build.name||'Unnamed traveler')+'</b><div class="small">'+esc(v.savedAt?new Date(v.savedAt).toLocaleString():'Saved character')+'</div></div><div>'+bt('load-save','Open','linkbtn',i)+' · '+bt('delete-save','Delete','linkbtn',i)+'</div></div>').join('')+'<div class="actions">'+bt('export','Export grimoire')+bt('import','Import grimoire')+bt('new','New character')+'</div>';
}
function saveSnapshot(){
 if(shelf.length>=20){openDialog('storage-full');return false}
 shelf.unshift({...payload(),savedAt:new Date().toISOString()});persist();return true;
}
function hasEdits(){return JSON.stringify(mainBuild)!==JSON.stringify(fresh())}
let incoming=null;
function replace(build){
 clearChoiceSession();resetPlanner();mainBuild=copy(build);editAlly=null;current='lineage';tabs={};closeDialog();persist();render();focusChoices()
}
document.addEventListener('click',event=>{
 const button=event.target.closest('button[data-act]');if(!button||button.disabled)return;
 const act=button.dataset.act,arg=button.dataset.arg||'',parts=arg.split('|'),s=getBuild();
 switch(act){
 case 'body-editor':closeDialog();navigate('body');break;
 case 'forge':closeDialog();navigate('lineage');break;
 case 'chapter':navigate(arg);break;
 case 'tab':tabs[parts[0]]=parts[1];renderChapter();break;
 case 'view':listView=arg==='list';persist();renderChapter();break;
 case 'close':closeDialog();break;
 case 'resource':if(arg==='gem'){openDialog('grimoire')}else if(arg==='people'&&editAlly!==null){notify('Custom companions cannot recruit their own party.')}else{if(arg==='leaf')tabs.origin='boons';navigate(({leaf:'origin',people:'party',star:'fate'})[arg])}break;
 case 'lab':openWorkshop('lab');break;
 case 'studio':openWorkshop('studio');break;
 case 'select':changeSelection(parts[0],parts[1]);break;
 case 'step':bump(parts[0],parts[1],Number(parts[2]));break;
 case 'rank':mutate(d=>{const n=Number(parts[1]);if(n)d.ranks[parts[0]]=n;else delete d.ranks[parts[0]]});break;
 case 'equip':mutate(d=>{toggle(d.equipped,arg)});break;
 case 'weak':mutate(d=>{toggle(d.weak,arg)});break;
 case 'dedicate':mutate(d=>{if(ledger(d,allowance(),editAlly!==null).unassigned<1)return 'Every unused slot is already dedicated. Reclaim a slot from another field first.';d.forgo[arg]=count(d.forgo,arg)+1});break;
 case 'reclaim':bump('forgo',arg,-1);break;
 case 'fate-info':openDialog('fate-info',arg);break;
 case 'atlas':openDialog('atlas');break;
 case 'atlas-region':openDialog('atlas',arg);break;
 case 'atlas-choose':if(mutate(d=>{d.region=arg})){notify('Homeland set to '+catalog.regions[arg].name+'.')}break;
 case 'archive':openDialog('archive','1');break;
 case 'sheet':openDialog('archive',arg);break;
 case 'zoom':modalState.extra=modalState.extra?'':'zoom';renderDialog();break;
 case 'grimoire':openDialog('grimoire');break;
 case 'save':if(saveSnapshot()){renderDialog();notify('Saved a snapshot to your grimoire.')}break;
 case 'delete-save':openDialog('delete-save',arg);break;
 case 'confirm-delete':shelf.splice(Number(arg),1);persist();openDialog('grimoire');break;
 case 'load-save':openDialog('load',arg);break;
 case 'confirm-load':{const target=unpack(shelf[Number(arg)]);if(hasEdits()&&!saveSnapshot())break;replace(target.build);notify('Saved life opened.');break}
 case 'new':openDialog('new');break;
 case 'confirm-new':if(!hasEdits()||saveSnapshot())replace(fresh());break;
 case 'roll-type':return setRollType(arg);
 case 'roll':case 'reroll':
   if(editAlly!==null){notify('Return to your main character to roll a new life.');break}
   if(act==='roll')rollType='fate';randomDraft=rollCharacter(rollType);openDialog('roll');break;
 case 'roll-return':openDialog('roll');break;
 case 'use-roll':if(hasEdits())openDialog('replace-roll');else{replace(randomDraft);notify('Rolled character ready. Visit the atelier to personalize your card.')}break;
 case 'apply-roll':if(saveSnapshot()){replace(randomDraft);notify('Rolled character ready. Your previous life is on the save shelf.')}break;
 case 'import':document.querySelector('#import-file').click();break;
 case 'confirm-import':if(incoming&&(!hasEdits()||saveSnapshot())){replace(incoming.build);incoming=null;notify('Grimoire imported.')}break;
 case 'export':{const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(payload(),null,2)],{type:'application/json'}));a.href=url;a.download=(mainBuild.name.trim().replace(/[^a-zA-Z0-9 -]/g,'')||'Six-Faced')+'-grimoire.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);break}
 case 'add-ally':{
   const child=fresh();child.freeLanguage=s.freeLanguage;child.region=s.region;child.races=s.curses.includes('curse-of-hatred')?[...s.races.slice(0,1)]:[];
   if(mutate(d=>{d.custom.push({slots:2,build:child})})){closeDialog();clearChoiceSession();editAlly=mainBuild.custom.length-1;current='lineage';tabs={};render();focusChoices();notify('Editing your new companion. Their personal budget is 50 points.')}break}
 case 'edit-ally':clearChoiceSession();editAlly=Number(arg);current='lineage';tabs={};render();focusChoices();break;
 case 'end-ally':clearChoiceSession();closeDialog();editAlly=null;current='party';tabs={};render();focusChoices();break;
 case 'ally-slot':openDialog('ally-slots',arg);break;
 case 'set-ally-slots':if(mutate(d=>{d.custom[Number(parts[0])].slots=Number(parts[1])}))closeDialog();break;
 case 'remove-ally':openDialog('remove-ally',arg);break;
 case 'confirm-remove-ally':closeDialog();mutate(d=>{d.custom.splice(Number(arg),1)});break;

 }
});
document.addEventListener('input',e=>{const f=e.target.dataset.field;if(!f||!['name','appearance','notes','family','personality','gear','style','quest'].includes(f))return;getBuild()[f]=e.target.value.slice(0,f==='name'?70:1500);persist()});
document.addEventListener('change',e=>{
 const f=e.target.dataset.field;if(!f)return;
 const v=e.target.value;
 if(f==='freeLanguage'){const ok=mutate(s=>{s.languages=s.languages.filter(id=>id!==v);s.freeLanguage=v});if(!ok)render();return}
 if(f.startsWith('teacher-')&&Object.hasOwn(catalog.schools,v)){const i=Number(f.slice(8));if(Number.isInteger(i)&&i>=0&&i<count(getBuild().advantages,'teacher'))mutate(s=>{s.teachers[i]=v;if(i===0)s.teacher=v});return}
 if(['age','era','unaging'].includes(f)){const n=Math.round(Number(v)),low=f==='era'?330:0,high=f==='era'?507:9999;getBuild()[f]=Math.max(low,Math.min(high,Number.isFinite(n)?n:low));e.target.value=getBuild()[f];persist()}
});
document.querySelector('#import-file').addEventListener('change',async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>2e6)throw Error('Choose a grimoire under 2 MB.');incoming=unpack(JSON.parse(await file.text()));openDialog('import')}catch(err){notify(err instanceof SyntaxError?'This file does not contain valid grimoire JSON.':err.message)}finally{e.target.value=''}});
const dialog=document.querySelector('#modal');dialog.addEventListener('close',()=>{if(dialog.open)return;modalState=null;const toast=document.querySelector('#toast');if(toast)document.body.append(toast)});dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog()});
document.querySelector('.hero-paint').style.setProperty('--cover-art', 'url("'+asset('art/paint-chapter-cover.webp')+'")');
document.querySelectorAll('[data-icon]').forEach(e=>e.innerHTML=icon(e.dataset.icon));render();


let tiltedMat=null;
function clearMat(){if(tiltedMat){tiltedMat.style.removeProperty('--tilt-x');tiltedMat.style.removeProperty('--tilt-y');tiltedMat=null}}
document.addEventListener('pointermove',e=>{
 const mat=e.target.closest?.('.art-mat');
 if(!mat||e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches){clearMat();return}
 if(mat!==tiltedMat){clearMat();tiltedMat=mat}
 const box=mat.getBoundingClientRect();mat.style.setProperty('--tilt-y',((e.clientX-box.left)/box.width*5-2.5).toFixed(2)+'deg');mat.style.setProperty('--tilt-x',(2.5-(e.clientY-box.top)/box.height*5).toFixed(2)+'deg');
},{passive:true});
document.addEventListener('pointerleave',clearMat);
