/* ═══════════════════════════════════════════════════════════════
   design.js — Turkistan Science: vizual qatlam
   1) milliy naqshlar (koshin rozetka + romb panjara, peshtoq ramka)
   2) 3D Quyosh tizimi (Canvas, kutubxonasiz)
   index.html bilan:  <script src="design.js" defer></script>
   ═══════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var D=document,R=D.documentElement;
function $(id){return D.getElementById(id);}

/* ───────── 1. NAQSHLAR ───────── */
var C={sand:'#e8b98c',cob:'#1c3fa4',tur:'#26b2c6',ivo:'#f7f0df',grn:'#5fb56a'};
function flower(x,y,k){
  var g='<g transform="translate('+x+' '+y+') scale('+k+')">',i;
  for(i=0;i<8;i++)g+='<ellipse cy="-13" rx="5.5" ry="11" fill="'+C.cob+'" stroke="'+C.ivo+'" stroke-width=".9" transform="rotate('+i*45+')"/>';
  for(i=0;i<8;i++)g+='<circle cy="-25" r="1.7" fill="'+C.ivo+'" transform="rotate('+(i*45+22.5)+')"/>';
  return g+'<circle r="7.5" fill="'+C.tur+'" stroke="'+C.ivo+'" stroke-width="1.2"/><circle r="2.6" fill="'+C.ivo+'"/></g>';
}
function rosCell(){
  var s='<rect width="64" height="64" fill="'+C.sand+'"/>'+flower(32,32,1),i,p=[[32,2,0],[32,62,0],[2,32,90],[62,32,90]];
  for(i=0;i<4;i++)s+='<ellipse cx="'+p[i][0]+'" cy="'+p[i][1]+'" rx="3" ry="7.5" fill="'+C.grn+'" transform="rotate('+p[i][2]+' '+p[i][0]+' '+p[i][1]+')"/>';
  [[0,0],[64,0],[0,64],[64,64]].forEach(function(c){s+='<path transform="translate('+c[0]+' '+c[1]+')" d="M0-7 6 0 0 7-6 0Z" fill="'+C.cob+'" stroke="'+C.ivo+'" stroke-width="1"/>';});
  return s;
}
function latCell(){
  var s='<rect width="36" height="36" fill="'+C.cob+'"/><path d="M18 2 34 18 18 34 2 18Z" fill="none" stroke="'+C.ivo+'" stroke-width="2"/><path d="M18 9 27 18 18 27 9 18Z" fill="'+C.tur+'"/><circle cx="18" cy="18" r="2" fill="'+C.ivo+'"/>';
  [[0,0],[36,0],[0,36],[36,36]].forEach(function(c){s+='<path transform="translate('+c[0]+' '+c[1]+')" d="M0-4.500 4.500 0 0 4.500-4.500 0Z" fill="'+C.tur+'"/>';});
  return s;
}
/* gorizontal lenta: yuborilgan koshin rasmi qator qilib terilgan */
(function(){R.style.setProperty('--band','url("naqsh.png?v=4")');R.classList.add('dz');})();
/* peshtoq (ark) ramka — 3D osmon "deraza"si atrofida */
(function(){
  var f=$('frame');if(!f)return;
  var O='M68 440V250A212 212 0 0 1 492 250V440Z',O2='M74 440V250A206 206 0 0 1 486 250V440Z',I='M112 440V250A168 168 0 0 1 448 250V440Z',
  B='M18 0H542A18 18 0 0 1 560 18V422A18 18 0 0 1 542 440H18A18 18 0 0 1 0 422V18A18 18 0 0 1 18 0Z';
  f.setAttribute('viewBox','0 0 560 440');
  f.innerHTML='<defs><pattern id="ros" width="64" height="64" patternUnits="userSpaceOnUse">'+rosCell()+'</pattern>'+
   '<pattern id="lat" width="36" height="36" patternUnits="userSpaceOnUse">'+latCell()+'</pattern></defs>'+
   '<path fill-rule="evenodd" fill="url(#ros)" d="'+B+O+'"/>'+
   '<path fill-rule="evenodd" fill="url(#lat)" d="'+O2+I+'"/>'+
   '<path d="'+O+'" fill="none" stroke="'+C.ivo+'" stroke-width="7"/><path d="'+O+'" fill="none" stroke="'+C.cob+'" stroke-width="2.500"/>'+
   '<path d="'+I+'" fill="none" stroke="'+C.ivo+'" stroke-width="5"/><path d="'+I+'" fill="none" stroke="'+C.cob+'" stroke-width="2"/>'+
   '<rect x="2.500" y="2.500" width="555" height="435" rx="16" fill="none" stroke="'+C.cob+'" stroke-width="5"/>'+
   '<rect x="7" y="7" width="546" height="426" rx="12" fill="none" stroke="'+C.ivo+'" stroke-width="2"/>';
})();

