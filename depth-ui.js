'use strict';
const sourceView={group:'',query:'',filter:'all'};
let bodyGroup='Silhouette';
const sheetTitle={dxd:'High School DxD',naruto:'Naruto',native:'Six-Faced World'};
function sourceLink(url,label){return '<a class="source-link" target="_blank" rel="noopener noreferrer" href="'+esc(url)+'">'+esc(label)+'</a>'}
function depthUndoTool(){return '<div class="depth-tools">'+bt('sources','Sources','linkbtn')+bt('undo-choice','↶ Undo last change','tool-chip','',history.length?'':'disabled')+'</div>'}
function bookDoor(label,ed){return '<div class="book-door">'+bt('open-book',icon('book')+esc(label),'outline-btn',ed)+'</div>'}
function printCoins(b){return Object.entries(b).map(([k,v])=>'<span><b>'+v+'</b> '+esc(k)+'</span>').join('')}
function shelfBanner(id,title,sub){
 return '<div class="depth-banner">'+img('depth-chapter-'+id,'','')+'<div><h3>'+esc(title)+'</h3>'+(sub?'<p>'+esc(sub)+'</p>':'')+'</div></div>';
}
function sourcesPage(){
 return centerTitle('Attribution & rules','The source shelf')+'<p>Each imported card links to its source and records its original choice ID. Every printed cost is converted into character points. Printed point denominations convert one for one here. This edition combines them, applies shared ancestry prerequisites, and continues the printed training curve beyond God.</p>'+
 sourceLink(mtEditionUrl,'Chuchurrumin · Mushoku Tensei CYOA 2.1')+
 '<p>Special Mode and its four point controls, the extra gifts, and the named equipment come from this edition. The supplied v1.1 sheets provide the original eight chapters.</p>'+
 Object.entries(editions).map(([id,ed])=>sourceLink(ed.url,'Gaston · '+ed.name)+'<p>'+esc(ed.credit||'Selected choices and conditions from the published interactive project, with descriptions written for this edition.')+'</p>').join('')+
 window.DEPTH_BOOK.bodySources.filter(x=>!['naruto','dxd'].includes(x.id)).map(x=>sourceLink(x.url,x.name)+'<p>'+esc(x.attribution||'')+' '+(x.licenseUrl?sourceLink(x.licenseUrl,x.license):esc(x.license||''))+' '+esc(x.adaptation||'Appearance controls adapted for this character sheet.')+'</p>').join('')+
 '<p>The proportions study uses the MakeHuman hm08 mesh and MPFB morph targets, released under CC0. The clothing, lighting, and viewer are part of this adaptation. '+sourceLink('https://github.com/makehumancommunity/mpfb2/tree/9de0707fdc88438d7c53a1a2ac7937d9221e2431/src/mpfb/data','MakeHuman Community · model data')+'</p>';
}
function sourcePickInfo(g,id){
 const s=getBuild(),it=catalog[g][id],n=editionCount(s,g,id),included=includedBy(s,g,id);
 return {...it,n,on:n>0||!!included,price:included?'Included':pointLabel(purchasePrice(s,g,it)),action:'source-pick',arg:g+'|'+id+'|'+(n&&it.max===1?-1:1)};
}
function sourceLocation(g,id){if(id==='leaky-limiter')return limiterSource;return g==='native'?mtEditionUrl:editions[g].url}
function constraintLinks(node,g){
 if(typeof node==='string'&&g==='dxd'&&lineageSources[node])return bt('locate-source',esc(catalog.races[lineageSources[node]].name),'prereq-link',g+'|'+node);
 if(typeof node==='string')return catalog[g][node]?bt('locate-source',esc(catalog[g][node].name),'prereq-link',g+'|'+node):esc(requirementText(node,g));
 if(node.not)return 'Without '+constraintLinks(node.not,g);
 if(node.any)return (node.min>1?node.min+' of ':'one of ')+node.any.map(n=>constraintLinks(n,g)).join(' / ');
 if(node.all)return node.all.map(n=>constraintLinks(n,g)).join(' + ');
 return constraintLinks(node.id,g)+(node.times?' ×'+node.times:'');
}
function extraEffects(it,g,picks){
 if(g==='native')return '';
 return (it.modifiers||[]).map(m=>'<div class="source-synergy"><strong>'+esc(m.name)+'</strong> · '+(m.requires.every(n=>conditionMet(n,picks))?'Active':'Requires '+m.requires.map(n=>constraintLinks(n,g)).join(' + '))+'<p>'+esc(m.desc)+'</p></div>').join('');
}

