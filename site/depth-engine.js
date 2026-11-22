'use strict';
const editions = window.DEPTH_BOOK.editions;
const bodySections = window.DEPTH_BOOK.body;
const nativeChoices = window.DEPTH_BOOK.native;
const limiterSource='https://drive.google.com/file/d/1uRciel1OHi8VsqqwxyZKSB2rqM1S8hbB/view';
nativeChoices.push({id:'leaky-limiter',name:'Leaky Limiter',desc:'Repeatedly exhausting and recovering your mana can keep expanding your reserve throughout adulthood. You still have to perform the training. The perk sets no growth rate and grants no immediate rank increase.',cost:200,max:1,group:'Energy & reserves',requires:[],power:true});
window.DEPTH_ART['native/leaky-limiter']={art:'mana-god',alt:'God-rank mana reserve from the original sheet'};
const specialLots = [{id:'nj8k',value:50,max:60},{id:'uw6d',value:10,max:100},{id:'fv3q',value:5,max:100},{id:'rqvx',value:1,max:100}];
const mtEditionUrl='https://chuchurrumin.neocities.org/mushoku%20tensei%20cyoa%202.1/';
for(const [group,choices] of Object.entries({native:nativeChoices,...Object.fromEntries(Object.entries(editions).map(([id,ed])=>[id,ed.choices]))})){
  BOOK[group]=choices;catalog[group]=Object.fromEntries(choices.map(it=>[it.id,it]));
}
const isDepthGroup=g=>['native','naruto','dxd'].includes(g);
const lineageSources={'39lm':'human','7pkn':'elf',z9xt:'devil',s3nb:'dragon',duu0:'youkai',oa1r:'great-spirit'};
const extraLineages=window.EXTRA_LINEAGES||[];
for(const x of extraLineages)lineageSources[x.id]=x.slug;
const raceSource=id=>Object.keys(lineageSources).find(k=>lineageSources[k]===id);
const sharedSchools=['elemental','holy','arrays'];
const pointLabel=n=>n<0?'Gain '+(-n)+' pts':n?n+' pts':'Free';
const guide=window.UNIFIED_GUIDE||{books:{},groups:[]};
const topics=new Map(guide.groups.map(x=>[x.id,x.name]));
for(const g of ['native','naruto','dxd'])for(const item of BOOK[g]){
 const entry=guide.books[g]?.[item.id]||{};
 item.topic=topics.get(entry.group)||entry.group||item.group;
 item.name=(entry.name||item.name).replace(/\s*\([^)]*\)\s*$/,'').trim();
 item.desc=entry.desc||item.desc;
 if(entry.note)item.desc+=' '+entry.note;
}
for(const [sourceId,id] of Object.entries(lineageSources)){
 if(catalog.races[id])continue;
 const it=catalog.dxd[sourceId]||extraLineages.find(x=>x.id===sourceId);
 const race={id,name:it.name,desc:it.desc,cost:it.cost??sum(Object.values(effectivePrice(it,{}))),sourceId};
 BOOK.races.push(race);catalog.races[id]=race;
}
const isListed=(g,id)=>g!=='dxd'||!lineageSources[id]&&id!=='d7sc';
const libraryEntries=Object.keys(guide.books).length?['native','naruto','dxd'].flatMap(g=>BOOK[g].filter(it=>isListed(g,it.id)).map(it=>({g,it}))):[];
const bloodlineAdvances=['n419','khwd','3w54','5y6o','rjkh','bzgv','0mzv','vhye'];
function heritageTab(g,id){
 if(g==='dxd'&&bloodlineAdvances.includes(id))return 'advances';
 if(g==='naruto'&&guide.books[g]?.[id]?.group==='lineage')return 'clans';
 return '';
}
const talentEntries=libraryEntries.filter(({g,it})=>!heritageTab(g,it.id)&&it.id!=='leaky-limiter');
function startingPoints(s,base=100,ally=false){
 const grant=!ally&&s.budgetMode==='special'?specialLots.reduce((n,l,i)=>n+l.value*s.pointLots[i],0):!ally&&s.budgetMode==='epic'?1000:!ally&&s.budgetMode==='unbound'?20000:base;
 return grant+(s.carryBudget||0);
}
function linkedPicks(s,g){
 const picks={...(g==='native'?s.native:s.foreign[g].picks)};
 if(g==='dxd'){
  for(const [id,race] of Object.entries(lineageSources))if(s.races.includes(race))picks[id]=1;
  if(s.races.includes('nine-tailed-kitsune')){picks.duu0=1;picks.xqht=1}
  if(sharedSchools.every(id=>count(s.ranks,id)>0))picks.d7sc=1;
  if(s.races.includes('devil'))picks.pjlz=1;
 }
 if(g==='naruto'&&s.foreign.dxd.picks.opay){picks['956d']=1;picks.vlil=1}
 return picks;
}
function includedBy(s,g,id){
 if(g==='dxd'&&id==='xqht'&&s.races.includes('nine-tailed-kitsune'))return 'Nine-Tailed Kitsune ancestry';
 if(g==='dxd'&&id==='pjlz'&&s.races.includes('devil'))return 'Devil ancestry';
 if(g==='naruto'&&['956d','vlil'].includes(id)&&s.foreign.dxd.picks.opay)return catalog.dxd.opay.name;
 return '';
}
function purchasePrice(s,g,it,picks=linkedPicks(s,g)){
 if(includedBy(s,g,it.id))return 0;
 return g==='native'?it.cost:sum(Object.values(effectivePrice(it,picks)));
}
function expansionSpend(s){
 let total=spend(s,'native');
 for(const g of Object.keys(editions)){
  const linked=linkedPicks(s,g);
  for(const [id,n] of Object.entries(s.foreign[g].picks))total+=purchasePrice(s,g,catalog[g][id],linked)*n;
 }
 return total;
}
function editionCount(s,g,id){return g==='native'?s.native[id]||0:s.foreign[g].picks[id]||0}
function conditionMet(node,picks){
 if(typeof node==='string')return !!picks[node];
 if(node.all)return node.all.every(c=>conditionMet(c,picks));
 if(node.any)return node.any.filter(c=>conditionMet(c,picks)).length>=(node.min||1);
 if(node.not)return !conditionMet(node.not,picks);
 if(node.times)return (picks[node.id]||0)>=node.times;
 return !!picks[node.id];
}
function effectivePrice(it,picks,quantity=0){
 const result={};
 for(const entry of it.prices){
  if((entry.when||[]).every(n=>conditionMet(n,picks)))result[entry.coin]=(result[entry.coin]||0)+entry.amount;
 }
 return result;
}
function modeGrant(s,mode,k){return mode?.roll&&k==='Scrolls'?(s.scrollRoll??0):mode?.grant[k]||0}