/* ───────── 2. 3D QUYOSH TIZIMI ───────── */
var cv=$('cv');if(!cv)return;
var x=cv.getContext('2d');if(!x)return;
var box=cv.parentNode,W=0,H=0,DPR=1,Q=1,bg=null,tw=[],MB=matchMedia('(pointer:coarse)').matches,scr=0,scrT=0,tb=null;
addEventListener('scroll',function(){scr=1;clearTimeout(scrT);scrT=setTimeout(function(){scr=0;},160);},{passive:true});
var TAU=Math.PI*2,still=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* sayyoralar: orbita, hajm (ko‘rinish uchun kattalashtirilgan), davr (soniya), rang va sirt */
var P=[
 {n:'Merkuriy',a:.15,r:.009,T:6,c:'#a59f98',rgb:'170,164,157',bl:[[0,.2,.3,.2,'#6f6a64',.5,1],[2,-.3,.25,.18,'#7d7872',.5,1]]},
 {n:'Venera',a:.23,r:.016,T:9.5,c:'#e7ca90',rgb:'231,202,144',atm:'255,214,140',bd:[[-.5,.3,'#f4e2b4',.5],[0,.3,'#c9a56a',.35],[.5,.3,'#f4e2b4',.5]]},
 {n:'Yer',a:.31,r:.017,T:13,c:'#2a64ad',rgb:'80,150,230',atm:'110,180,255',moon:1,cap:1,
   bl:[[0,.15,.55,.4,'#4f9a5a',.95,1],[2.2,-.35,.45,.32,'#4f9a5a',.95,1],[4.1,.45,.5,.25,'#5aa862',.9,1],[1,.5,.6,.15,'#fff',.4,1.6],[3.3,-.1,.6,.13,'#fff',.4,1.6]]},
 {n:'Mars',a:.39,r:.012,T:18,c:'#c4593a',rgb:'210,110,70',cap:1,bl:[[.5,.1,.5,.3,'#8c3826',.65,1],[2.6,-.2,.45,.25,'#8c3826',.65,1],[4.5,.3,.4,.2,'#a84630',.55,1]]},
 {n:'Yupiter',mo:[[.07,4,.0035,'#d9c9a8'],[.09,3,.003,'#c9b080'],[.115,2,.0042,'#e8e0d0'],[.14,1.4,.0038,'#8f8575']],a:.66,r:.044,T:34,c:'#d3ac80',rgb:'211,172,128',
   bd:[[-.78,.16,'#a8734d',.5],[-.5,.14,'#ecd7b6',.5],[-.22,.18,'#a8734d',.55],[.06,.14,'#ecd7b6',.5],[.3,.17,'#b07a52',.55],[.6,.16,'#ecd7b6',.45]],bl:[[1.2,.28,.3,.13,'#b4503a',.85,1]]},
 {n:'Saturn',mo:[[.085,1.5,.004,'#d9a860']],a:.84,r:.036,T:52,c:'#e4d0a0',rgb:'228,208,160',ring:1,
   bd:[[-.6,.2,'#c9b27c',.4],[-.2,.2,'#f1e4bc',.4],[.2,.2,'#c9b27c',.4],[.6,.2,'#f1e4bc',.35]]},
 {n:'Uran',a:.99,r:.024,T:76,c:'#8fd9e0',rgb:'143,217,224',atm:'170,235,245',bd:[[-.3,.4,'#b5ecf1',.4],[.4,.3,'#74c5d0',.35]]},
 {n:'Neptun',a:1.12,r:.023,T:100,c:'#3a5fd6',rgb:'70,100,220',atm:'110,150,255',bd:[[-.5,.2,'#5d82ee',.5],[.1,.16,'#2a46b0',.5],[.5,.18,'#5d82ee',.4]],bl:[[1.5,.2,.3,.12,'#1c2f8a',.7,1]]},
 {n:'Seres',a:.545,r:.006,T:24,c:'#9a948c',rgb:'160,155,148'},
 {n:'Pluton',a:1.23,r:.008,T:130,c:'#c9b39a',rgb:'200,180,155',bl:[[0,.2,.4,.3,'#8f7a66',.6,1]]},
 {n:'Xaumea',a:1.33,r:.007,T:150,c:'#d8d2c8',rgb:'210,205,195'},
 {n:'Makemake',a:1.43,r:.007,T:175,c:'#c98f6a',rgb:'200,140,105'},
 {n:'Erida',a:1.55,r:.0085,T:210,c:'#e6e2dc',rgb:'225,220,215'}];
