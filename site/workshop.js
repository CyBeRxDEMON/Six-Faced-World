'use strict';
const soulTones={
  amethyst:{name:'Amethyst',color:'#b693ff',shade:'#352441'},jade:{name:'Jade',color:'#77ddbb',shade:'#173d39'},
  amber:{name:'Amber',color:'#f3c16d',shade:'#483327'},sapphire:{name:'Sapphire',color:'#83bcff',shade:'#203249'},
  rose:{name:'Garnet',color:'#fa91ad',shade:'#4a2737'}
};
const sigilNames={star:'North star',moon:'Crescent',sun:'Dawn sun',quill:'Silver quill'};
const rollNames={fate:'Let fate decide',magus:'Arcane scholar',blade:'Sword pilgrim',warden:'River warden',scribe:'Rune scribe'};
let rollType='fate', planner=null;
const trackLabel=id=>catalog.schools[id]?.name||({mana:'Mana pool',spirit:'Fighting spirit'})[id];
const zeroRank=id=>id==='mana'?'Average':id==='spirit'?'No spirit':'Untrained';
const printedRank=(id,n)=>n?rankName(n):zeroRank(id);
const signed=n=>(n>0?'+':'')+n;
function personality(s){return {tone:Object.hasOwn(soulTones,s.tone)?s.tone:'amethyst',sigil:Object.hasOwn(sigilNames,s.sigil)?s.sigil:'star',portrait:s.races.includes(s.portrait)?s.portrait:s.races[0],title:s.epithet||''}}
function settingsFor(s){
 const id=personality(s),rank=Math.max(0,...Object.values(s.ranks)),budget=ledger(s,allowance(),editAlly!==null);
 const total=Math.max(1,startingPoints(s,allowance(),editAlly!==null)+spend(s,'curses'));
 return {color:soulTones[id.tone].color,rank,power:100*Math.max(0,Math.min(1,(total-budget.points)/total)),signature:[id.sigil,s.name,...s.races].join('|')};
}
function updateRelic(canvas,settings){if(!canvas||!window.Relic)return;if(!canvas.dataset.attached){window.Relic.mount(canvas,settings);canvas.dataset.attached='true'}else window.Relic.update(canvas,settings)}
function refreshRelics(){
 const s=getBuild();updateRelic(document.querySelector('#hero-relic'),settingsFor(s));
 if(current==='lab'&&planner&&planner.mode!=='spell')updateRelic(document.querySelector('#lab-relic'),settingsFor(projectPlan(s)));
}
function refreshNavigation(){
 document.querySelectorAll('.topnav button').forEach(el=>{const active=current==='lab'?el.dataset.act==='lab':current!=='studio'&&el.dataset.act==='forge';el.classList.toggle('active',active)});
 document.querySelectorAll('.sidefoot button').forEach(el=>el.classList.toggle('active',el.dataset.act===current));
}
function rollCharacter(type){return randomBuild(type==='fate'?pick(['magus','blade','warden','scribe','balanced']):type)}
function setRollType(type){if(!Object.hasOwn(rollNames,type))return;rollType=type;randomDraft=rollCharacter(type);openDialog('roll')}
function renderRollControls(s){
 return '<p>Choose a calling to roll a complete, affordable build. Your current character stays in the forge until you accept the roll.</p><div class="subtabs roll-tabs">'+Object.entries(rollNames).map(([id,name])=>bt('roll-type',name,id===rollType?'on':'',id,'aria-pressed="'+(id===rollType)+'"')).join('')+'</div><div class="roll-portrait">'+img(s.races[0],'',catalog.races[s.races[0]].name)+'<div class="mini">'+esc(catalog.races[s.races[0]].name)+'<h3>'+esc(catalog.regions[s.region].name)+'</h3></div></div>';
}
function openWorkshop(which){closeDialog();if(current!==which)resetPlanner();current=which;renderChapter();refreshNavigation();focusChoices();document.querySelector('#chapter').focus({preventScroll:true})}
function resetPlanner(){planner=null;trial=null}
const labGroups={rank:'Training ranks',specialty:'Spell specialties',fate:'Fate balance',spell:'Casting bench'};
function initPlan(mode='rank',id=null){
 if(mode==='spell'){planner={mode};if(!trial)newTrial();return}
 const s=getBuild(),key=id||(mode==='rank'?'mana':mode==='specialty'?'fire':'survival'),group=mode==='rank'?'ranks':mode==='specialty'?'specialties':'fates';
 const limit=mode==='rank'?7:mode==='specialty'?7-count(s.ranks,catalog.specialties[key].school):Math.max(5,count(s.fates,key)+1);
 const weak=mode==='fate'&&s.weak.includes(key);
 planner={mode,key,level:weak?0:Math.min(limit,count(s[group],key)+1),weak,pledge:mode==='fate'?count(s.forgo,key):0};
}
function availablePledges(s){const b=ledger(s,allowance(),editAlly!==null);return b.unassigned+count(s.forgo,planner.key)}
function assignPlan(s){
 const {mode,key,level,weak,pledge}=planner,group=mode==='rank'?'ranks':mode==='specialty'?'specialties':'fates';
 if(level)s[group][key]=level;else delete s[group][key];
 if(mode==='fate'){
  s.weak=s.weak.filter(x=>x!==key);if(weak)s.weak.push(key);
  if(pledge)s.forgo[key]=pledge;else delete s.forgo[key];
 }
}
function projectPlan(s){const d=copy(s);assignPlan(d);return d}
function maxLevel(s){const balance=ledger(s,allowance(),editAlly!==null).points;
 if(planner.mode==='rank')return Math.min(500,Math.max(7,Math.floor((Math.sqrt(1+8*(Math.max(0,balance)+tri(count(s.ranks,planner.key))))-1)/2)));
 if(planner.mode==='specialty')return Math.max(0,Math.min(500-count(s.ranks,catalog.specialties[planner.key].school),count(s.specialties,planner.key)+Math.floor(balance/catalog.specialties[planner.key].cost)));return Math.max(5,count(s.fates,planner.key)+1)}