function sourceCard(g,it){
 const ref=g+'|'+it.id, info=sourcePickInfo(g,it.id),s=getBuild(),picks=linkedPicks(s,g);
 const adding=inspectPick({...info,arg:ref+'|1'}), taking=info.n?inspectPick({...info,arg:ref+'|-1'}):null;
 const hasRoom=info.n<it.max, multi=it.max>1;
 const primary=info.n&&!multi?taking:adding;
 const quantity=multi?'<div class="quantity-line"><label>Quantity <input type="number" data-source-qty min="0" max="'+it.max+'" step="1" value="'+info.n+'" aria-label="'+esc(it.name)+' quantity"></label>'+bt('source-quantity','Apply','soft-btn',ref)+'<small>0–'+it.max+'</small></div>':'';
 const button=bt('source-pick',info.n&&!multi?icon('check')+'Remove':includedBy(s,g,it.id)?'Included':multi?'Add one':'Choose','inscribe',info.arg,(primary?.error||(!hasRoom&&multi)?'disabled':'')+' aria-label="'+esc((info.n&&!multi?'Remove ':'Choose ')+it.name)+'"');
 const detail=g==='native'&&it.id==='lmr9'&&info.n?'<label class="field">Staff element<select data-attunement>'+['Fire','Water','Earth','Air'].map(x=>'<option '+(s.attunement===x?'selected':'')+'>'+x+'</option>').join('')+'</select></label>':'';
 return '<article class="source-card '+(info.n?'selected':'')+'" data-ref="'+ref+'" data-name="'+esc((it.name+' '+it.desc+' '+it.topic).toLowerCase())+'" data-group="'+esc(it.topic)+'" data-owned="'+!!info.on+'" data-affordable="'+(!adding.error&&hasRoom)+'" data-power="'+!!it.power+'">'+
 '<div class="source-picture">'+bt('art-study',choiceImage(g,it.id,'card-img'),'art-pick',ref,'aria-label="Inspect '+esc(it.name)+' in 3D"')+'</div><div class="source-copy"><div class="source-crown"><small>'+esc(it.topic)+'</small><span class="cost">'+esc(info.price)+'</span></div><h4>'+esc(it.name)+'</h4><p>'+esc(it.desc)+'</p>'+
 (it.requires?.length?'<div class="required-list">Requires '+it.requires.map(n=>constraintLinks(n,g)).join(' + ')+'</div>':'')+extraEffects(it,g,picks)+detail+(guide.books[g]?.[it.id]?.related||[]).map(r=>'<p class="source-synergy">'+esc(r.reason)+'</p>').join('')+
 (g!=='native'&&it.prices?.some(x=>x.when?.length)?'<details class="price-details"><summary>Conditional prices</summary>'+it.prices.map(x=>'<p>'+esc(pointLabel(x.amount))+' · '+(x.when?.length?x.when.map(n=>constraintLinks(n,g)).join(' + '):'Always')+'</p>').join('')+'</details>':'')+
 '<div class="source-origin">'+sourceLink(sourceLocation(g,it.id),it.id==='leaky-limiter'?'Mushoku Tensei Jump v1.0 · page 5':(g==='native'?'2.1':sheetTitle[g])+' · '+it.id)+'</div>'+
 (primary?.error?'<div class="pick-warning">'+esc(primary.error)+'</div>':'')+
 '<div class="source-foot">'+button+(multi?'<span>×'+info.n+'</span>'+bt('source-pick','−','pin-choice',ref+'|-1',!info.n||taking?.error?'disabled':''):'')+pinButton(g,it.id)+'</div>'+quantity+'</div></article>';
}
function sourcebookPage(s){
 const groups=[...new Set(talentEntries.map(x=>x.it.topic))],group=sourceView.group;
 return '<div class="source-search"><label>Find a choice<input type="search" data-source-query placeholder="Search names and abilities" value="'+esc(sourceView.query)+'"></label><label>Discipline<select data-source-group><option value="">All disciplines</option>'+groups.map(k=>'<option value="'+esc(k)+'" '+(group===k?'selected':'')+'>'+esc(k)+'</option>').join('')+'</select></label><label>Show<select data-source-filter>'+[['all','All choices'],['available','Available now'],['picked','My purchases'],['power','Beyond ordinary limits']].map(([k,n])=>'<option value="'+k+'" '+(sourceView.filter===k?'selected':'')+'>'+n+'</option>').join('')+'</select></label></div>'+
 '<p class="source-count" role="status"></p><div class="source-grid">'+talentEntries.map(({g,it})=>sourceCard(g,it)).join('')+'</div><div class="source-none" hidden>No choices match these filters. '+bt('clear-filters','Clear filters','linkbtn')+'</div>';
}
function filterSourceCards(){
 if(current!=='sourcebooks')return;
 const key=sourceView.query.trim().toLowerCase();let n=0;
 for(const el of document.querySelectorAll('#chapter .source-card')){
  el.hidden=!!((key&&!el.dataset.name.includes(key))||(sourceView.group&&el.dataset.group!==sourceView.group)||(sourceView.filter==='available'&&el.dataset.affordable!=='true')||(sourceView.filter==='picked'&&el.dataset.owned!=='true')||(sourceView.filter==='power'&&el.dataset.power!=='true'));
  if(!el.hidden)n++;
 }
 const label=document.querySelector('.source-count');if(label)label.textContent=n+' '+(n===1?'choice':'choices');
 const empty=document.querySelector('.source-none');if(empty)empty.hidden=!!n;
}
function openBook(topic='',filter='all'){
 Object.assign(sourceView,{group:topics.get(topic)||'',query:'',filter});
 navigate('sourcebooks');
}
function openSourceChoice(g,id){
 if(id==='leaky-limiter'){tabs.magic='ranks';tabs.magicTrack='mana';navigate('magic');document.querySelector('[data-ref="native|leaky-limiter"]')?.scrollIntoView({block:'center'});return}
 if(g==='dxd'&&lineageSources[id])return goToPick('races|'+lineageSources[id]);
 if(g==='dxd'&&id==='d7sc')return goToPick('ranks|elemental-1');
 const tab=heritageTab(g,id);if(tab){tabs.heritage=tab;navigate('lineage')}else openBook(guide.books[g]?.[id]?.group);
 const target=document.querySelector('[data-ref="'+g+'|'+id+'"]');if(target){target.scrollIntoView({block:'center',behavior:'instant'});target.querySelector('button')?.focus({preventScroll:true});target.classList.add('found-choice')}
}
function depthShelf(s){
 const appearance=bodySections.filter(t=>Object.hasOwn(s.bodyDesign,t.id));
 let html=appearance.length?'<section class="pick-group"><h3>Physical build</h3><p>'+esc(appearance.map(t=>describeBody(t,s.bodyDesign[t.id])).filter(Boolean).join(' · '))+'</p>'+bt('body-editor','Edit features','linkbtn')+'</section>':'';
 for(const topic of topics.values()){
  const chosen=libraryEntries.filter(({g,it})=>it.topic===topic&&editionCount(s,g,it.id)>0);
  if(chosen.length)html+='<section class="pick-group"><h3>'+esc(topic)+'</h3><div class="picks-shelf">'+chosen.map(({g,it})=>bt('go-pick',choiceImage(g,it.id)+'<span><strong>'+esc(it.name)+'</strong><small>×'+editionCount(s,g,it.id)+'</small></span>','shelf-pick',g+'|'+it.id)).join('')+'</div></section>';
 }
 return html;
}
function fundingPage(s){
 const base=startingPoints(s,allowance(),editAlly!==null),remaining=ledger(s,allowance(),editAlly!==null).points;
 let html=shelfBanner('rules','Character points',remaining.toLocaleString()+' available · '+base.toLocaleString()+' starting points')+'<p class="rules">Ancestry, training, powers, and equipment all draw on this balance. Drawbacks return points. Your origin covers a number of upbringing choices and companions. Fate covers four initial steps. Each uncovered unit costs one point.</p>';
 if(editAlly!==null)return html;
 const opts=[['sheet','Original sheet','100 points'],['special','Custom starting points','Set your own total'],['epic','Expanded build','1,000 points'],['unbound','God Mode','20,000 points']];
 html+='<div class="budget-options">'+opts.map(([id,name,value])=>bt('native-mode','<strong>'+name+'</strong><span>'+value+'</span>','budget-card '+(s.budgetMode===id?'on':''),id,'aria-pressed="'+(s.budgetMode===id)+'"')).join('')+'</div>';
 if(s.carryBudget)html+='<p class="rules">'+esc(s.carryBudget)+' starting points carried forward from your earlier allowances.</p>';
 if(s.budgetMode==='special')html+='<div class="depth-panel"><h3>Custom allowance</h3><div class="lot-grid">'+specialLots.map((l,i)=>'<div><strong>'+l.value+'-point lots</strong><div class="stepper">'+bt('point-lot','−','',i+'|-1',!s.pointLots[i]?'disabled':'')+'<span>'+s.pointLots[i]+'</span>'+bt('point-lot','+','',i+'|1',s.pointLots[i]>=l.max?'disabled':'')+'</div></div>').join('')+'</div></div>';
 return html;
}
function raceArt(id){const race=catalog.races[id];return race?.sourceId?window.DEPTH_ART['dxd/'+race.sourceId]?.art:''}
function raceNotes(it){
 const sid=it.sourceId||raceSource(it.id),x=catalog.dxd[sid],notes=[];
 if(it.id==='elf')notes.push('This ancestry also qualifies you for High Elf. The alternative elven tradition emphasizes night vision, balance, and a bond with wild places.');
 if(it.id==='human')notes.push('Human counts toward human ancestry prerequisites in every discipline.');
 if(it.id==='nine-tailed-kitsune')notes.push('Includes Youkai ancestry. Choosing this form upgrades an existing Youkai and credits the earlier price.');
 if(it.id==='devil')notes.push('Includes Demonic Power. This ancestry opens the devil ascension path.');
 if(it.id==='dragon')notes.push('Opens the Dragon King, Heavenly Dragon, and Dragon God progression.');
 const req=x?.requires?.length?'<p class="required-list">Requires '+x.requires.map(r=>constraintLinks(r,'dxd')).join(' + ')+'</p>':'';
 return notes.map(n=>'<p class="character-hook">'+esc(n)+'</p>').join('')+req+(x?extraEffects(x,'dxd',linkedPicks(getBuild(),'dxd')):'')+(sid?'<p class="source-origin">'+sourceLink(editions.dxd.url,'Source · Gaston · '+sid)+'</p>':'');
}
function ancestryPage(s){
 const chosen=s.races.map(id=>catalog.races[id]),alt=BOOK.races.filter(x=>x.sourceId),active=tabs.heritage||'species';
 const matching=bloodlineAdvances.filter(id=>catalog.dxd[id].requires.every(r=>conditionMet(r,linkedPicks(s,'dxd'))));
 const display=chosen.length?'<div class="ancestry-portraits">'+chosen.map(x=>choiceImage('races',x.id)).join('')+'</div>':'';
 const name=chosen.length?chosen.map(x=>x.name).join(' × '):'Choose your first ancestry';
 const actions=chosen.map(x=>bt('select','Remove '+esc(x.name),'tool-chip','races|'+x.id)).join('');
 const detail=chosen.length>1?'Your child inherits a blend of these lineages. Each ancestry qualifies for its bloodline advances. The sheet leaves the exact expression of mixed traits to you.':'Adding another distinct ancestry creates a hybrid. Each lineage costs its listed price once.';
 const heritage=chosen.map(x=>x.id==='vampire'&&chosen.some(y=>y.id==='human')?'Dhampir · Your human and vampire ancestry follows the dhampir variant described on the Vampire card.':null).filter(Boolean);
 if(s.races.includes('devil')&&s.races.includes('fallen-angel'))heritage.push(s.foreign.dxd.picks.vhye?'Creature of Sin · Your holy light and demonic power coexist in balance.':'Your Devil and Fallen Angel ancestry unlocks Creature of Sin in Bloodline advances.');
 const intro='<section class="heritage-panel">'+display+'<div><small>'+(chosen.length>1?'Hybrid ancestry':'Ancestry')+'</small><h3>'+esc(name)+'</h3><p>'+esc(detail)+'</p>'+heritage.map(t=>'<p>'+esc(t)+'</p>').join('')+'<div class="heritage-actions">'+actions+'</div></div></section>'+
 tabsBar('heritage',[['species','Species'],['clans','Clans & inherited gifts'],['advances','Bloodline advances']]);
 if(active==='clans')return intro+'<p class="rules">A clan is a family inheritance. You can combine it with the species already in your ancestry.</p><div class="source-grid">'+libraryEntries.filter(({g,it})=>heritageTab(g,it.id)==='clans').map(({g,it})=>sourceCard(g,it)).join('')+'</div>';
 if(active==='advances')return intro+'<p class="rules">Your ancestry opens the first step of its bloodline. Each later step shows the advance it requires.</p><div class="source-grid">'+bloodlineAdvances.map(id=>sourceCard('dxd',catalog.dxd[id])).join('')+'</div>';
 return intro+(matching.length?'<div class="lineage-route">'+bt('tab','View your bloodline advances','outline-btn','heritage|advances')+'</div>':'')+
 '<h3 class="section-title">Six-Faced World species</h3>'+cards('races',BOOK.races.filter(x=>!x.sourceId))+
 '<h3 class="section-title">Alternative species</h3><p class="hint">Mix any of these with the lineages above or with one another.</p>'+cards('races',alt);
}
function beyondPanel(id){
 const s=getBuild(),n=count(s.ranks,id),next=Math.max(8,n+1),diff=tri(next)-tri(n),left=ledger(s,allowance(),editAlly!==null).points;
 const targetLevel=Math.min(500,next),editor='<div class="advance-target"><label>Target level <input type="number" min="8" max="500" step="1" data-rank-target value="'+targetLevel+'"></label><output aria-live="polite">'+rankName(targetLevel)+' · '+tri(targetLevel)+' pts total</output>'+bt('set-target','Apply target','soft-btn',id)+'</div>';
 const ref='ranks|'+id+'-'+(n>7?n:8),name=trackLabel(id);
 return '<section class="ascension-panel" data-ref="'+ref+'">'+choiceImage('ranks',id+'-7','ascension-art')+'<div><small>Extended training · '+esc(name)+'</small><h3>Beyond God rank</h3><p>The printed ladder ends at God. Continue this discipline on the same cost curve. God +1 is level 8 and costs 36 points in total. Each subsequent step costs its new level.</p><p><strong>Current · '+esc(printedRank(id,n))+'</strong> · '+tri(n)+' points invested</p><div class="heritage-actions">'+bt('rank','Train to '+rankName(next)+' · '+diff+' pts','gold-btn',id+'|'+next,next>500||diff>left?'disabled':'')+(n>7?bt('rank','Return to '+rankName(n-1)+' · refund '+n+' pts','soft-btn',id+'|'+(n-1)):'')+'</div>' +editor+(diff>left?'<p class="pick-warning">Needs '+(diff-left)+' more points. '+bt('chapter','Change starting points','linkbtn','rules')+'</p>':'')+'</div></section>'+(id==='mana'?'<h3 class="section-title">Long-term mana growth</h3><div class="source-grid">'+sourceCard('native',catalog.native['leaky-limiter'])+'</div>':'');
}