var belt=[],i;for(i=0;i<560;i++)belt.push({a:Math.random()*TAU,r:.5+Math.random()*.085,y:(Math.random()-.5)*.03,s:Math.random()*.9+.4});
for(i=0;i<200;i++)belt.push({a:Math.random()*TAU,r:1.18+Math.random()*.4,y:(Math.random()-.5)*.08,s:Math.random()*.8+.3});
var CM=[{q:.25,Q:1.5,w:.6,T:45,m:1,i:.35},{q:.4,Q:1.35,w:2.5,T:30,m:3,i:-.5},{q:.15,Q:1.1,w:4.2,T:21,m:5,i:.2}];
var F=function(a){return .3+(a-.15)*1.25;};
P.forEach(function(p){p.a=F(p.a);});belt.forEach(function(b){b.r=F(b.r);});CM.forEach(function(c){c.q=F(c.q);c.Q=F(c.Q);});
var IN={Merkuriy:[.3,.8],Venera:[.16,2.1],Yer:[.06,0],Mars:[.17,1.2],Seres:[.45,4],Yupiter:[.09,1.8],Saturn:[.14,3.5],Uran:[.1,5.6],Neptun:[.12,2.2],Pluton:[.55,3],Xaumea:[.5,5.9],Makemake:[.5,2.9],Erida:[.75,.6]};
P.forEach(function(p){var q=IN[p.n]||[0,0];p.inc=q[0];p.nod=q[1];});
function pos(p,a){var u=Math.cos(a)*p.a,v=Math.sin(a)*p.a,ci=Math.cos(p.inc),cn=Math.cos(p.nod),sn=Math.sin(p.nod);return [u*cn-v*ci*sn,v*Math.sin(p.inc),u*sn+v*ci*cn];}
var Vd=[.42,.78,-.46],ST=[];   /* tizimning fazodagi harakat yo‘nalishi; fon yulduzlari unga teskari suriladi */
var SC=['#dfe8ff','#ffffff','#fff2dc','#ffd9a8','#ffb27a','#b5ceff'];
var M=(function(){var ph=58*Math.PI/180,rl=-24*Math.PI/180,sP=Math.sin(ph),cP=Math.cos(ph),sR=Math.sin(rl),cR=Math.cos(rl);return [[cR,sR*cP,-sR*sP],[sR,-cR*cP,cR*sP],[0,sP,cP]];})(),mx=-99,my=-99,drag=null;
function spin(th,fi){var c=Math.cos(th),s=Math.sin(th),i,a,b,d;for(i=0;i<3;i++){a=M[0][i];d=M[2][i];M[0][i]=a*c+d*s;M[2][i]=-a*s+d*c;}
  c=Math.cos(fi);s=Math.sin(fi);for(i=0;i<3;i++){b=M[1][i];d=M[2][i];M[1][i]=b*c+d*s;M[2][i]=-b*s+d*c;}}
