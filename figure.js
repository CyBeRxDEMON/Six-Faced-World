/* MakeHuman hm08 and MPFB morphs (CC0); garment and lighting are preview geometry. */
window.ChronicleFigure = (() => {
  let model, canvas, painter, yaw=-0.14, face=false, design={}, frame=0, actor;
  const baseColors={pale:'#edd4c4','light-skin':'#d6aa8b',tanned:'#bc8867','dark-skin':'#825a4a',other:'#abb6c5'};
  const colors={blonde:'#c29c69',brown:'#554031',black:'#322c33',red:'#9a4737',white:'#d1c8ba',blue:'#427294',orange:'#b67440',purple:'#715582',green:'#59735a',pink:'#ab7487',other:'#797185','yellow-gold':'#b19c47'};
  const rgb=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)/255);
  function array(s,Type){const b=Uint8Array.from(atob(s),c=>c.charCodeAt(0));return new Type(b.buffer)}
  function loadMesh(){
    const m=window.CHRONICLE_MESH;
    const targets=Object.fromEntries(Object.entries(m.targets).map(([k,v])=>[k,Object.fromEntries(Object.entries(v).map(([side,data])=>[side,array(data,Int16Array)]))]));
    return {base:Float32Array.from(array(m.vertices,Int16Array),v=>v/1000),tris:Object.fromEntries(Object.entries(m.triangles).map(([k,d])=>[k,array(d,Uint16Array)])),targets};
  }
  function gaussian(x,center,width){return Math.exp(-Math.pow((x-center)/width,2))}
  function geometry(d){
    model??=loadMesh();
    const p=Array.from(model.base),c=Array(p.length).fill(0),idx=[];
    function apply(id,v){if(!v)return;const data=model.targets[id]?.[v<0?'negative':'positive'];if(!data)return;for(let i=0;i<data.length;i+=4){const j=data[i]*3;for(let k=1;k<=3;k++)p[j+k-1]+=Math.abs(v)*data[i+k]/1000}}
    for(const [id,v] of Object.entries(d))if(Number.isFinite(v))apply(id,v);
    apply('shape-'+(d['head-shape']||''),1);
    const complexion=rgb(baseColors[d['skin-tone']]||'#d8b49a'), hair=rgb(colors[d['hair-color']]||'#675046'),iris=rgb(colors[d['eye-color']]||'#705337'),sclera=d.sclera?.includes('black-sclera')?[.11,.1,.13]:[.85,.82,.73];
    const fabric=rgb('#496c6c'),dark=rgb('#39404f'),leather=rgb('#62493d'),gold=rgb('#caad6e'),collar=rgb('#314955');
    const build=({skinny:.85,toned:1.02,buffed:1.18,curvy:1.08,fat:1.27})[d.build]||1;
    const stature=({short:.91,tall:1.065,giant:1.12})[d.height]||1;
    function form(x,y,z){
      const fem=d.sex==='female'?1:d.sex==='male'?-1:0;
      const torso=(y<5.9?1:Math.max(0,1-(y-5.9)*2));
      const hip=gaussian(y,.8,1.5),chest=gaussian(y,4.6,1.3);
      const width=1+torso*((build-1)*(Math.abs(x)>2?.47:.83)+(fem*.06+(d.build==='curvy'?.08:0))*hip-fem*.07*chest);
      return [x*width,(y+8.17)*stature-8.17,(z-.4)*(1+(build-1)*torso*.82)+.4];
    }
    const eyeLists=['helper-l-eye','helper-r-eye'];
    const eyeVerts=new Set(eyeLists.flatMap(g=>Array.from(model.tris[g])));
    const hairVerts=new Set(model.tris['helper-hair']);
    for(let i=0;i<p.length;i+=3){
      const j=i/3,[x,y,z]=p.slice(i,i+3);const [ox,oy,oz]=model.base.subarray(i,i+3);let shade;
      if(eyeVerts.has(j)){
        const radius=Math.hypot((Math.abs(ox)-.308)*1.1,oy-7.285);
        shade=oz>1.32&&radius<.053?(radius<.024?[.095,.08,.09]:iris):sclera;
      }else if(hairVerts.has(j)){shade=hair}
      else if(oy<6.02&&!(Math.abs(ox)>3.1&&oy>-.4&&oy<3.35)){shade=oy<-5.1?leather:oy<2.2?dark:fabric}
      else {shade=complexion;if((d['skin-detail']==='birthmarked'||d['skin-detail']==='marked')&&ox>.28&&ox<.47&&oy>6.99&&oy<7.15&&oz>1.31)shade=complexion.map(v=>v*.76)}
      const v=form(x,y,z);
      for(let k=0;k<3;k++){p[i+k]=v[k];c[i+k]=shade[k]}
    }
    for(const g of ['body',...eyeLists]){
      const list=model.tris[g];
      for(let i=0;i<list.length;i+=3){
        const a=list[i],b=list[i+1],cc=list[i+2];
        if(g==='body'&&[a,b,cc].every(j=>{
          const x=Math.abs(model.base[j*3]),y=model.base[j*3+1];
          return y> -2.36 && y<5.22 && x<(y>2.7?1.48:1.81);
        }))continue;
        idx.push(a,b,cc);
      }
    }
    function vertex(x,y,z,color){const i=p.length/3;p.push(...form(x,y,z));c.push(...color);return i}
    function rings(rows,n=52){let last;for(const row of rows){const ring=[];for(let i=0;i<n;i++){const a=i*2*Math.PI/n;ring.push(row(a))}if(last){for(let i=0;i<n;i++){const j=(i+1)%n;idx.push(last[i],last[j],ring[i],last[j],ring[j],ring[i])}}last=ring}}
    const hp=Number(d['hip-width'])||0, tw=Number(d['torso-width'])||0, tl=Number(d['torso-length'])||0;
    const sections=[[-2.45,2.02,1.29,gold],[-2.36,2.04,1.30,collar],[-2.24,2.01,1.29,fabric],[-1.35,1.95,1.31,fabric],[.68,1.87,1.37,fabric],[1.95,1.55,1.12,fabric],[2.05,1.53,1.12,leather],[2.32,1.53,1.12,leather],[2.39,1.52,1.13,gold],[2.45,1.51,1.13,fabric],[3.6,1.56,1.24,fabric],[4.5,1.76,1.22,fabric],[5.15,1.91,1.13,fabric],[5.52,1.80,.96,collar],[5.74,1.31,.73,collar],[5.84,.74,.56,gold],[6.00,.62,.54,collar]];
    rings(sections.map(([y,w,dep,color])=>a=>{
      const offset=gaussian(y,1,2)*hp*.22+gaussian(y,4,2)*tw*.24+Math.max(0,-y)*.085;
      const trim=y>2.45&&Math.min(a,Math.abs(2*Math.PI-a))<.10?gold:color;
      return vertex(Math.sin(a)*(w+offset),y+tl*.25*gaussian(y,4,2),(.36+.09*gaussian(y,4,2))+(dep+Math.max(0,offset*.2))*Math.cos(a),trim)
    }));
    if(d['hair-character']!=='bald'){
      const style=d['hair-character']||'short';
      const rows=[];for(let j=0;j<=15;j++){let q=j/15;rows.push(a=>{
        const fringe=(Math.cos(a)+1)/2, length=['long','luxurious','braided'].includes(style)?.85:.2;
        const wave=['curly','frizzy','wavy'].includes(style)?.055:.016;
        const angle=.015+q*(2.30-.99*Math.pow(fringe,2)+.1*Math.sin(3*a));
        const r=1+wave*Math.sin(13*a+2*q)*q;
        const x=.89*r*Math.sin(angle)*Math.sin(a),y=7.43+1.17*Math.cos(angle)-length*q*q*(1-fringe),z=.56+1.09*r*Math.sin(angle)*Math.cos(a);
        const shade=hair.map(v=>Math.min(1,v*(.94+.09*Math.sin(9*a+3*q))));
        return vertex(x,y,z,shade)
      })}rings(rows,64)
    }
    const normal=new Float32Array(p.length);
    for(let t=0;t<idx.length;t+=3){
      const a=3*idx[t],b=3*idx[t+1],cc=3*idx[t+2],x=p[b]-p[a],y=p[b+1]-p[a+1],z=p[b+2]-p[a+2],u=p[cc]-p[a],v=p[cc+1]-p[a+1],w=p[cc+2]-p[a+2];
      const nx=y*w-z*v,ny=z*u-x*w,nz=x*v-y*u;
      for(const i of [a,b,cc]){normal[i]+=nx;normal[i+1]+=ny;normal[i+2]+=nz}
    }
    return {p:new Float32Array(p),c:new Float32Array(c),n:normal,idx:new Uint16Array(idx),stature};
  }
  const vs='attribute vec3 p,n,c;uniform vec4 cam;uniform float stretch;varying vec3 color,normal;void main(){float cs=cos(cam.x),sn=sin(cam.x);vec3 a=p-vec3(0.,cam.y,.42);vec3 rot=vec3(cs*a.x+sn*a.z,a.y,-sn*a.x+cs*a.z);gl_Position=vec4(rot.x*cam.z*stretch,rot.y*cam.z,-rot.z*.055,1.);normal=vec3(cs*n.x+sn*n.z,n.y,-sn*n.x+cs*n.z);color=c;}';
  const fs='precision mediump float;varying vec3 color,normal;void main(){vec3 n=normalize(normal);if(!gl_FrontFacing)n=-n;float key=max(0.,dot(n,normalize(vec3(-.45,.62,1.))));float rim=pow(1.-abs(n.z),2.);gl_FragColor=vec4(color*(.55+.65*key)+vec3(.10,.073,.049)*rim,1.);}';
  function renderer(cv){
    const gl=cv.getContext('webgl',{antialias:true,alpha:true,preserveDrawingBuffer:true});
    if(!gl)return software(cv);
    const prog=gl.createProgram(), shaders=[];
    for(const [type,src] of [[gl.VERTEX_SHADER,vs],[gl.FRAGMENT_SHADER,fs]]){
      const sh=gl.createShader(type);shaders.push(sh);gl.shaderSource(sh,src);gl.compileShader(sh);gl.attachShader(prog,sh)
    }
    gl.linkProgram(prog);gl.useProgram(prog);
    const attrs=['p','n','c'].map(k=>[k,gl.createBuffer(),gl.getAttribLocation(prog,k)]);
    const ix=gl.createBuffer(),cam=gl.getUniformLocation(prog,'cam'),stretch=gl.getUniformLocation(prog,'stretch');
    return {upload(m){for(const [k,buffer,loc] of attrs){gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,m[k],gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,0,0)}gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ix);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,m.idx,gl.DYNAMIC_DRAW)},
      draw(m){gl.viewport(0,0,cv.width,cv.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.uniform4f(cam,yaw,face?(15.58*m.stature-8.17):.56,face?.51:.102,0);gl.uniform1f(stretch,cv.height/cv.width);gl.drawElements(gl.TRIANGLES,m.idx.length,gl.UNSIGNED_SHORT,0)},
      dispose(){for(const [,b] of attrs)gl.deleteBuffer(b);gl.deleteBuffer(ix);gl.deleteProgram(prog);shaders.forEach(s=>gl.deleteShader(s));gl.getExtension('WEBGL_lose_context')?.loseContext()}};
  }
  function software(cv){
    const ctx=cv.getContext('2d');return {upload(){},dispose(){},draw(m){
      const q=m.p,cs=Math.cos(yaw),sn=Math.sin(yaw),scale=cv.height*(face?.255:.051),cy=face?(15.58*m.stature-8.17):.56,vertices=[];
      for(let i=0;i<q.length;i+=3)vertices.push([cv.width/2+(q[i]*cs+(q[i+2]-.42)*sn)*scale,cv.height/2-(q[i+1]-cy)*scale,-q[i]*sn+q[i+2]*cs]);
      const faces=[];for(let i=0;i<m.idx.length;i+=3){const [a,b,c]=[m.idx[i],m.idx[i+1],m.idx[i+2]],v=vertices[a],w=vertices[b],u=vertices[c];if((w[0]-v[0])*(u[1]-v[1])-(w[1]-v[1])*(u[0]-v[0])>0)continue;faces.push([a,b,c,(v[2]+w[2]+u[2])/3])}faces.sort((a,b)=>a[3]-b[3]);ctx.clearRect(0,0,cv.width,cv.height);
      for(const [a,b,c] of faces){const k=a*3,n=m.n,len=Math.hypot(n[k],n[k+1],n[k+2])||1,intensity=.6+.49*Math.max(0,(n[k+1]*.4+n[k+2]*cs-n[k]*sn)/len);ctx.fillStyle='rgb('+[0,1,2].map(t=>Math.min(255,Math.round(m.c[k+t]*intensity*255))).join(',')+')';ctx.beginPath();for(const [j,id] of [a,b,c].entries()){const v=vertices[id];j?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1])}ctx.closePath();ctx.fill()}
    }};
  }
  function draw(){if(!canvas?.isConnected||!actor)return;const rect=canvas.getBoundingClientRect(),dpr=Math.min(1.5,devicePixelRatio||1);if(rect.width>0&&rect.height>0){const w=Math.round(rect.width*dpr),h=Math.round(rect.height*dpr);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}}painter.draw(actor)}
  function preview(d){design=d||{};cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(!canvas?.isConnected)return;actor=geometry(design);painter.upload(actor);draw()})}
  function mount(cv,d){if(!cv)return;if(cv!==canvas){
      painter?.dispose();canvas=cv;painter=renderer(cv);let last=null;
      cv.style.touchAction='pan-y';cv.addEventListener('pointerdown',e=>{last=e.clientX;cv.setPointerCapture(e.pointerId)});
      cv.addEventListener('pointermove',e=>{if(last!==null){yaw+=(e.clientX-last)*.014;last=e.clientX;draw()}});
      cv.addEventListener('lostpointercapture',()=>{last=null});
      cv.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home'].includes(e.key)){e.preventDefault();yaw=e.key==='Home'?0:yaw+(e.key==='ArrowLeft'?-.18:.18);draw()}});
    }preview(d);
  }
  document.addEventListener('click',e=>{const b=e.target.closest('button[data-act]');if(!b||!canvas?.isConnected)return;if(b.dataset.act==='body-reset-camera'){yaw=0;draw()}if(b.dataset.act==='body-zoom'){face=b.dataset.arg==='face';draw()}});
  window.addEventListener('resize',()=>{if(canvas?.isConnected)draw()});
  return {mount,preview};
})();

