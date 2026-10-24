/* Fizika Fakulteti Kutubxonasi — DIZAYN QATLAMI (faqat ko'rinish, funksiyalarga tegmaydi) */
(function(){
if(window.__designPro) return; window.__designPro = 1;

/* ───────────── CSS ───────────── */
var css = `
:root{--accent:#2f6fed;--accent-l:#e9f1ff;--accent-ring:#a5c4ff;--bg:#e9f2ff;--border:#d5e3fb;--sun:#ffb62e;--sun-l:#ffd86b;--text:#10203a;--sub:#5a6b88;--forest:#14183f}
[data-theme="dark"]{--accent:#6fd0ff;--accent-l:rgba(111,208,255,.15);--accent-ring:rgba(111,208,255,.6);--bg:#080b1f;--text:#eef3ff;--sub:#a9b6d6}

/* yashil o'rniga: osmon ko'ki + quyosh sarig'i + mercan pushti */
.btn-primary,.tab.active{background:linear-gradient(145deg,#5a94ff,#2f5fe0);box-shadow:0 6px 16px rgba(47,95,224,.38)}
.btn-primary:hover{background:linear-gradient(145deg,#4a85f5,#244fc8)}
.btn-primary:disabled{background:#9db8f2}
.tab:hover{background:var(--accent-l);color:var(--accent)}
.topbar{background:linear-gradient(90deg,transparent,var(--sun) 18%,#14b8c4 52%,var(--accent) 80%,transparent) bottom/100% 2px no-repeat,var(--top-bg)}
.search-input:focus{box-shadow:0 0 0 4px rgba(47,111,237,.25),0 8px 26px rgba(6,24,60,.16)}
.sec-card:hover{box-shadow:0 16px 38px rgba(40,70,200,.30)}
.sec-card::before{background:linear-gradient(180deg,var(--sun),#14b8c4)}
.book-row:hover{box-shadow:0 12px 28px rgba(40,70,200,.24)}
.site-bg::after{background:radial-gradient(130% 70% at 50% 0%,rgba(40,90,200,.38),transparent 62%),linear-gradient(180deg,rgba(90,150,255,.18) 0%,rgba(255,255,255,0) 40%,rgba(255,170,90,.30) 100%)}
[data-theme="dark"] .site-bg::after{background:radial-gradient(120% 70% at 50% 0%,rgba(6,8,36,.6),transparent 65%),linear-gradient(180deg,rgba(8,10,40,.82) 0%,rgba(14,14,52,.72) 48%,rgba(42,20,70,.78) 100%)}
[data-theme="dark"] .site-bg::before{background:radial-gradient(circle at 90% 6%,rgba(196,220,255,.5),rgba(196,220,255,0) 26%),radial-gradient(ellipse at 8% 100%,rgba(60,200,220,.2),rgba(60,200,220,0) 52%)}
.site-footer{background:linear-gradient(180deg,#0e1233 0%,#1a1245 100%)}
.site-footer::before{background:linear-gradient(90deg,transparent,var(--sun) 25%,#14b8c4 60%,var(--accent) 85%,transparent)}
.hero-title{background:none;text-shadow:none;filter:drop-shadow(0 3px 16px rgba(4,10,40,.65))}
.hero-title::after{content:"";display:block;width:84px;height:5px;margin-top:14px;border-radius:9px;background:linear-gradient(90deg,var(--sun),#14b8c4,var(--accent))}

/* bo'lim belgilari: har xil quvnoq gradient + SVG */
.sec-icon{color:#fff;box-shadow:0 8px 18px rgba(10,20,70,.3),inset 0 1px 0 rgba(255,255,255,.45);transition:transform .3s cubic-bezier(.3,1.6,.5,1)}
.sec-card:hover .sec-icon{transform:rotate(-6deg) scale(1.1)}
.sec-card:nth-child(6n+1) .sec-icon{background:linear-gradient(145deg,#f5a524,#c2410c)}
.sec-card:nth-child(6n+2) .sec-icon{background:linear-gradient(145deg,#38bdf8,#4338ca)}
.sec-card:nth-child(6n+3) .sec-icon{background:linear-gradient(145deg,#14b8a6,#2563eb)}
.sec-card:nth-child(6n+4) .sec-icon{background:linear-gradient(145deg,#8b5cf6,#3730a3)}
.sec-card:nth-child(6n+5) .sec-icon{background:linear-gradient(145deg,#fbbf24,#b45309)}
.sec-card:nth-child(6n+6) .sec-icon{background:linear-gradient(145deg,#22d3ee,#1e40af)}
.sec-icon svg{width:26px;height:26px;display:block}

/* yuqori panel: telefonda tartibli joylashuv */
@media (max-width:600px){
  .topbar-right{display:grid!important;grid-template-columns:1fr auto auto;align-items:center;gap:10px 8px;width:100%}
  .auth-box{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;width:100%}
  .user-chip .uname{display:inline;max-width:42vw}
  .theme-toggle,.notif-btn{width:40px;height:40px}
  .lang-btn{padding:5px}
  .notif-wrap:empty{display:none}
}

/* kunduzi: quyosh nurlari, kamalak, suzuvchi bulutlar */
.day-fx,.night-fx{position:fixed;inset:0;z-index:-2;pointer-events:none;overflow:hidden;display:none}
[data-theme="light"] .day-fx{display:block}
[data-theme="dark"] .night-fx{display:block}
.day-fx i,.night-fx i{position:absolute;display:block}
.rays{right:-34vmax;top:-34vmax;width:96vmax;height:96vmax;border-radius:50%;mix-blend-mode:screen;
  background:repeating-conic-gradient(from 0deg,rgba(255,236,160,.34) 0 5deg,transparent 5deg 15deg);
  -webkit-mask-image:radial-gradient(circle,#000 0,transparent 60%);mask-image:radial-gradient(circle,#000 0,transparent 60%);animation:dsSpin 140s linear infinite}
.rainbow{left:-22vw;bottom:-46vw;width:84vw;height:84vw;border-radius:50%;
  background:radial-gradient(circle,transparent 57%,rgba(255,90,90,.20) 58%,rgba(255,170,60,.20) 60%,rgba(255,235,90,.20) 62%,rgba(90,220,130,.17) 64%,rgba(70,160,255,.20) 66%,rgba(150,90,255,.20) 68%,transparent 70%);animation:dsBreath 9s ease-in-out infinite alternate}
.cloud{aspect-ratio:2.4/1;height:auto;opacity:.9;filter:blur(2.5px);animation:dsDrift linear infinite;background:radial-gradient(circle at 22% 66%,rgba(255,255,255,.95) 0 19%,transparent 20%),radial-gradient(circle at 42% 44%,rgba(255,255,255,.95) 0 26%,transparent 27%),radial-gradient(circle at 64% 40%,rgba(255,255,255,.95) 0 23%,transparent 24%),radial-gradient(circle at 80% 65%,rgba(255,255,255,.95) 0 18%,transparent 19%),radial-gradient(ellipse 47% 23% at 50% 72%,rgba(255,255,255,.95) 0 96%,transparent 100%)}
.c1{top:11%;width:240px;animation-duration:95s;animation-delay:-30s}
.c2{top:30%;width:320px;animation-duration:140s;animation-delay:-90s;opacity:.7}
.c3{top:5%;width:200px;animation-duration:180s;animation-delay:-10s;opacity:.8}
@keyframes dsSpin{to{transform:rotate(360deg)}}
@keyframes dsBreath{from{opacity:.55;transform:scale(1)}to{opacity:1;transform:scale(1.05)}}
@keyframes dsDrift{from{transform:translateX(-40vw)}to{transform:translateX(135vw)}}

/* kechasi: shimol shafag'i */
.aur{width:70vw;height:46vh;border-radius:50%;filter:blur(60px);opacity:.5;mix-blend-mode:screen;animation:dsAur 18s ease-in-out infinite alternate}
.a1{left:-10vw;top:-8vh;background:radial-gradient(circle,rgba(120,90,255,.65),transparent 70%)}
.a2{right:-12vw;top:6vh;background:radial-gradient(circle,rgba(40,210,255,.5),transparent 70%);animation-delay:-7s}
.a3{left:20vw;top:-14vh;background:radial-gradient(circle,rgba(90,110,255,.4),transparent 70%);animation-delay:-12s}
@keyframes dsAur{from{transform:translate3d(-4vw,0,0) scale(1)}to{transform:translate3d(6vw,5vh,0) scale(1.18)}}
@media (prefers-reduced-motion:reduce){.rays,.rainbow,.cloud,.aur{animation:none}}
`;

var css2 = `
/* bosh blok: sarlavha chapda, atom o'ngda, yonma-yon */
.hero{display:grid;grid-template-columns:minmax(0,1fr) auto;column-gap:10px;align-items:end;align-content:end;min-height:clamp(230px,34vh,340px)}
.hero-fx{display:contents}
.hero-atom{position:relative;right:auto;top:auto;margin:0;width:min(230px,26vw);height:min(230px,26vw);min-width:96px;min-height:96px;grid-column:2;grid-row:1;align-self:center;justify-self:end}
.hero-title{grid-column:1;grid-row:1;max-width:none;margin:0}
.hero-sub,.hero-count{grid-column:1/-1;justify-self:start}
@media (max-width:600px){.hero{min-height:250px}.hero-title{font-size:clamp(28px,8.2vw,40px)}.hero-atom{width:104px;height:104px}}
.aur{opacity:.2}
/* kunduzi: sokin qum / muz / tuman ranglari */
[data-theme="light"]{--btn-bg:linear-gradient(135deg,#fff6e6,#e6f0ff);
 --pill:linear-gradient(90deg,rgba(255,243,224,.94),rgba(230,240,255,.94) 55%,rgba(236,234,252,.94));
 --pill-strong:linear-gradient(90deg,rgba(255,247,232,.96),rgba(228,240,255,.96) 55%,rgba(238,236,252,.96))}
[data-theme="light"] .topbar{background:linear-gradient(90deg,transparent,var(--sun) 18%,#14b8c4 52%,var(--accent) 80%,transparent) bottom/100% 2px no-repeat,linear-gradient(90deg,rgba(255,245,228,.92),rgba(230,240,255,.92) 55%,rgba(236,234,252,.92))}
[data-theme="light"] .book-row{background:linear-gradient(110deg,rgba(255,246,230,.93),rgba(230,240,255,.93))}
[data-theme="light"] .sec-card:not(.add-card):not(.drag-source){background:linear-gradient(135deg,rgba(255,246,230,.92),rgba(226,238,255,.92))}
[data-theme="light"] .sec-card:nth-child(6n+1):not(.add-card):not(.drag-source){background:linear-gradient(135deg,rgba(255,244,226,.93),rgba(255,230,202,.92))}
[data-theme="light"] .sec-card:nth-child(6n+2):not(.add-card):not(.drag-source){background:linear-gradient(135deg,rgba(225,240,255,.93),rgba(214,224,250,.92))}
[data-theme="light"] .sec-card:nth-child(6n+3):not(.add-card):not(.drag-source){background:linear-gradient(135deg,rgba(222,246,243,.93),rgba(212,230,250,.92))}
[data-theme="light"] .sec-card:nth-child(6n+4):not(.add-card):not(.drag-source){background:linear-gradient(135deg,rgba(234,231,252,.93),rgba(220,224,248,.92))}
[data-theme="light"] .sec-card:nth-child(6n+5):not(.add-card):not(.drag-source){background:linear-gradient(135deg,rgba(255,246,218,.93),rgba(248,230,192,.92))}
[data-theme="light"] .sec-card:nth-child(6n+6):not(.add-card):not(.drag-source){background:linear-gradient(135deg,rgba(220,236,248,.93),rgba(205,221,240,.92))}
/* tezlik: og'ir effektlarni yengillashtirish */
.sec-card,.book-row,.tabs,.empty,.page-head h2,.crumbs,.drag-hint,.search-results-head,.search-input,.hero-sub,.hero-count,.hero-sub{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}
.night-fx{display:none!important}
.rays{mix-blend-mode:normal;will-change:transform}
.cloud{will-change:transform}
@media (max-width:700px){.site-bg{animation:none}}
/* tungi fon: qora emas, chuqur "ko'k soat" osmoni */
[data-theme="dark"]{--bg:#0f1a40;--glass:rgba(24,38,88,.64);--pill:rgba(22,36,84,.74);--pill-strong:rgba(22,36,84,.86);
 --surface:#182550;--surface-2:#213164;--top-bg:rgba(18,30,76,.84);--btn-bg:rgba(255,255,255,.10);--border:rgba(160,185,255,.20)}
[data-theme="dark"] .site-bg::after{background:
 radial-gradient(90% 55% at 82% 0%,rgba(150,180,255,.22),transparent 60%),
 linear-gradient(180deg,rgba(18,30,110,.66) 0%,rgba(24,50,128,.46) 42%,rgba(22,70,120,.40) 72%,rgba(255,150,90,.22) 100%)}
`;
var st = document.createElement('style'); st.id = 'design-pro'; st.textContent = css + css2; document.head.appendChild(st);

/* ───────────── Kunduzgi / tungi fon qatlamlari ───────────── */
var bg = document.querySelector('.site-bg');
function layer(cls, items){ var d = document.createElement('div'); d.className = cls; d.setAttribute('aria-hidden','true'); d.innerHTML = items; return d; }
var day = layer('day-fx', '<i class="rays"></i><i class="cloud c1"></i><i class="cloud c2"></i><i class="cloud c3"></i>');
var night = layer('night-fx', '<i class="aur a1"></i><i class="aur a2"></i><i class="aur a3"></i>');
if(bg){ bg.after(night); bg.after(day); } else { document.body.prepend(night, day); }

/* ───────────── Fanlar uchun SVG belgilar ───────────── */
function S(b){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + b + '</svg>'; }
function T(ch){ return '<svg viewBox="0 0 24 24"><text x="12" y="18" text-anchor="middle" font-size="19" font-style="italic" font-weight="700" font-family="Cambria Math,STIX Two Math,Times New Roman,serif" fill="currentColor">' + ch + '</text></svg>'; }
var IC = {
  planet:S('<circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10.5" ry="3.2" transform="rotate(-20 12 12)"/><circle cx="19.5" cy="4.5" r=".9" fill="currentColor"/>'),
  quantum:S('<path d="M2 12q2.5-9 5 0t5 0t5 0t5 0"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/>'),
  laser:S('<path d="M2 12h12"/><path d="M14 12l4-6M14 12l4 6M14 12h8M14 12l5-3.5M14 12l5 3.5"/><circle cx="14" cy="12" r="1.6" fill="currentColor"/>'),
  sun:S('<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'),
  prism:S('<path d="M12 4l7 14H5z"/><path d="M1 12l7 1M16 11l7-3M16 13l7 1M16 15l7 4"/>'),
  atom:S('<ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>'),
  nano:S('<path d="M8 4l4.500 2.600v5.200L8 14.400 3.500 11.800V6.600z"/><path d="M16 9.600l4.500 2.600v5.200L16 20l-4.500-2.600v-5.200z"/>'),
  polymer:S('<circle cx="5" cy="12" r="2.400"/><circle cx="12" cy="6.500" r="2.400"/><circle cx="19" cy="12" r="2.400"/><circle cx="12" cy="17.500" r="2.400"/><path d="M7 10.800l3-2.600M14 8.200l3 2.600M17 13.600l-3 2.600M10 16.200l-3-2.600"/>'),
  diode:S('<path d="M2 12h6M16 12h6"/><path d="M8 6v12l8-6zM16 6v12"/>'),
  magnet:S('<path d="M5 3v8a7 7 0 0014 0V3h-4v8a3 3 0 01-6 0V3z"/><path d="M5 7h4M15 7h4"/>'),
  bolt:S('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
  antenna:S('<path d="M12 12v9M8 21h8"/><circle cx="12" cy="10" r="1.600" fill="currentColor"/><path d="M7.500 5.500a6.500 6.500 0 000 9M16.500 5.500a6.500 6.500 0 010 9M4.500 3a10.500 10.500 0 000 14M19.500 3a10.500 10.500 0 010 14"/>'),
  chip:S('<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'),
  clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.500 2"/>'),
  thermo:S('<path d="M10 14.500V5a2 2 0 014 0v9.500a4 4 0 11-4 0z"/><path d="M12 9v7"/>'),
  molecule:S('<circle cx="7" cy="8" r="3"/><circle cx="17" cy="9" r="2.200"/><circle cx="12" cy="18" r="2.600"/><path d="M9.500 9.500l2 6.300M14.900 10.600l-2 5.300M10 7.500l5 1"/>'),
  gear:S('<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="6.500"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100"/>'),
  arrow:S('<path d="M4 20L19 5M19 5h-7M19 5v7"/>'),
  flask:S('<path d="M9 3h6M10 3v6L4.500 19a2 2 0 001.800 3h11.400a2 2 0 001.800-3L14 9V3"/><path d="M7.500 15h9"/>'),
  dome:S('<path d="M4 20v-8a8 8 0 0116 0v8M2 20h20M12 4V2M9 20v-5a3 3 0 016 0v5"/>'),
  cap:S('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.500V16c3 2.500 9 2.500 12 0v-4.500M22 9v6"/>'),
  clip:S('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8.500 10h7M8.500 14h7M8.500 17.500h4"/>'),
  star:S('<path d="M12 2.500l2.800 6.200 6.700.7-5 4.600 1.400 6.600L12 17.200 6.100 20.600l1.400-6.600-5-4.600 6.700-.7z"/>')
};
var RULES = [
  [/astro|astron|астро|космос/, IC.planet], [/kvant|quant|квант/, IC.quantum],
  [/lazer|laser|лазер/, IC.laser], [/nurning|light.*matter|свет/, IC.sun],
  [/optik|optic|оптик/, IC.prism], [/yadro|nuclear|ядер|atom|атом/, IC.atom],
  [/nano|нано/, IC.nano], [/polimer|polymer|полимер/, IC.polymer],
  [/yarim|semicond|dielektrik|полупровод|диэлектр/, IC.diode],
  [/elektromagnet|electromagnet|электромагнит/, IC.magnet],
  [/radio|радио|signal/, IC.antenna],
  [/elektr|electr|электр/, IC.bolt],
  [/kompyuter|computer|компьют|modellash|model/, IC.chip],
  [/nisbiylik|relativ|относител/, IC.clock],
  [/termodin|thermo|термо|issiqlik/, IC.thermo], [/molekul|molecul|молекул/, IC.molecule],
  [/mexanik|mechanic|механик/, IC.gear],
  [/matematik fizika|mathematical phys|математической физики/, T('∇')],
  [/differensial|differential|дифференц/, T('∂')], [/analiz|analysis|анализ|integral/, T('∫')],
  [/vektor|tenzor|vector|tensor|вектор|тензор/, IC.arrow], [/kompleks|complex|комплекс/, T('ℂ')],
  [/algebra|geometri|алгебр|геометр/, T('Σ')], [/kimyo|chem|хим/, IC.flask],
  [/psixolog|psycholog|психолог/, T('Ψ')], [/falsafa|philosoph|философ/, T('φ')],
  [/dinshun|religio|религ/, IC.dome], [/pedagog|педагог/, IC.cap],
  [/metodik|methodolog|методик|teaching/, IC.clip],
  [/umumiy fizika|general physics|общая физика/, IC.star]
];
function applyIcons(){
  document.querySelectorAll('.sec-card[data-id] .sec-icon:not([data-ic])').forEach(function(el){
    el.setAttribute('data-ic', '1');
    var h = el.closest('.sec-card').querySelector('h3');
    var n = (h ? h.textContent : '').toLowerCase().replace(/[\u2018\u2019\u02bb\u02bc`\u00b4']/g, '');
    for(var i = 0; i < RULES.length; i++){ if(RULES[i][0].test(n)){ el.innerHTML = RULES[i][1]; break; } }
  });
}
var mw = document.getElementById('mainWrap'), tm;
if(mw){
  new MutationObserver(function(){ clearTimeout(tm); tm = setTimeout(applyIcons, 30); }).observe(mw, {childList:true, subtree:true});
}
applyIcons();

/* ───────────── Uchar yulduzlar + bosganda uchqunlar ───────────── */
var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
function mkCanvas(z){ var c = document.createElement('canvas'); c.setAttribute('aria-hidden','true'); c.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:' + z; document.body.appendChild(c); return c; }
var cM = mkCanvas(-1), cS = mkCanvas(500), xM = cM.getContext('2d'), xS = cS.getContext('2d');
var ca = document.createElement('canvas'), xa = ca.getContext('2d'), lastA = 0, stars = [], W = 0, H = 0, dpr = 1, meteors = [], sparks = [], next = 0, nextShower = 0, run = false, raf = 0;
function buildStars(){ca.width=Math.max(2,W>>1);ca.height=Math.max(2,H>>1);var n=Math.min(420,Math.round(W*H/2600)),C=['255,255,255','200,225,255','255,236,190'];stars=[];for(var i=0;i<n;i++)stars.push({x:Math.random()*W,y:Math.random()*H*.88,r:.4+Math.random()*1.2,ph:Math.random()*6.28,sp:.5+Math.random()*2,big:Math.random()<.06,c:C[(Math.random()*3)|0]});}
function size(){ setTimeout(buildStars,0);
  dpr = Math.min(window.devicePixelRatio || 1, innerWidth < 700 ? 1 : 1.5); W = innerWidth; H = innerHeight;
  [cM, cS].forEach(function(c){ c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); c.getContext('2d').setTransform(dpr,0,0,dpr,0,0); });
}
var rt; addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(size, 150); }); size();
var isDark = function(){ return document.documentElement.getAttribute('data-theme') === 'dark'; };
var MC = ['255,255,255','150,225,255','255,215,120','160,200,255'];
function spawnMeteor(){
  var dir = Math.random() < .25 ? -1 : 1, a = .35 + Math.random() * .5, sp = 16 + Math.random() * 14;
  meteors.push({x: dir > 0 ? Math.random() * W * .9 : W * .1 + Math.random() * W * .9, y: -20 + Math.random() * H * .3,
    vx: Math.cos(a) * sp * dir, vy: Math.sin(a) * sp, len: 12 + Math.random() * 16, w: 1 + Math.random() * 1.7,
    c: MC[(Math.random() * MC.length) | 0], life: 0});
}
function burst(x, y, n){
  var pal = isDark() ? ['255,255,255','150,225,255','255,215,120','160,200,255'] : ['255,190,60','40,190,200','80,160,255','255,140,60'];
  for(var i = 0; i < n; i++){
    var a = Math.random() * 6.283, s = .8 + Math.random() * 3.2;
    sparks.push({x:x, y:y, vx:Math.cos(a)*s, vy:Math.sin(a)*s - .6, r:1 + Math.random()*2.2, life:0, max:35 + Math.random()*30, c:pal[(Math.random()*pal.length)|0]});
  }
}
addEventListener('pointerdown', function(e){ if(!reduce) burst(e.clientX, e.clientY, 16); }, {passive:true});
var lastMove = 0;
addEventListener('pointermove', function(e){
  if(reduce || e.pointerType !== 'mouse') return;
  var n = performance.now(); if(n - lastMove < 40) return; lastMove = n; burst(e.clientX, e.clientY, 1);
}, {passive:true});
function drawAurora(ts){
  if(ts - lastA > 60 && ca.width > 2){
    lastA = ts; var t = ts / 1000;
    xa.setTransform(.5,0,0,.5,0,0); xa.clearRect(0,0,W,H); xa.globalCompositeOperation = 'lighter';
    var P = [[60,255,160],[70,190,255],[180,110,255]];
    for(var b = 0; b < 3; b++){
      var c = P[b], base = H * (.17 + .08 * b);
      for(var x = 0; x < W; x += 8){
        var y = base + Math.sin(x/(W*.17) + t*.35 + b*2) * H*.05 + Math.sin(x/(W*.07) - t*.5 + b) * H*.02,
            h = H * (.24 + .1 * Math.sin(x/(W*.11) + t*.3 + b*1.7)),
            a = (.16 + .1 * Math.sin(x/(W*.2) + t*.6 + b)).toFixed(3),
            g = xa.createLinearGradient(0, y - h, 0, y + h*.2);
        g.addColorStop(0,'rgba(' + c + ',0)'); g.addColorStop(.75,'rgba(' + c + ',' + a + ')'); g.addColorStop(1,'rgba(' + c + ',0)');
        xa.fillStyle = g; xa.fillRect(x, y - h, 8, h * 1.2);
      }
    }
  }
  xM.drawImage(ca, 0, 0, W, H);
}
function frame(ts){
  raf = requestAnimationFrame(frame);
  if(ts - (window.__lf || 0) < 30) return; window.__lf = ts;
  xM.clearRect(0,0,W,H); xS.clearRect(0,0,W,H);
  if(isDark()){
    if(ts > next){ spawnMeteor(); if(Math.random() < .4) spawnMeteor(); next = ts + 450 + Math.random() * 1100; }
    if(ts > nextShower){ for(var k = 0; k < 9; k++) setTimeout(spawnMeteor, k * 140); nextShower = ts + 22000 + Math.random() * 16000; }
  }
  if(isDark()){drawAurora(ts);var tt=ts/1000;for(var s2=0;s2<stars.length;s2++){var q=stars[s2],tw=.35+.65*(.5+.5*Math.sin(tt*q.sp+q.ph));
    xM.fillStyle='rgba('+q.c+','+tw.toFixed(2)+')';xM.beginPath();xM.arc(q.x,q.y,q.r,0,6.283);xM.fill();
    if(q.big){xM.strokeStyle='rgba('+q.c+','+(tw*.7).toFixed(2)+')';xM.lineWidth=.8;var L=3+q.r*3*tw;xM.beginPath();xM.moveTo(q.x-L,q.y);xM.lineTo(q.x+L,q.y);xM.moveTo(q.x,q.y-L);xM.lineTo(q.x,q.y+L);xM.stroke();}}}
  xM.lineCap = 'round';
  for(var i = meteors.length - 1; i >= 0; i--){
    var m = meteors[i]; m.x += m.vx; m.y += m.vy; m.life++;
    var tx = m.x - m.vx * m.len / 4, ty = m.y - m.vy * m.len / 4;
    var g = xM.createLinearGradient(m.x, m.y, tx, ty);
    g.addColorStop(0, 'rgba(' + m.c + ',1)'); g.addColorStop(1, 'rgba(' + m.c + ',0)');
    xM.strokeStyle = g; xM.lineWidth = m.w; xM.beginPath(); xM.moveTo(m.x, m.y); xM.lineTo(tx, ty); xM.stroke();
    var gl = xM.createRadialGradient(m.x, m.y, 0, m.x, m.y, 7);
    gl.addColorStop(0, 'rgba(' + m.c + ',.9)'); gl.addColorStop(1, 'rgba(' + m.c + ',0)');
    xM.fillStyle = gl; xM.beginPath(); xM.arc(m.x, m.y, 7, 0, 6.283); xM.fill();
    if(m.x < -120 || m.x > W + 120 || m.y > H * .85 || m.life > 220) meteors.splice(i, 1);
  }
  for(var j = sparks.length - 1; j >= 0; j--){
    var p = sparks[j]; p.x += p.vx; p.y += p.vy; p.vy += .05; p.life++;
    var al = 1 - p.life / p.max; if(al <= 0){ sparks.splice(j, 1); continue; }
    xS.fillStyle = 'rgba(' + p.c + ',' + al.toFixed(2) + ')';
    xS.beginPath(); xS.arc(p.x, p.y, p.r * (.5 + al), 0, 6.283); xS.fill();
  }
}
function start(){ if(run || reduce) return; run = true; next = performance.now() + 800; nextShower = performance.now() + 9000; raf = requestAnimationFrame(frame); }
function stop(){ run = false; cancelAnimationFrame(raf); }
document.addEventListener('visibilitychange', function(){ if(document.hidden) stop(); else start(); });
start();

/* ───────────── Orqaga qaytish: sakramasdan, darhol ───────────── */
(function(){
  var _st = window.scrollTo;
  window.scrollTo = function(){
    var h = document.documentElement, old = h.style.scrollBehavior;
    h.style.scrollBehavior = 'auto';
    try{ return _st.apply(window, arguments); } finally { h.style.scrollBehavior = old; }
  };
  var _rh = window.renderHome;
  if(typeof _rh !== 'function') return;
  function sig(){ return JSON.stringify(sections.map(function(x){ return [x.id,x.name,x.nameRu,x.nameEn,x.order]; })) + JSON.stringify(homeCounts); }
  window.renderHome = function(){
    if(sections && sections.length && homeCounts){
      drawHome();                                   // keshdan darhol
      var before = sig();
      Promise.all([loadSections(), loadAllBooksAndCounts()]).then(function(r){
        homeCounts = r[1].counts; allBooksIndex = r[1].docs;
        if(sig() !== before && !currentSectionId && !drag) drawHome();   // faqat o'zgargan bo'lsa
      }).catch(function(){});
      return Promise.resolve();
    }
    return _rh();
  };
})();

/* ───────────── Inglizcha nomlar ───────────── */
try{ if(typeof I18N!=='undefined' && I18N.en){
  I18N.en.topTitle='Library of the Faculty of Physics'; I18N.en.footTitle='Online Library of the Faculty of Physics';
  I18N.en.siteTitle='Library of the Faculty of Physics \u2014 Online'; if(window.applyStatic) applyStatic();
} }catch(e){}

/* ───────────── Birinchi kirishda tungi rejim ───────────── */
try{
  if(!localStorage.getItem('theme')){
    document.documentElement.setAttribute('data-theme', 'dark');
    if(window.fxSetMode) window.fxSetMode('dark');
    if(window.syncThemeUi) window.syncThemeUi();
  }
}catch(e){}
})();