var zone=D.createElement('div');zone.style.cssText='position:absolute;z-index:0;touch-action:none;cursor:grab';box.appendChild(zone);
function EL(ev,fn){cv.addEventListener(ev,fn);zone.addEventListener(ev,fn);}
if(MB){zone.style.touchAction='pan-y';tb=D.createElement('button');tb.type='button';tb.textContent='⟲ 3D aylantirish';tb.style.cssText='position:absolute;z-index:3;font:600 12px system-ui,sans-serif;padding:7px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.35);background:rgba(7,18,38,.72);color:#fff';box.appendChild(tb);
  tb.addEventListener('click',function(){var on=zone.style.touchAction!=='none';zone.style.touchAction=on?'none':'pan-y';tb.textContent=on?'✓ Aylantirish yoqilgan':'⟲ 3D aylantirish';});}

function resize(){
  W=box.clientWidth;H=box.clientHeight;if(!W||!H)return;
  DPR=Math.min(window.devicePixelRatio||1,Q?(MB?1.5:2):1);
  cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);
  bg=D.createElement('canvas');bg.width=cv.width;bg.height=cv.height;
  var b=bg.getContext('2d');b.scale(DPR,DPR);b.fillStyle='#030816';b.fillRect(0,0,W,H);
  [[.2,.25,.7,'38,70,170',.30],[.85,.7,.6,'110,50,150',.18],[.5,.95,.6,'20,150,170',.15]].forEach(function(n){
    var g=b.createRadialGradient(W*n[0],H*n[1],0,W*n[0],H*n[1],Math.max(W,H)*n[2]);
    g.addColorStop(0,'rgba('+n[3]+','+n[4]+')');g.addColorStop(1,'rgba('+n[3]+',0)');b.fillStyle=g;b.fillRect(0,0,W,H);});
  var k2,n2=Math.round(W*H/260);for(k2=0;k2<n2;k2++){b.globalAlpha=.07+.45*Math.pow(Math.random(),2);b.fillStyle=SC[(Math.random()*3)|0];b.fillRect(Math.random()*W,Math.random()*H,.8,.8);}
  b.save();b.translate(W*.5,H*.5);b.rotate(-.45);var gb=b.createLinearGradient(0,-H*.3,0,H*.3);gb.addColorStop(0,'rgba(100,110,160,0)');gb.addColorStop(.5,'rgba(120,125,175,.12)');gb.addColorStop(1,'rgba(100,110,160,0)');b.fillStyle=gb;b.fillRect(-W,-H*.3,W*2,H*.6);b.restore();
  ST=[];for(var k=0,n=Math.round(W*H/(MB?1500:Q?600:1800)),u,c,zq;k<n;k++){u=Math.pow(Math.random(),4);c=Math.random();zq=.12+Math.random()*.88;ST.push({z:zq,x:(Math.random()-.5)*(W/(Math.max(W,H)*.6))*zq,y:(Math.random()-.5)*(H/(Math.max(W,H)*.6))*zq,r:.4+u*1.9,al:Math.min(1,.2+.55*Math.random()+u*.6),p:Math.random()*6.3,s:.8+Math.random()*1.6,c:c<.34?0:c<.56?1:c<.72?2:c<.84?3:c<.9?4:5});}
  var w2=W>820,ex=w2?Math.min(W*.34,H*.47):Math.min(W*.44,(36+Math.min(W*.92,380))*.45),zx=w2?W*.7:W/2,zy=w2?H*.52:(36+Math.min(W*.92,380))*.5;
  if(tb){tb.style.left=Math.max(8,zx-ex+4)+'px';tb.style.top=(zy+ex-34)+'px';}
  zone.style.left=(zx-ex)+'px';zone.style.top=(zy-ex)+'px';zone.style.width=(2*ex)+'px';zone.style.height=(2*ex)+'px';
  draw(performance.now());
}

