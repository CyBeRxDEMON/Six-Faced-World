'use strict';
// Sandbox units and costs exist only on the casting bench.
const trialSpells={
 flame:{name:'Flame mote',school:'elemental',specialty:'fire',color:'#ff9d62',form:'fire'},
 tide:{name:'Tidal spiral',school:'elemental',specialty:'water-specialty',color:'#82d9ff',form:'water'},
 stone:{name:'Stone bloom',school:'elemental',specialty:'earth',color:'#b1d493',form:'earth'},
 dawn:{name:'Dawn lantern',school:'holy',specialty:'healing',color:'#ffe69e',form:'holy'},
 spirit:{name:'Spirit lantern',school:'arrays',specialty:'summoner',color:'#d4a8ff',form:'summon'}
};
let trial=null,trialAnimation=0;
function trialRank(s,def){return count(s.ranks,def.school)+count(s.specialties,def.specialty)}
function newTrial(spell='flame'){
 const s=getBuild(),def=trialSpells[spell];trial={spell,mana:count(s.ranks,'mana'),tier:Math.max(1,trialRank(s,def)),used:0,casts:0};
}
function trialFigures(){const capacity=4*2**trial.mana,cost=2**(trial.tier-1),left=capacity-trial.used;return {capacity,cost,left,remaining:Math.floor(left/cost)}}
function renderTrial(s){
 if(!trial)newTrial();const t=trial,def=trialSpells[t.spell];
 return '<div class="cast-bench"><div class="cast-stage"><canvas id="spell-glass" width="700" height="440" role="img" aria-label="Illustrated spell test chamber"></canvas><div class="cast-engraving">'+esc(def.name)+'</div></div><div class="lab-controls"><h3>Casting bench</h3><p class="hint">Test a spell at different ranks and see how many casts your reserve supports.</p><label class="field">Spell<select id="trial-spell">'+Object.entries(trialSpells).map(([id,x])=>'<option value="'+id+'" '+(t.spell===id?'selected':'')+'>'+esc(x.name)+'</option>').join('')+'</select></label><p class="small">Your '+esc(catalog.specialties[def.specialty].name)+' rank · '+rankName(trialRank(s,def))+'</p><div class="paired"><label class="field">Trial mana reserve<select id="trial-mana">'+['Average',...Array.from({length:Math.max(7,t.mana,count(s.ranks,'mana'))},(_,i)=>rankName(i+1))].map((name,i)=>'<option value="'+i+'" '+(i===t.mana?'selected':'')+'>'+name+'</option>').join('')+'</select></label><label class="field">Trial spell rank<select id="trial-tier">'+Array.from({length:Math.max(7,t.tier,trialRank(s,def))},(_,i)=>({name:rankName(i+1)})).map((r,i)=>'<option value="'+(i+1)+'" '+(i+1===t.tier?'selected':'')+'>'+r.name+'</option>').join('')+'</select></label></div><div id="trial-dials" aria-live="polite"></div><p class="formula">Practice scale · Average mana holds 4 units. Elementary costs 1 unit. Each higher reserve or spell rank doubles its value. This is an original simulation scale.</p><p class="small">Trial settings do not spend character points.</p></div></div>';
}
function drawTrialDials(){
 if(!trial||!document.querySelector('#trial-dials'))return;
 const n=trialFigures();
 document.querySelector('#trial-dials').innerHTML='<div class="reservoir"><span style="width:'+100*n.left/n.capacity+'%"></span></div><div class="metric-grid">'+metric('Mana remaining',n.left+' / '+n.capacity)+metric('Cost per cast',n.cost+' '+(n.cost===1?'unit':'units'))+metric('Casts left',n.remaining)+metric('Casts made',trial.casts)+'</div>'+(n.remaining===0?'<p class="hint">'+(n.capacity<n.cost?'Raise the trial reserve or lower the spell rank for an affordable cast.':'Refill the reserve to cast again.')+'</p>':'')+'<div class="actions">'+bt('trial-cast',icon('magic')+'Cast '+trialSpells[trial.spell].name,'gold-btn','',n.remaining<1?'disabled':'')+bt('trial-refill','Refill mana','soft-btn','',trial.used?'':'disabled')+'</div>';
}
function drawSpell(phase=0){
 const canvas=document.getElementById('spell-glass');if(!canvas||!trial)return;
 const c=canvas.getContext('2d'),W=canvas.width,H=canvas.height,spell=trialSpells[trial.spell],col=spell.color;
 const cx=W/2,cy=H*.68,r=85+Math.min(12,trial.tier)*7,pulse=phase?Math.sin(phase*Math.PI):0;
 c.clearRect(0,0,W,H);let bg=c.createRadialGradient(cx,H*.55,0,cx,H*.5,440);bg.addColorStop(0,'#382c47');bg.addColorStop(.7,'#211b2a');bg.addColorStop(1,'#121218');c.fillStyle=bg;c.fillRect(0,0,W,H);
 for(let i=0;i<90;i++){const x=(i*163+17)%W,y=(i*93+53)%H;c.globalAlpha=.25+(i%4)*.12;c.fillStyle=i%3?col:'#e2c899';c.fillRect(x,y,i%5===0?2:1,1.5)}c.globalAlpha=1;
 c.save();c.translate(cx,cy);c.scale(1,.32);c.shadowColor=col;c.shadowBlur=12;c.strokeStyle=col;
 [r*.58,r*.92,r,r*1.2].forEach((size,i)=>{c.globalAlpha=.45+i*.1;c.lineWidth=i===1?3:1.5;c.beginPath();c.arc(0,0,size,0,Math.PI*2);c.stroke()});
 c.rotate(phase*1.5);for(let i=0;i<28;i++){c.rotate(Math.PI/14);c.beginPath();c.moveTo(0,-r*.98);c.lineTo(0,-r*(i%4===0?1.16:1.06));c.stroke()}for(let j=0;j<2;j++){c.rotate(Math.PI/3);c.beginPath();for(let i=0;i<3;i++){let a=i*2*Math.PI/3-Math.PI/2;c[i?'lineTo':'moveTo'](Math.cos(a)*r*.9,Math.sin(a)*r*.9)}c.closePath();c.stroke()}c.restore();
 const orbY=cy-83-pulse*48;let light=c.createRadialGradient(cx,orbY,1,cx,orbY,80+pulse*70);light.addColorStop(0,'#fff7e7');light.addColorStop(.06,col);light.addColorStop(.25,col+'9c');light.addColorStop(1,col+'00');c.fillStyle=light;c.fillRect(0,0,W,H);
 c.save();c.shadowColor=col;c.shadowBlur=13;c.strokeStyle=col;c.fillStyle=col;c.lineWidth=2;
 const t=phase*2*Math.PI,amount=18+Math.min(12,trial.tier)*3;
 for(let i=0;i<amount;i++){const a=i*2.39996+t*.35,q=i/amount,range=(24+55*q)*(1+pulse*.85);let x=cx+Math.cos(a)*range,y=orbY+Math.sin(a)*range*.55;
 if(spell.form==='fire'){y-=q*(20+65*pulse);c.globalAlpha=.4+q*.55;c.beginPath();c.moveTo(x,y-7-q*7);c.quadraticCurveTo(x+8,y+5,x,y+6);c.quadraticCurveTo(x-6,y+2,x,y-7-q*7);c.fill()}
 else if(spell.form==='water'){c.globalAlpha=.25+.72*q;c.beginPath();c.ellipse(x,y,4+q*5,2+q*2,a,0,2*Math.PI);c.stroke()}
 else if(spell.form==='earth'){c.globalAlpha=.4+q*.56;c.beginPath();c.moveTo(x-5,y+2);c.lineTo(x+q*4,y-11);c.lineTo(x+7,y+6);c.closePath();c.stroke()}
 else if(spell.form==='holy'){c.globalAlpha=.45+q*.45;c.beginPath();c.moveTo(x-4,y);c.lineTo(x+4,y);c.moveTo(x,y-6);c.lineTo(x,y+6);c.stroke()}
 else{c.globalAlpha=.6+q*.3;c.beginPath();c.arc(x,y,2+q*3,0,2*Math.PI);c.fill();if(i%6===0){c.beginPath();c.arc(cx,orbY,range,a,a+.5);c.stroke()}}
 }
 c.restore();canvas.setAttribute('aria-label',spell.name+' at '+rankName(trial.tier)+' rank, '+trial.casts+' practice casts');
}
function castOnce(){
 const n=trialFigures();if(!n.remaining)return;trial.used+=n.cost;trial.casts++;drawTrialDials();cancelAnimationFrame(trialAnimation);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){drawSpell(.48);return}
 const start=performance.now();function frame(now){if(!document.querySelector('#spell-glass'))return;const p=Math.min(1,(now-start)/1200);drawSpell(p);if(p<1)trialAnimation=requestAnimationFrame(frame)}trialAnimation=requestAnimationFrame(frame);
}
document.addEventListener('click',e=>{const act=e.target.closest('button[data-act]')?.dataset.act;if(act==='trial-cast')castOnce();if(act==='trial-refill'){trial.used=0;trial.casts=0;drawTrialDials();drawSpell()}});
document.addEventListener('change',e=>{const k=e.target.id;if(!['trial-mana','trial-tier','trial-spell'].includes(k))return;cancelAnimationFrame(trialAnimation);if(k==='trial-spell')newTrial(e.target.value);else{trial[k==='trial-mana'?'mana':'tier']=Number(e.target.value);trial.used=0;trial.casts=0}renderWorkshopPage()});

