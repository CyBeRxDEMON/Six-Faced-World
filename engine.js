'use strict';
const BOOK = {...window.BOOK_ONE, ...window.BOOK_TWO};
const GROUPS = ['races','origins','regions','advantages','languages','scenarios','schools','specialties','techniques','eyes','blessings','curses','companions','fates'];
const catalog = Object.fromEntries(GROUPS.map(g=>[g,Object.fromEntries(BOOK[g].map(x=>[x.id,x]))]));
const listGroups = ['races','languages','scenarios','techniques','eyes','blessings','curses','companions','weak','equipped'];
const countGroups = ['advantages','specialties','ranks','fates','forgo'];
const rankIds=['mana','spirit',...BOOK.schools.map(x=>x.id)];
const rankName=n=>n?BOOK.ranks[n-1]?.name||('God +'+(n-7)):'Untrained';
const tri=n=>n*(n+1)/2;
const sum=a=>a.reduce((x,y)=>x+y,0);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const copy=o=>JSON.parse(JSON.stringify(o));
const cost=(group,id)=>catalog[group][id]?.cost||0;
const count=(map,id)=>map[id]||0;
const spend=(s,g)=>Array.isArray(s[g])?sum(s[g].map(id=>cost(g,id))):sum(Object.entries(s[g]).map(([id,n])=>cost(g,id)*n));
function fresh(){
  return {rulesVersion:2,carryBudget:0,scrollRoll:null,budgetMode:'sheet',pointLots:[2,0,0,0],modelCharacter:'',bodyDesign:{},native:{},attunement:'Fire',foreign:{dxd:{mode:'',picks:{},exchanges:{}},naruto:{mode:'',picks:{},exchanges:{}}},name:'',epithet:'',tone:'amethyst',sigil:'star',portrait:'',teachers:[],appearance:'',notes:'',quest:'',family:'',personality:'',gear:'',style:'',teacher:'elemental',era:407,age:16,unaging:25,origin:'poor',region:'',freeLanguage:'human-god',custom:[],...Object.fromEntries(listGroups.map(g=>[g,[]])),...Object.fromEntries(countGroups.map(g=>[g,{}]))};
}
function ledger(s,base=100,ally=false){
  const origin=catalog.origins[s.origin], points=startingPoints(s,base,ally)-expansionSpend(s)+spend(s,'curses')-sum(['races','techniques','specialties','eyes','blessings'].map(g=>spend(s,g)))-origin.cost-sum(Object.values(s.ranks).map(tri));
  const boonSpent=cost('regions',s.region)+spend(s,'advantages')+s.languages.length;
  const boonTotal=origin.boons+Number(s.scenarios.includes('multiplayer'));
  const slotTotal=ally?0:origin.slots+count(s.advantages,'connections');
  const slotUsed=s.companions.length+sum(s.custom.map(c=>c.slots));
  const boostsUsed=sum(Object.values(s.fates).map(tri));
  const boons=boonTotal-boonSpent, slots=slotTotal-slotUsed, fate=4+s.weak.length-boostsUsed;
  const uncovered=Math.max(0,-boons)+Math.max(0,-slots)+Math.max(0,-fate);
  return {points:points-uncovered,boons:Math.max(0,boons),slots:Math.max(0,slots),fate:Math.max(0,fate),boonSpent,slotTotal,slotUsed,unassigned:Math.max(0,slots)-sum(Object.values(s.forgo)),uncovered};
}
function fateBreakdown(s,id){
  const r=s.ranks,spells=BOOK.techniques.filter(x=>s.techniques.includes(x.id)),schoolCost=key=>tri(count(r,key))+sum(BOOK.specialties.filter(x=>x.school===key).map(x=>x.cost*count(s.specialties,x.id)))+sum(spells.filter(x=>x.school===key).map(x=>x.cost));
  const budget=ledger(s);
  const related={comfort:spend(s,'races')+cost('origins',s.origin)+budget.boonSpent+budget.slotUsed,challenge:spend(s,'curses'),romance:spend(s,'eyes')+spend(s,'blessings'),influence:schoolCost('elemental')+schoolCost('sword'),survival:schoolCost('holy')+schoolCost('water'),sense:schoolCost('arrays')+schoolCost('north'),'magical-growth':tri(count(r,'mana')),'martial-growth':tri(count(r,'spirit')),quest:0}[id];
  const clean=s.curses.length?0:25,rank=50*count(s.fates,id),weak=s.weak.includes(id)?-50:0,slots=2*count(s.forgo,id),mult=id==='quest'?2:1;
  return {related,clean,rank,weak,slots,mult,total:(related+clean+rank+weak+slots)*mult};
}
function problem(s,base=100,ally=false){
  const b=ledger(s,base,ally);
  if(b.points<0)return 'You need '+(-b.points)+' more character points. Refund a purchase or take a curse.';
  if(b.unassigned<0)return 'Reclaim a forgone slot in Fate before recruiting another companion.';
  if(s.scenarios.includes('quick-start')&&s.advantages.nobility)return 'Quick Start and Nobility cannot be combined. Remove one first.';
  if(s.fates&&s.weak.some(id=>s.fates[id]))return 'A weakened fate cannot hold a purchased boost.';
  if(s.equipped.length>2)return 'Two eyes are already active. Put one to sleep before awakening another.';
  if(s.equipped.some(id=>!s.eyes.includes(id)))return 'Only purchased eyes can be active.';
  if(s.curses.includes('curse-of-hatred')){
    const excluded=s.companions.filter(id=>!s.races.includes(catalog.companions[id].race));
    if(excluded.length||s.custom.some(c=>c.build.races.length&&!c.build.races.some(id=>s.races.includes(id))))return 'Curse of Hatred limits companions to a shared lineage.';
  }
  if(ally&&(s.scenarios.includes('multiplayer')||s.custom.length||s.companions.length||s.advantages.connections))return 'A custom companion has a separate life and cannot buy companions or Multiplayer.';
  if(Object.values(s.ranks).some(n=>!Number.isSafeInteger(n)||n<0||n>500))return 'Choose a whole training rank from 0 to 500.';
  for(const item of BOOK.specialties)if(count(s.ranks,item.school)+count(s.specialties,item.id)>500)return item.name+' exceeds the supported training range.';
  const ext=depthProblem(s);if(ext)return ext;
  for(const c of s.custom){const msg=problem(c.build,50+25*(c.slots-2),true);if(msg)return (c.build.name||'Custom companion')+' · '+msg}
  return '';
}
function normalized(raw,ally=false){
  if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('This file has no character build.');
  const s=fresh();
  for(const k of ['name','appearance','notes','family','personality','quest','style','gear'])s[k]=String(raw[k]||'').slice(0,k==='name'?70:1500);
  const int=(v,min,max,def)=>Number.isInteger(v)&&v>=min&&v<=max?v:def;
  s.epithet=String(raw.epithet||'').slice(0,70);
  s.tone=['amethyst','jade','amber','sapphire','rose'].includes(raw.tone)?raw.tone:'amethyst';
  s.sigil=['star','moon','sun','quill'].includes(raw.sigil)?raw.sigil:'star';
  s.portrait=Object.hasOwn(catalog.races,raw.portrait)?raw.portrait:'';
  s.era=int(raw.era,330,507,407);s.age=int(raw.age,0,9999,16);s.unaging=int(raw.unaging,0,9999,25);
  s.origin=Object.hasOwn(catalog.origins,raw.origin)?raw.origin:'poor';
  s.region=Object.hasOwn(catalog.regions,raw.region)?raw.region:'';
  s.freeLanguage=Object.hasOwn(catalog.languages,raw.freeLanguage)?raw.freeLanguage:'human-god';
  s.teacher=Object.hasOwn(catalog.schools,raw.teacher)?raw.teacher:'elemental';
  for(const g of listGroups){
    const lookup=catalog[g==='weak'?'fates':g==='equipped'?'eyes':g];
    s[g]=[...new Set((Array.isArray(raw[g])?raw[g]:[]).filter(id=>typeof id==='string'&&Object.hasOwn(lookup,id)))];
  }
  s.companions=s.companions.filter(id=>id!=='custom-companion');
  s.languages=s.languages.filter(id=>id!==s.freeLanguage);
  for(const g of countGroups){
    const keys=g==='ranks'?rankIds:Object.keys(catalog[g==='forgo'?'fates':g]);
    for(const k of keys){const cap=g==='ranks'||g==='specialties'?500:g==='advantages'?catalog.advantages[k].max||128:g==='fates'?500:128;const n=int(raw[g]?.[k],0,cap,0);if(n)s[g][k]=n}
  }
  s.teachers=Array.from({length:count(s.advantages,'teacher')},(_,i)=>Object.hasOwn(catalog.schools,raw.teachers?.[i])?raw.teachers[i]:s.teacher);
  if(!ally&&Array.isArray(raw.custom))s.custom=raw.custom.slice(0,50).map(c=>({slots:int(c.slots,2,4,2),build:normalized(c.build,true)}));
  normalizedDepth(raw,s,ally);
  return s;
}
function ready(s){
  if(!s.races.length)return 'Choose at least one lineage in the first chapter.';
  if(!s.region)return 'Choose your homeland in Origins.';
  if(s.custom.some(c=>!c.build.races.length||!c.build.region))return 'Give each custom companion a lineage and a homeland in their character editor.';
  const tongues=[s.freeLanguage,...s.languages];
  if(s.custom.some(c=>![c.build.freeLanguage,...c.build.languages].some(id=>tongues.includes(id))))return 'Custom companions need a shared language. Choose one in Origins for you or your companion.';
  return depthReady(s)||problem(s);
}
function randomBuild(archetype='balanced'){
  const s=fresh(), race=pick(BOOK.races.filter(it=>!it.sourceId)), region=pick(BOOK.regions);
  s.races=[race.id];s.origin=pick(BOOK.origins).id;s.region=region.id;
  s.name=pick(['Aster','Liora','Rune','Iria','Cael','Tavia','Miro','Neris','Sylva','Rowan']);
  s.freeLanguage=({'demon':'demon-god','millis':'beast-god','begaritt':'battle-god'})[region.id]||'human-god';
  const mage=archetype==='magus'?'elemental':archetype==='warden'?'holy':archetype==='scribe'?'arrays':pick(['elemental','arrays','holy']);
  const style=archetype==='blade'?'sword':archetype==='warden'?'water':archetype==='scribe'?'north':pick(['sword','water','north']);
  const emphasis=archetype==='blade'?[1,2,4,5]:archetype==='magus'||archetype==='scribe'?[5,4,1,2]:[4,4,3,3];
  s.ranks={mana:emphasis[0],[mage]:emphasis[1],spirit:emphasis[2],[style]:emphasis[3]};s.blessings=[pick(BOOK.blessings).id];s.eyes=[pick(BOOK.eyes).id];s.equipped=[...s.eyes];s.techniques=[pick(BOOK.techniques.filter(x=>x.school===mage)).id];
  s.companions=[pick(BOOK.companions.filter(c=>c.cost===1)).id];s.fates={[pick(['sense','influence','survival'])]:2,comfort:1};
  let pool=[...BOOK.specialties.filter(x=>x.school===mage).map(x=>['specialties',x.id]),...BOOK.techniques.filter(x=>x.school!==mage).map(x=>['techniques',x.id]),...BOOK.schools.map(x=>['ranks',x.id])];
  for(let i=0;i<35;i++){const [g,id]=pick(pool), t=copy(s);if(g==='techniques'){if(t[g].includes(id))continue;t[g].push(id)}else t[g][id]=count(t[g],id)+1;if(!problem(t)&&count(t.ranks,id)<=7)Object.assign(s,t)}
  s.tone=pick(['amethyst','sapphire','jade','amber','rose']);s.sigil=pick(['star','moon','sun','quill']);
  return s;
}
function buildSummary(s){
  const names=(g,ids)=>ids.map(id=>catalog[g][id]?.name).filter(Boolean).join(', ');
  const ranked=(g)=>Object.entries(s[g]).filter(([,n])=>n).map(([id,n])=>catalog[g][id].name+(n>1?' ×'+n:'')).join(', ');
  return [
    ['Lineage',names('races',s.races)],['Origin',catalog.origins[s.origin].name+(s.region?' · '+catalog.regions[s.region].name:'')],['Languages',names('languages',[s.freeLanguage,...s.languages])],['Advantages',ranked('advantages')],['Scenarios',names('scenarios',s.scenarios)],
    ['Training',Object.entries(s.ranks).filter(([,n])=>n).map(([id,n])=>(catalog.schools[id]?.name||({mana:'Mana pool',spirit:'Fighting spirit'})[id])+' · '+rankName(n)).join(', ')],['Specialties',ranked('specialties')],['Techniques',names('techniques',s.techniques)],['Demon eyes',names('eyes',s.eyes)],['Active eyes',names('eyes',s.equipped)],['Blessings',names('blessings',s.blessings)],['Curses',names('curses',s.curses)],['Companions',[...s.companions.map(id=>catalog.companions[id].name),...s.custom.map(c=>c.build.name||'Custom companion')].join(', ')],['Fate ranks',ranked('fates')],['Weak fate',names('fates',s.weak)],['Quest',s.quest],['Appearance',s.appearance],['Notes',s.notes]
  ].concat([
    ['Arrival',s.scenarios.includes('alternate-era')?'K'+s.era:'K407'],
    ['Starting age',s.scenarios.includes('quick-start')?String(s.age):'Newborn'],
    ['Unaging age',s.blessings.includes('unaging')?String(s.unaging):''],
    ['Teacher',s.advantages.teacher?Array.from({length:s.advantages.teacher},(_,i)=>catalog.schools[s.teachers[i]||s.teacher].name).join(', '):''],['Equipment',s.advantages.gear?s.gear:''],
    ['Epithet',s.epithet],['Personal style',s.style],['Family & personality',s.personality],['Dedicated slots',rankedSlots(s)]
  ],depthSummary(s)).filter(([,v])=>v);
}
function rankedSlots(s){return Object.entries(s.forgo).filter(([,n])=>n).map(([id,n])=>catalog.fates[id].name+' ×'+n).join(', ')}