function rgba(c,a){return 'rgba('+c+','+a+')';}
function ball(px,py,rad,p,spin,sx,sy,rl){
  var dx=sx-px,dy=sy-py,L=Math.hypot(dx,dy)||1,ang;dx/=L;dy/=L;ang=Math.atan2(dy,dx);
  x.save();x.beginPath();x.arc(px,py,rad,0,TAU);x.clip();
  x.fillStyle=p.c;x.fillRect(px-rad,py-rad,rad*2,rad*2);
  x.translate(px,py);x.rotate(rl);
  (p.bd||[]).forEach(function(b){x.globalAlpha=b[3];x.fillStyle=b[2];x.fillRect(-rad,b[0]*rad-b[1]*rad/2,rad*2,b[1]*rad);});
  (p.bl||[]).forEach(function(b){var a=b[0]+spin*b[6],c=Math.cos(a);if(c<=0)return;
    x.globalAlpha=b[5]*Math.min(1,c*2.2);x.fillStyle=b[4];x.beginPath();
    x.ellipse(Math.sin(a)*Math.cos(b[1])*rad,Math.sin(b[1])*rad,b[2]*rad*c,b[3]*rad*(.4+.6*Math.cos(b[1])),0,0,TAU);x.fill();});
  if(p.cap){x.globalAlpha=.75;x.fillStyle='#fff';x.beginPath();x.ellipse(0,-rad*.95,rad*.5,rad*.2,0,0,TAU);x.ellipse(0,rad*.95,rad*.45,rad*.17,0,0,TAU);x.fill();}
  x.setTransform(DPR,0,0,DPR,0,0);x.globalAlpha=1;
  var g=x.createRadialGradient(px+dx*rad*.5,py+dy*rad*.5,rad*.05,px+dx*rad*.2,py+dy*rad*.2,rad*1.3);
  g.addColorStop(0,'rgba(255,255,255,.34)');g.addColorStop(.35,'rgba(255,255,255,0)');g.addColorStop(.72,'rgba(0,0,12,.55)');g.addColorStop(1,'rgba(0,0,8,.94)');
  x.fillStyle=g;x.fillRect(px-rad,py-rad,rad*2,rad*2);x.restore();
  if(p.atm){x.strokeStyle=rgba(p.atm,.6);x.lineWidth=Math.max(1,rad*.14);x.beginPath();x.arc(px,py,rad*1.04,ang-1.4,ang+1.4);x.stroke();}
}
function ringHalf(px,py,rad,rl,kk,front){
  x.save();x.translate(px,py);x.rotate(rl);x.lineCap='butt';
  [[1.62,.30,'rgba(222,200,150,.62)'],[1.98,.2,'rgba(190,166,120,.5)'],[2.28,.07,'rgba(210,190,150,.35)']].forEach(function(r){
    x.strokeStyle=r[2];x.lineWidth=rad*r[1];x.beginPath();
    x.ellipse(0,0,rad*r[0],rad*r[0]*kk,0,front?0:Math.PI,front?Math.PI:TAU);x.stroke();});
  x.restore();
}
function sun(px,py,rs,t){
  x.save();x.globalCompositeOperation='lighter';
  var g=x.createRadialGradient(px,py,rs*.3,px,py,rs*7.5);
  g.addColorStop(0,'rgba(255,190,90,.6)');g.addColorStop(.22,'rgba(255,140,40,.2)');g.addColorStop(1,'rgba(255,100,20,0)');
  x.fillStyle=g;x.beginPath();x.arc(px,py,rs*7.5,0,TAU);x.fill();
  var q=rs*(1.9+.06*Math.sin(t*2.1));g=x.createRadialGradient(px,py,rs*.8,px,py,q);
  g.addColorStop(0,'rgba(255,200,110,.55)');g.addColorStop(1,'rgba(255,150,50,0)');x.fillStyle=g;x.beginPath();x.arc(px,py,q,0,TAU);x.fill();
  x.restore();
  g=x.createRadialGradient(px-rs*.2,py-rs*.2,0,px,py,rs);
  g.addColorStop(0,'#fffbe8');g.addColorStop(.5,'#ffd56e');g.addColorStop(1,'#ff9322');
  x.fillStyle=g;x.beginPath();x.arc(px,py,rs,0,TAU);x.fill();
}