function planValidation(target){
 if(editAlly===null)return problem(target);const all=copy(mainBuild);all.custom[editAlly].build=target;return problem(all)
}
function metric(label,value,cl=''){return '<div class="metric '+cl+'"><span>'+esc(label)+'</span><strong>'+esc(value)+'</strong></div>'}
function labRef(s){
 if(planner.mode==='rank'){const id=planner.key,n=planner.level;if(!n)return id==='mana'?'Average mana reserves.':id==='spirit'?'Fighting spirit is dormant.':'No training purchased in this school.';return readRank(id+'-'+n).desc}
 if(planner.mode==='specialty'){return catalog.specialties[planner.key].desc}
 return catalog.fates[planner.key].desc;
}
function planDetails(s){
 const t=projectPlan(s),{mode,key,level}=planner,isFate=mode==='fate',b=ledger(s,allowance(),editAlly!==null),p=ledger(t,allowance(),editAlly!==null),varName='points',delta=b[varName]-p[varName],error=planValidation(t);
 let from,to,extra,changed;
 if(mode==='rank'){from=printedRank(key,count(s.ranks,key));to=printedRank(key,level);extra='Total training investment · '+tri(level)+' '+(tri(level)===1?'point':'points');changed=count(s.ranks,key)!==level}
 else if(mode==='specialty'){const base=count(s.ranks,catalog.specialties[key].school);from=rankName(base+count(s.specialties,key));to=rankName(base+level);extra='School rank '+base+' + '+level+' specialty '+(level===1?'step':'steps')+' = '+rankName(base+level);changed=count(s.specialties,key)!==level}
 else{const old=fateBreakdown(s,key),d=fateBreakdown(t,key);from=signed(old.total)+'%';to=signed(d.total)+'%';changed=old.rank!==d.rank||old.weak!==d.weak||old.slots!==d.slots;extra='('+d.related+'% purchases + '+d.clean+'% curse-free + '+d.rank+'% training '+(d.weak?'− 50% weak fate ':'')+'+ '+d.slots+'% slots) × '+d.mult}
 const unit='point';
 return '<div class="metric-grid">'+metric('Current',from)+metric('Projected',to,'forecast')+metric(delta<0?'Refund': 'Cost',Math.abs(delta)+' '+unit+(Math.abs(delta)===1?'':'s'))+metric('Left after',p[varName])+'</div><p class="formula">'+esc(extra)+'</p><p class="ability-readout">'+esc(labRef(s))+'</p>'+(error?'<p class="note" role="status">'+esc(error)+'</p>':'')+'<div class="actions">'+bt('lab-apply',icon('check')+'Apply to character','gold-btn','',error||!changed?'disabled':'')+bt('lab-max','Find affordable maximum','soft-btn')+'</div>';
}
function renderLab(s){
 if(!planner)initPlan();
 const modeName=planner.mode;const heading='<div class="tool-lede"><div class="eyebrow">Character workshop</div><h2>Power lab</h2><p class="lede">Try a change, see what it unlocks, then decide whether to spend the points.</p></div><div class="subtabs lab-tabs">'+Object.entries(labGroups).map(([id,name])=>bt('lab-mode',name,modeName===id?'on':'',id,'aria-pressed="'+(id===modeName)+'"')).join('')+'</div>';
 if(modeName==='spell')return heading+renderTrial(s);
 const {mode,key,level,weak,pledge}=planner,items=mode==='rank'?rankIds.map(id=>({id,name:trackLabel(id)})):mode==='specialty'?BOOK.specialties:BOOK.fates;
 const select='<label class="field">'+(mode==='rank'?'Training track':mode==='specialty'?'Spell specialty':'Fate field')+'<select id="lab-track">'+items.map(it=>'<option value="'+it.id+'" '+(it.id===key?'selected':'')+'>'+esc(it.name)+'</option>').join('')+'</select></label>';
 return heading+'<div class="lab-bench"><section class="lab-controls"><h3>'+({rank:'Rank planner',specialty:'Specialty calculator',fate:'Fate calculator'})[mode]+'</h3>'+select+'<label class="range-field" for="lab-level"><span>'+(mode==='rank'?'Target rank':mode==='specialty'?'Specialty steps':'Purchased boosts')+'</span><output id="level-output">'+(mode==='rank'?printedRank(key,level):level)+'</output></label><input id="lab-level" type="range" min="0" max="'+maxLevel(s)+'" step="1" value="'+level+'" '+(weak?'disabled':'')+'><div class="range-scale"><span>'+(mode==='rank'?zeroRank(key):'0')+'</span><span>'+(mode==='rank'?rankName(maxLevel(s)):maxLevel(s))+'</span></div>'+(mode==='fate'?'<label class="check-field"><input id="lab-weak" type="checkbox" '+(weak?'checked':'')+'> Weaken this field for one extra boost</label><label class="field">Companion slots dedicated to this field<input id="lab-pledge" type="number" min="0" max="'+availablePledges(s)+'" value="'+pledge+'"></label>':'')+'<div id="plan-result" aria-live="polite">'+planDetails(s)+'</div></section><div class="lab-side"><div class="instrument"><div class="instrument-head mini">Projected resonance</div><canvas id="lab-relic" class="relic-canvas" tabindex="0" aria-label="Projected astrolabe. Drag or use arrow keys to turn."></canvas><div class="instrument-foot">Drag to rotate</div></div><div class="profile"><h3>Discipline profile</h3><div id="profile-chart">'+profileChart(s,projectPlan(s))+'</div></div></div></div>';
}
function profileChart(s,t){
 const labels=['Elemental','Holy','Arrays','Sword','Water','North'],keys=['elemental','holy','arrays','sword','water','north'],center=[134,99];
 const vertex=(i,n)=>[center[0]+66*n/7*Math.sin(i*Math.PI/3),center[1]-66*n/7*Math.cos(i*Math.PI/3)];
 const ceiling=Math.max(7,...keys.map(k=>Math.max(count(s.ranks,k),count(t.ranks,k))));
 const polygon=ranks=>ranks.map((n,i)=>vertex(i,n).map(a=>a.toFixed(1)).join(',')).join(' ');
 return '<svg class="radar" viewBox="0 0 268 197" role="img" aria-label="'+esc(keys.map((k,i)=>labels[i]+' '+count(s.ranks,k)+', projected '+count(t.ranks,k)).join('. '))+'">'+[2,4,7].map(n=>'<polygon points="'+polygon(Array(6).fill(n))+'" fill="none" stroke="#665864"/>').join('')+keys.map((_,i)=>'<line x1="134" y1="99" x2="'+vertex(i,7)[0]+'" y2="'+vertex(i,7)[1]+'" stroke="#504550"/>').join('')+'<polygon points="'+polygon(keys.map(k=>7*count(t.ranks,k)/ceiling))+'" fill="#b9a1e23b" stroke="#c9a9ff" stroke-width="2"/><polygon points="'+polygon(keys.map(k=>7*count(s.ranks,k)/ceiling))+'" fill="#e5ba6f20" stroke="#e2bc7e" stroke-width="2"/><circle cx="134" cy="99" r="2.5" fill="#f3d49c"/>'+labels.map((label,i)=>{const p=vertex(i,9);return '<text x="'+p[0]+'" y="'+(p[1]+3)+'" text-anchor="'+(i===1||i===2?'start':i===4||i===5?'end':'middle')+'" fill="#e4d9ce" font-family="sans-serif" font-size="11">'+label+'</text>'}).join('')+'</svg><div class="chart-key"><span>Current</span><span>Projected</span></div>'
}
function refreshPlan(){
 const s=getBuild(),range=document.querySelector('#lab-level');if(!range)return;
 range.value=planner.level;range.disabled=planner.weak;document.querySelector('#level-output').textContent=planner.mode==='rank'?printedRank(planner.key,planner.level):planner.level;
 document.querySelector('#plan-result').innerHTML=planDetails(s);document.querySelector('#profile-chart').innerHTML=profileChart(s,projectPlan(s));refreshRelics();
}
function bestPlan(){const s=getBuild();if(planner.weak){planner.weak=false;const cb=document.querySelector('#lab-weak');if(cb)cb.checked=false}for(let n=maxLevel(s);n>=0;n--){planner.level=n;if(!planValidation(projectPlan(s)))break}refreshPlan()}
function toneSwatches(s){
 return '<fieldset class="swatch-set"><legend>Crystal & ink</legend>'+Object.entries(soulTones).map(([id,t])=>bt('tone','<span class="s-color" style="--swatch:'+t.color+'"></span>'+t.name,'swatch '+(personality(s).tone===id?'chosen':''),id,'aria-pressed="'+(personality(s).tone===id)+'"')).join('')+'</fieldset>'
}
function renderStudio(s){
 const p=personality(s);
 return '<div class="tool-lede"><div class="eyebrow">Character workshop</div><h2>Character atelier</h2><p class="lede">Design a grimoire card for this life. Your lineage, training, companions, and signature crystal travel with the portrait.</p></div><div class="studio-bench"><div class="card-preview"><canvas id="identity-card" width="860" height="1160" role="img" aria-label="Illustrated character card"></canvas></div><section class="studio-controls"><h3>Personal inscription</h3>'+inputField('Character name','name')+inputField('Epithet','epithet')+'<div class="button-row">'+bt('name-roll',icon('dice')+'Roll a name','linkbtn')+bt('title-roll',icon('feather')+'Find an epithet','linkbtn')+'</div>'+dropdown('Personal sigil','sigil',Object.entries(sigilNames).map(([id,name])=>({id,name})),p.sigil)+toneSwatches(s)+(s.races.length?dropdown('Portrait from your lineage','portrait',s.races.map(id=>catalog.races[id]),p.portrait):'<p class="rules">Choose a lineage to place its original portrait on your card. '+bt('chapter','Choose lineage','linkbtn','lineage')+'</p>')+inputField('Appearance & background','appearance','textarea')+'<div class="actions">'+bt('card-export',icon('save')+'Download card · PNG','gold-btn')+bt('grimoire',icon('book')+'Grimoire','outline-btn')+'</div></section></div>';
}
function renderWorkshopPage(){
 const previous=document.querySelector('#lab-relic');if(previous)window.Relic?.unmount(previous);
 const s=getBuild();document.querySelector('#chapters').innerHTML=chapters.filter(c=>editAlly===null||c[0]!=='party').map(c=>bt('chapter',icon(c[2])+esc(c[1]),'chapterlink',c[0])).join('');
 document.querySelector('#chapter').innerHTML=(editAlly!==null?'<div class="note">Companion build · '+esc(s.name||'New companion')+' · '+bt('end-ally','Return to your character','linkbtn')+'</div>':'')+(current==='lab'?renderLab(s):renderStudio(s));
 if(current==='lab'){refreshRelics();if(planner.mode==='spell'){drawTrialDials();drawSpell()}}else paintCard(s);
}
let paintSerial=0;const imageCache=new Map();
function cardImage(id){if(!id)return Promise.resolve(null);if(!imageCache.has(id)){const image=new Image();image.src=asset('art/'+(raceArt(id)||id)+'.webp');imageCache.set(id,image.decode().then(()=>image).catch(()=>null))}return imageCache.get(id)}
function gildedGlyph(ctx,type,x,y,r,color){
 ctx.save();ctx.translate(x,y);ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2.3;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();ctx.rotate(-Math.PI/2);
 if(type==='moon'){ctx.beginPath();ctx.arc(0,0,r*.59,0,Math.PI*2);ctx.fill();ctx.fillStyle='#28212e';ctx.beginPath();ctx.arc(r*.21,-r*.17,r*.49,0,Math.PI*2);ctx.fill()}
 else if(type==='quill'){ctx.beginPath();ctx.ellipse(0,0,r*.65,r*.24,-.5,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(-r*.72,r*.4);ctx.lineTo(r*.53,-r*.28);ctx.stroke()}
 else{const points=type==='sun'?12:4;ctx.beginPath();for(let i=0;i<points*2;i++){const a=i*Math.PI/points,n=i%2?.24:.73;ctx[i?'lineTo':'moveTo'](Math.cos(a)*r*n,Math.sin(a)*r*n)}ctx.closePath();ctx.fill()}
 ctx.restore();
}
function cardText(ctx,text,x,y,width,size,font,color,align='center'){
 ctx.textAlign=align;ctx.fillStyle=color;ctx.font=font.replace('@',size);
 while(ctx.measureText(text).width>width&&size>12){size-=1;ctx.font=font.replace('@',size)}ctx.fillText(text,x,y,width);
}
async function paintCard(s,target=document.querySelector('#identity-card')){
 if(!target)return;const serial=++paintSerial,identity=personality(s),tone=soulTones[identity.tone],art=await cardImage(identity.portrait);await document.fonts.ready;if(serial!==paintSerial||!target.isConnected)return;
 const c=target.getContext('2d'),W=860,H=1160;c.clearRect(0,0,W,H);
 const bg=c.createLinearGradient(0,0,W,H);bg.addColorStop(0,tone.shade);bg.addColorStop(.47,'#14171e');bg.addColorStop(1,'#312634');c.fillStyle=bg;c.fillRect(0,0,W,H);
 c.lineWidth=2;for(const [inset,col] of [[13,'#6a5444'],[19,'#c9a36e'],[25,'#796743'],[36,tone.color]]){c.strokeStyle=col;c.strokeRect(inset,inset,W-2*inset,H-2*inset)}
 for(let i=0;i<124;i++){const x=38+((i*319+17)%785),y=42+((i*197+83)%1070);c.fillStyle=i%4===0?tone.color:'#7f756f';c.fillRect(x,y,i%4===0?2:1,i%4===0?2:1)}
 cardText(c,'S I X - F A C E D   C H R O N I C L E',W/2,79,700,23,'600 @px "DM Sans"','#e2c796');
 c.save();c.translate(W/2,360);c.strokeStyle='#7d644c';for(const r of [210,219,231]){c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.stroke()}for(let i=0;i<48;i++){c.rotate(Math.PI/24);c.beginPath();c.moveTo(0,220);c.lineTo(0,i%4===0?239:228);c.stroke()}c.restore();
 if(art){const scale=Math.min(510/art.width,397/art.height),w=art.width*scale,h=art.height*scale,x=(W-w)/2,y=358-h/2;c.shadowColor='#05060a';c.shadowBlur=22;c.fillStyle='#211e23';c.fillRect(x-7,y-7,w+14,h+14);c.shadowBlur=0;c.drawImage(art,x,y,w,h);c.strokeStyle='#dbc187';c.strokeRect(x-4,y-4,w+8,h+8)}else gildedGlyph(c,identity.sigil,W/2,356,121,tone.color);
 gildedGlyph(c,identity.sigil,W/2,585,32,tone.color);
 cardText(c,s.name||'Unnamed soul',W/2,691,735,84,'600 @px "Cormorant Garamond"','#fff1d5');
 cardText(c,s.epithet||'Of the Six-Faced World',W/2,744,740,36,'italic 600 @px "Cormorant Garamond"',tone.color);
 c.strokeStyle='#7d6851';c.beginPath();c.moveTo(98,778);c.lineTo(762,778);c.stroke();
 const topTrack=Object.entries(s.ranks).filter(([,n])=>n).sort((a,b)=>b[1]-a[1])[0];
 const info=[['LINEAGE',s.races.map(id=>catalog.races[id].name).join(' · ')||'Unwritten'],['HOMELAND',catalog.regions[s.region]?.name||'Unchosen'],['DISCIPLINE',topTrack?trackLabel(topTrack[0])+' · '+rankName(topTrack[1]):'Untrained'],['COMPANIONS',String(s.companions.length+s.custom.length)]];
 info.forEach(([k,v],i)=>{const y=832+i*59;cardText(c,k,91,y,176,21,'600 @px "DM Sans"','#bfae9d','left');cardText(c,v,767,y,485,28,'600 @px "Cormorant Garamond"','#f2e8d8','right')});
 cardText(c,tone.name.toUpperCase()+'   ◆   '+sigilNames[identity.sigil].toUpperCase(),W/2,1100,720,21,'600 @px "DM Sans"',tone.color);target.setAttribute('aria-label','Character card for '+(s.name||'Unnamed soul')+', '+(identity.portrait?catalog.races[identity.portrait].name:'unwritten lineage')+', '+tone.name+' crystal');
}
function freshName(){return pick(['Ari','El','Mar','Syl','Ner','Ril','Tav','Fae','Lor','Ves','Ith','Cor'])+pick(['en','ia','is','el','yn','a','ielle','ion','ora','ian'])+' '+pick(['Lark','Ash','Rain','Silver','Dawn','Mist','River','Briar','Star','Winter'])+pick(['fell','vale','wood','mere','song','watch','reed','well'])}
function titleFor(s){const top=Object.entries(s.ranks).sort((a,b)=>b[1]-a[1])[0]?.[0];const pool=({elemental:['Stormcaller','Ember Scribe'],holy:['Dawnkeeper','Lantern of Millis'],arrays:['Keeper of Circles','Runebinder'],sword:['The Gilded Blade','Sword of the Dawn'],water:['The Still Current','Keeper of the Ford'],north:['The Fox of the North','The Quiet Step']})[top];return pick(pool||['The Wandering Star','Keeper of the Last Lantern','The Seventh Bell','Of the Amber Hills','The Violet Comet'])}
document.addEventListener('click',async event=>{
 const b=event.target.closest('button[data-act]');if(!b||b.disabled)return;const a=b.dataset.act,v=b.dataset.arg||'';
 if(a==='lab-mode'){initPlan(v);renderWorkshopPage()}
 if(a==='lab-max')bestPlan();
 if(a==='lab-apply'){const mode=planner.mode,k=planner.key;if(mutate(s=>{assignPlan(s)},'Applied to your character.')){initPlan(mode,k);planner.level=count(getBuild()[mode==='rank'?'ranks':mode==='specialty'?'specialties':'fates'],k);renderWorkshopPage()}}
 if(a==='tone'&&Object.hasOwn(soulTones,v))mutate(s=>{s.tone=v});
 if(a==='name-roll')mutate(s=>{s.name=freshName()});
 if(a==='title-roll')mutate(s=>{s.epithet=titleFor(s)});
 if(a==='card-export'){
  const canvas=document.querySelector('#identity-card');if(!canvas)return;await paintCard(getBuild(),canvas);
  canvas.toBlob(blob=>{if(!blob){notify('The browser could not save this card.');return}const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=(getBuild().name.replace(/[^a-z0-9 -]/gi,'')||'Six-Faced')+'-character-card.png';link.click();setTimeout(()=>URL.revokeObjectURL(url),1800)},'image/png')
 }
});
document.addEventListener('input',e=>{
 if(e.target.id==='lab-level'){planner.level=Number(e.target.value);refreshPlan()}
 if(e.target.id==='lab-pledge'){planner.pledge=Math.max(0,Math.min(availablePledges(getBuild()),Math.floor(Number(e.target.value)||0)));e.target.value=planner.pledge;refreshPlan()}
 if(['epithet','name'].includes(e.target.dataset.field)&&current==='studio'){getBuild()[e.target.dataset.field]=e.target.value.slice(0,70);persist();paintCard(getBuild())}
});
document.addEventListener('change',e=>{
 if(e.target.id==='lab-track'){initPlan(planner.mode,e.target.value);renderWorkshopPage()}
 if(e.target.id==='lab-weak'){planner.weak=e.target.checked;if(planner.weak)planner.level=0;refreshPlan()}
 if(e.target.dataset.field==='portrait'&&getBuild().races.includes(e.target.value))mutate(s=>{s.portrait=e.target.value});
 if(e.target.dataset.field==='sigil'&&Object.hasOwn(sigilNames,e.target.value))mutate(s=>{s.sigil=e.target.value});
});