function requirementText(n,g){
 const label=id=>(g==='dxd'&&catalog.races[lineageSources[id]]?.name)||catalog[g][id]?.name||editions[g].external?.[id]||id;
 if(typeof n==='string')return label(n);
 if(n.not)return 'Without '+requirementText(n.not,g);
 if(n.any)return (n.min>1?n.min+' of ':'one of ')+n.any.map(x=>requirementText(x,g)).join(' / ');
 if(n.all)return n.all.map(x=>requirementText(x,g)).join(' + ');
 return label(n.id)+(n.times?' ×'+n.times:'');
}
function depthProblem(s){
 if(s.native.up4o&&count(s.ranks,'spirit'))return 'Laplace Factor prevents Fighting Spirit. Refund one of the two.';
 for(const g of Object.keys(editions)){
  const linked=linkedPicks(s,g), owned={...s.foreign[g].picks};
  if(g==='dxd')for(const [id,race] of Object.entries(lineageSources))if(s.races.includes(race)&&catalog.dxd[id])owned[id]=1;
  for(const [id,n] of Object.entries(owned)){
   const it=catalog[g][id];if(!it||!Number.isSafeInteger(n)||n<1||n>it.max)return 'Invalid purchase quantity.';
   const unmet=it.requires.find(req=>!conditionMet(req,linked));if(unmet)return it.name+' requires '+requirementText(unmet,g)+'.';
  }
 }
 return '';
}
function depthReady(s){return ''}
function changeDepthChoice(s,g,id,delta){
 const it=catalog[g][id], picks=g==='native'?s.native:s.foreign[g].picks;
 if(!it||!isListed(g,id))return 'Open the matching ancestry or training track.';
 const n=(picks[id]||0)+delta;
 if(delta>0&&includedBy(s,g,id))return 'Already included with '+includedBy(s,g,id)+'.';
 if(!Number.isInteger(n)||n<0||n>it.max)return 'Choose a quantity from 0 to '+it.max+'.';
 if(n)picks[id]=n;else delete picks[id];
}
function normalizedDepth(raw,s,ally){
 const integer=(v,lim)=>Number.isInteger(v)&&v>0?Math.min(v,lim):0;
 s.budgetMode=!ally&&['special','epic','unbound'].includes(raw.budgetMode)?raw.budgetMode:'sheet';
 s.pointLots=Array.isArray(raw.pointLots)?specialLots.map((l,i)=>integer(raw.pointLots[i],l.max)):[2,0,0,0];
 s.modelCharacter=String(raw.modelCharacter||'').slice(0,80);
 s.scrollRoll=Number.isInteger(raw.scrollRoll)&&Math.abs(raw.scrollRoll)<=250?raw.scrollRoll:null;
 for(const t of bodySections){
  const x=raw.bodyDesign?.[t.id];if(x===undefined||x===null)continue;
  if(t.mode==='slider'&&Number.isFinite(x))s.bodyDesign[t.id]=Math.min(t.max,Math.max(t.min,x));
  else if(t.mode==='multi'&&Array.isArray(x))s.bodyDesign[t.id]=[...new Set(x.filter(k=>t.options.some(o=>o.id===k)))];
  else if(t.options?.some(o=>o.id===x))s.bodyDesign[t.id]=x;
 }
 for(const it of nativeChoices){const n=integer(raw.native?.[it.id],it.max);if(n)s.native[it.id]=n}
 for(const [g,ed] of Object.entries(editions)){
  const src=raw.foreign?.[g];if(!src)continue;
  const dst=s.foreign[g];
  for(const it of ed.choices){
   const n=integer(src.picks?.[it.id],it.max);if(!n)continue;
   if(g==='dxd'&&lineageSources[it.id]){const id=lineageSources[it.id];if(!s.races.includes(id))s.races.push(id)}
   else if(g==='dxd'&&it.id==='d7sc'){for(const id of sharedSchools)s.ranks[id]=Math.max(1,s.ranks[id]||0)}
   else dst.picks[it.id]=n;
  }
  if(raw.rulesVersion!==2&&src.mode){
   const mode=ed.modes.find(m=>m.id===src.mode);
   if(mode)s.carryBudget+=sum(ed.coins.map(k=>modeGrant(s,mode,k)+(ed.starting?.[k]||0)));
  }
 }
 if(raw.rulesVersion===2)s.carryBudget=Number.isSafeInteger(raw.carryBudget)?Math.max(-100000,Math.min(100000,raw.carryBudget)):0;
 if(raw.rulesVersion!==2&&Object.values(raw.foreign||{}).some(f=>f?.mode)){
  const shortfall=-ledger(s,ally?50:100,ally).points;if(shortfall>0)s.carryBudget+=shortfall;
 }
 s.attunement=['Fire','Water','Earth','Air'].includes(raw.attunement)?raw.attunement:'Fire';
}
function describeBody(t,v){
 if(v===undefined||v===null)return '';
 if(t.mode==='slider')return v===0?'Center':(v<0?t.lowLabel:t.highLabel)+' '+Math.round(100*Math.abs(v))+'%';
 const names=(Array.isArray(v)?v:[v]).map(x=>t.options.find(o=>o.id===x)?.name).filter(Boolean);return names.join(', ');
}
function depthSummary(s){
 const rows=[];
 if(s.budgetMode!=='sheet'||s.carryBudget)rows.push(['Starting points',startingPoints(s,100).toLocaleString()]);
 const parts=bodySections.filter(t=>Object.hasOwn(s.bodyDesign,t.id)).map(t=>t.name+' · '+describeBody(t,s.bodyDesign[t.id]));if(parts.length)rows.push(['Physical build',parts.join('; ')]);
 for(const topic of new Set(libraryEntries.map(x=>x.it.topic))){
  const picks=libraryEntries.filter(({g,it})=>it.topic===topic&&editionCount(s,g,it.id)).map(({g,it})=>it.name+(it.id==='lmr9'?' ('+s.attunement+')':'')+(editionCount(s,g,it.id)>1?' ×'+editionCount(s,g,it.id):''));
  if(picks.length)rows.push([topic,picks.join(', ')]);
 }
 return rows;
}