function draw(now){
  if(!W)return;
  var t=now/1000;
  var wd=W>820,cx=wd?W*.7:W/2,cy=wd?H*.52:(36+Math.min(W*.92,380))*.5,sc=(wd?Math.min(W*.34,H*.47):Math.min(W*.44,(36+Math.min(W*.92,380))*.45))/2.2,o={},
      rl=Math.atan2(M[1][1],M[0][1])+Math.PI/2,ny=M[2][1],kk=Math.max(.14,Math.abs(ny));
  function pr(X,Y,Z){var x1=M[0][0]*X+M[0][1]*Y+M[0][2]*Z,y1=M[1][0]*X+M[1][1]*Y+M[1][2]*Z,d=M[2][0]*X+M[2][1]*Y+M[2][2]*Z,k=1/(1-d*.22);o.x=cx+x1*k*sc;o.y=cy+y1*k*sc;o.k=k;o.d=d;return o;}
  x.setTransform(DPR,0,0,DPR,0,0);x.globalAlpha=1;x.drawImage(bg,0,0,W,H);
  var dts=Math.min(.05,(now-(draw.l||now))/1000),vv=[M[0][0]*Vd[0]+M[0][1]*Vd[1]+M[0][2]*Vd[2],M[1][0]*Vd[0]+M[1][1]*Vd[1]+M[1][2]*Vd[2],M[2][0]*Vd[0]+M[2][1]*Vd[1]+M[2][2]*Vd[2]],Sx=Math.max(W,H)*.6,spd=.12;draw.l=now;
  /* yulduzlar kamera fazosida: tizim bizga qarab ketsa, ular uzoqlashadi (markazga), uzoqlashsa ular yaqinlashadi (chetga), yon tomonga ketsa surilishadi */
  ST.forEach(function(s){var px,py,sz;s.x-=vv[0]*spd*dts;s.y-=vv[1]*spd*dts;s.z+=vv[2]*spd*dts;
    if(s.z<.08||s.z>1.1){s.z=s.z<.08?.95+Math.random()*.05:.12+Math.random()*.1;s.x=(Math.random()-.5)*(W/Sx)*s.z;s.y=(Math.random()-.5)*(H/Sx)*s.z;}
    px=W/2+s.x/s.z*Sx;py=H/2+s.y/s.z*Sx;
    if(px<-4||px>W+4||py<-4||py>H+4){
      if(Math.abs(vv[2])<.3){if(px<-4)px+=W+8;else if(px>W+4)px-=W+8;if(py<-4)py+=H+8;else if(py>H+4)py-=H+8;s.x=(px-W/2)*s.z/Sx;s.y=(py-H/2)*s.z/Sx;}
      else{s.z=vv[2]<0?.9+Math.random()*.1:.12+Math.random()*.1;s.x=(Math.random()-.5)*(W/Sx)*s.z;s.y=(Math.random()-.5)*(H/Sx)*s.z;px=W/2+s.x/s.z*Sx;py=H/2+s.y/s.z*Sx;}}
    sz=s.r*Math.min(2,.55+.45/s.z)*1.15;
    x.globalAlpha=Math.min(1,s.al*(s.r>1?.75+.25*Math.sin(t*s.s+s.p):1)*Math.min(1,1.2-s.z*.6));x.fillStyle=SC[s.c];x.strokeStyle=SC[s.c];
    if(sz>1.6){x.beginPath();x.arc(px,py,sz*.5,0,TAU);x.fill();if(s.r>1.7){x.globalAlpha*=.22;x.beginPath();x.arc(px,py,sz*1.1,0,TAU);x.fill();}}else x.fillRect(px,py,sz,sz);});
  x.globalAlpha=1;
  /* orbitalar */
  x.lineWidth=1;x.strokeStyle='rgba(170,200,255,.05)';
  P.forEach(function(p){if(p.r<.012)return;x.beginPath();for(var k=0;k<=96;k++){var q=pos(p,k/96*TAU);pr(q[0],q[1],q[2]);k?x.lineTo(o.x,o.y):x.moveTo(o.x,o.y);}x.stroke();});
  /* asteroid kamari */
  if(Q){x.fillStyle='rgba(200,185,165,.55)';belt.forEach(function(b){var a=b.a+t*.045/Math.sqrt(b.r*b.r*b.r)*.12;pr(Math.cos(a)*b.r,b.y,Math.sin(a)*b.r);x.fillRect(o.x,o.y,b.s*o.k,b.s*o.k);});}
  /* chizilgan obyektlar (uzoqdan yaqinga) */
  var L=[],sp;pr(0,0,0);var sx=o.x,sy=o.y;
  pr(-Vd[0]*.6,-Vd[1]*.6,-Vd[2]*.6);var tx0=o.x,ty0=o.y;
  L.push({d:-9,f:function(){var g=x.createLinearGradient(sx,sy,tx0,ty0);g.addColorStop(0,'rgba(255,200,120,.32)');g.addColorStop(1,'rgba(255,160,60,0)');x.strokeStyle=g;x.lineWidth=sc*.08;x.lineCap='round';x.beginPath();x.moveTo(sx,sy);x.lineTo(tx0,ty0);x.stroke();}});
  L.push({d:0,f:function(){sun(sx,sy,sc*.2,t);}});
  P.forEach(function(p,j){
    var a=j*1.9+t*TAU/p.T,q0=pos(p,a),X=q0[0],Y=q0[1],Z=q0[2];pr(X,Y,Z);
    var px=o.x,py=o.y,rad=Math.max(2,p.r*sc*3.9*o.k),d=o.d,spin=t*(1.4+j*.25);
    L.push({d:d,f:function(){
      if(p.r>=.012){var N=Q?32:16,span=Math.max(.12,Math.min(.8,3/Math.pow(p.T,.7))),pp=[],k,q,f2,u;
        for(k=0;k<=N;k++){q=pos(p,a-k/N*span*TAU);f2=k/N*.55;pr(q[0]-Vd[0]*f2,q[1]-Vd[1]*f2,q[2]-Vd[2]*f2);pp.push([o.x,o.y]);}
        x.lineCap='round';
        for(k=1;k<=N;k++){u=1-k/N;x.strokeStyle=rgba(p.rgb,.45*Math.pow(u,1.6));x.lineWidth=Math.max(.7,Math.min(3.2,rad*.22)*u);x.beginPath();x.moveTo(pp[k-1][0],pp[k-1][1]);x.lineTo(pp[k][0],pp[k][1]);x.stroke();}}
      if(p.ring)ringHalf(px,py,rad,rl,kk,ny<0);
      ball(px,py,rad,p,spin,sx,sy,rl);
      if(p.ring)ringHalf(px,py,rad,rl,kk,ny>=0);
      if(Math.hypot(mx-px,my-py)<rad+12)lab={t:p.n,x:px,y:py-rad-10};}});
    (p.mo||[]).forEach(function(m,q){var am=t*m[1]+q*2;pr(X+Math.cos(am)*m[0]*3,Y,Z+Math.sin(am)*m[0]*3);var qx=o.x,qy=o.y,qr=Math.max(1.2,m[2]*sc*3.2*o.k),qd=o.d;
      L.push({d:qd,f:function(){ball(qx,qy,qr,{c:m[3]},am,sx,sy,rl);}});});
    if(p.moon){var am=t*2.2,mX=X+Math.cos(am)*.11,mY=Y+Math.sin(am)*.03,mZ=Z+Math.sin(am)*.11;pr(mX,mY,mZ);
      var qx=o.x,qy=o.y,qr=Math.max(1.6,.008*sc*2.5*o.k),qd=o.d;
      L.push({d:qd,f:function(){ball(qx,qy,qr,{c:'#bdb8b0',bl:[[0,.2,.5,.3,'#8d8880',.5,1]]},am,sx,sy,rl);}});}
  });
  CM.forEach(function(c){var A=(c.q+c.Q)/2,e=(c.Q-c.q)/(c.Q+c.q),cw=Math.cos(c.w),sw=Math.sin(c.w),pts=[],k,q,hk=1,hd=0;
    function cp(tt){var M=tt*TAU/c.T+c.m,E=M,n;for(n=0;n<6;n++)E=M+e*Math.sin(E);var u=A*(Math.cos(E)-e),v=A*Math.sqrt(1-e*e)*Math.sin(E),Z=u*sw+v*cw;return [u*cw-v*sw,Z*c.i,Z];}
    for(k=0;k<=18;k++){q=cp(t-k*c.T*.0026);pr(q[0],q[1],q[2]);if(!k){hk=o.k;hd=o.d;}pts.push([o.x,o.y]);}
    L.push({d:hd,f:function(){var n=pts.length,a;x.lineCap='round';
      for(var m=n-1;m>0;m--){a=1-m/n;x.strokeStyle='rgba(170,215,255,'+(.6*a*a)+')';x.lineWidth=Math.max(.8,5*hk*a);x.beginPath();x.moveTo(pts[m][0],pts[m][1]);x.lineTo(pts[m-1][0],pts[m-1][1]);x.stroke();}
      x.fillStyle='#fff';x.shadowColor='#9cf';x.shadowBlur=8;x.beginPath();x.arc(pts[0][0],pts[0][1],Math.max(1.8,3*hk),0,TAU);x.fill();x.shadowBlur=0;
      if(Math.hypot(mx-pts[0][0],my-pts[0][1])<14)lab={t:'Kometa',x:pts[0][0],y:pts[0][1]-14};}});});
  var lab=null;L.sort(function(a,b){return a.d-b.d;});L.forEach(function(e){e.f();});
  if(lab){x.font='600 12px Instrument Sans,system-ui,sans-serif';x.textAlign='center';var w=x.measureText(lab.t).width+14;
    x.fillStyle='rgba(6,14,34,.82)';x.beginPath();x.roundRect?x.roundRect(lab.x-w/2,lab.y-15,w,20,6):x.rect(lab.x-w/2,lab.y-15,w,20);x.fill();
    x.fillStyle='#fff';x.fillText(lab.t,lab.x,lab.y-1);}
}