function physicalPage(s){
 const groups=[...new Set(bodySections.map(t=>t.group))],controls=bodySections.filter(t=>t.group===bodyGroup);
 return '<div class="body-stage-grid"><div class="mannequin-panel"><div class="model-head"><strong>Proportion study</strong>'+bt('body-reset-camera','Front view','linkbtn')+'</div><canvas id="body-preview" width="420" height="485" tabindex="0" aria-label="Rotatable character proportions model. Drag or use left and right arrow keys."></canvas><div class="model-tools">'+bt('body-zoom','Full figure','soft-btn','body')+bt('body-zoom','Face','soft-btn','face')+'</div><p>Drag to turn · arrow keys to rotate</p><div class="body-caption" aria-live="polite">'+esc(bodyCaption(s.bodyDesign))+'</div></div><div class="body-controls"><div class="subtabs morph-tabs">'+groups.map(k=>bt('body-group',esc(k),bodyGroup===k?'on':'',k,'aria-pressed="'+(bodyGroup===k)+'"')).join('')+'</div>'+
 '<div class="body-section-head"><h3>'+esc(bodyGroup)+'</h3>'+bt('roll-body',icon('dice')+'Roll this group','tool-chip',bodyGroup)+'</div>'+controls.map(t=>bodyControl(t,s.bodyDesign[t.id])).join('')+'</div></div>';
}
function bodyCaption(d){return ['height','build','head-shape','skin-tone','eye-color','hair-color'].filter(k=>d[k]).map(k=>{const t=bodySections.find(t=>t.id===k);return t?describeBody(t,d[k]):''}).filter(Boolean).join(' · ')||'Neutral study'}
function bodyControl(t,v){
 const label=t.name,src=sourceLink(t.url,t.source+' · '+(t.sourceSection||label));
 if(t.mode==='slider')return '<div class="morph-control"><label for="morph-'+t.id+'">'+esc(label)+'</label><output for="morph-'+t.id+'">'+esc(describeBody(t,v??0))+'</output><input id="morph-'+t.id+'" data-morph="'+t.id+'" type="range" min="'+t.min+'" max="'+t.max+'" step="'+t.step+'" value="'+(v??t.default??0)+'"><div class="morph-ends"><span>'+esc(t.lowLabel)+'</span><span>'+esc(t.highLabel)+'</span></div><small>'+src+'</small></div>';
 return '<fieldset class="trait-choices"><legend>'+esc(label)+'</legend><div class="trait-list">'+t.options.map(o=>{const on=Array.isArray(v)?v.includes(o.id):v===o.id;return bt('body-choice',(o.art?img(o.art,'trait-thumb',''):'')+esc(o.name),'trait-option '+(on?'on':''),t.id+'|'+o.id,'aria-pressed="'+on+'"')}).join('')+'</div><small>'+src+'</small></fieldset>';
}
document.addEventListener('click',e=>{
 const b=e.target.closest('button[data-act]');if(!b||b.disabled)return;
 const a=b.dataset.act,v=b.dataset.arg||'',[g,k,n]=v.split('|');
 if(a==='jump-ascension'){const dest=document.querySelector('.ascension-panel');dest?.scrollIntoView({block:'center'});dest?.querySelector('input')?.focus({preventScroll:true})}
 if(a==='set-target'){const el=b.parentElement.querySelector('input');if(el.checkValidity()&&Number.isInteger(el.valueAsNumber))mutate(s=>{s.ranks[v]=el.valueAsNumber});else el.reportValidity()}
 if(a==='sources')openDialog('sources');
 if(a==='open-book'){closeDialog();openBook(v,v==='power'?'power':'all')}
 if(a==='clear-filters')openBook();
 if(a==='locate-source'){closeDialog();openSourceChoice(g,k)}
 if(a==='source-quantity'){
  const input=b.closest('.quantity-line').querySelector('input'),val=input.valueAsNumber;
  if(!Number.isInteger(val)||!input.checkValidity()){input.reportValidity();return}
  mutate(s=>changeDepthChoice(s,g,k,val-editionCount(s,g,k)));
 }
 if(a==='source-pick')mutate(s=>changeDepthChoice(s,g,k,Number(n)));
 if(a==='native-mode'&&editAlly===null)mutate(s=>{s.budgetMode=v});
 if(a==='point-lot')mutate(s=>{const i=Number(g),amount=s.pointLots[i]+Number(k);if(amount>=0&&amount<=specialLots[i].max)s.pointLots[i]=amount});

 if(a==='body-group'){bodyGroup=v;renderChapter()}
 if(a==='body-choice')mutate(s=>{const t=bodySections.find(t=>t.id===g);if(t.mode==='multi'){const xs=s.bodyDesign[g]||[];toggle(xs,k);if(xs.length)s.bodyDesign[g]=xs;else delete s.bodyDesign[g]}else if(s.bodyDesign[g]===k)delete s.bodyDesign[g];else s.bodyDesign[g]=k});
 if(a==='roll-body')mutate(s=>{for(const t of bodySections.filter(t=>t.group===v)){if(t.mode==='slider'){s.bodyDesign[t.id]=Number((t.min+Math.floor(Math.random()*(Math.round((t.max-t.min)/t.step)+1))*t.step).toFixed(3))}else if(t.mode==='multi'){if(Math.random()<.5)s.bodyDesign[t.id]=[pick(t.options).id];else delete s.bodyDesign[t.id]}else s.bodyDesign[t.id]=pick(t.options).id}},'Physical features rolled.');
});
document.addEventListener('input',e=>{
 const el=e.target;
 if(el.matches('[data-rank-target]')){const out=el.closest('.advance-target').querySelector('output'),n=el.valueAsNumber;out.textContent=el.checkValidity()&&Number.isInteger(n)?rankName(n)+' · '+tri(n)+' pts total':'Choose a whole level from 8 to 500.'}
 if(el.matches('[data-source-query]')){sourceView.query=el.value;filterSourceCards()}
 if(el.matches('[data-model-name]')){getBuild().modelCharacter=el.value.slice(0,80);persist()}
 if(el.matches('[data-morph]')){const t=bodySections.find(t=>t.id===el.dataset.morph);el.previousElementSibling.textContent=describeBody(t,+el.value);window.ChronicleFigure?.preview({...getBuild().bodyDesign,[t.id]:+el.value})}
});
document.addEventListener('change',e=>{
 const el=e.target;
 if(el.matches('[data-source-group]')){sourceView.group=el.value;filterSourceCards()}
 if(el.matches('[data-source-filter]')){sourceView.filter=el.value;filterSourceCards()}
 if(el.matches('[data-attunement]'))mutate(s=>{s.attunement=el.value});
 if(el.matches('[data-morph]')){const id=el.dataset.morph,v=+el.value;mutate(s=>{s.bodyDesign[id]=v});document.querySelector('[data-morph="'+id+'"]')?.focus({preventScroll:true})}
});