/* boshqaruv */
EL('pointerdown',function(e){drag={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture&&e.currentTarget.setPointerCapture(e.pointerId);cv.style.cursor='grabbing';});
EL('pointermove',function(e){var r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;
  if(drag){spin((e.clientX-drag.x)*.007,(e.clientY-drag.y)*.007);drag={x:e.clientX,y:e.clientY};}
  if(still)draw(performance.now());});
function up(){drag=null;cv.style.cursor='grab';}
EL('pointerup',up);EL('pointercancel',up);
EL('pointerleave',function(){mx=my=-99;});

/* ishga tushirish / to‘xtatish (ko‘rinmaganda hech narsa hisoblanmaydi) */
var raf=0,vis=true,last=0,ema=16,bad=0;
function loop(now){
  raf=requestAnimationFrame(loop);var dt=now-last;if(dt<(MB?32:15))return;last=now;if(scr)return;
  ema=ema*.92+Math.min(dt,100)*.08;
  if(Q&&ema>30&&++bad>45){Q=0;resize();}   /* sekin qurilma: soddalashtirilgan rejim */
  draw(now);}
function go(){var want=vis&&!D.hidden&&!still;
  if(want&&!raf){last=0;raf=requestAnimationFrame(loop);}else if(!want&&raf){cancelAnimationFrame(raf);raf=0;}}
if(window.IntersectionObserver)new IntersectionObserver(function(e){vis=e[0].isIntersecting;go();}).observe(box);
D.addEventListener('visibilitychange',go);
if(window.ResizeObserver)new ResizeObserver(resize).observe(box);else addEventListener('resize',resize);
resize();go();
})();
