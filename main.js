
// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 2000);
});

// ── CURSOR ──
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cur.style.transform=`translate(${mx-5}px,${my-5}px)`;
});
function animRing(){
  rx+=(mx-rx)*0.1; ry+=(my-ry)*0.1;
  ring.style.transform=`translate(${rx-18}px,${ry-18}px)`;
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.skill-card,.info-card,.contact-item,.project-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform+=' scale(2)';ring.style.opacity='0'});
  el.addEventListener('mouseleave',()=>{ring.style.opacity='1'});
});

// ── NAVIGATION ──
let currentPage='home';
function navigate(page, el){
  if(page===currentPage) return;
  const cur2=document.getElementById('page-'+currentPage);
  cur2.classList.add('exit');
  setTimeout(()=>{cur2.classList.remove('active','exit');cur2.style.display='none';},240);
  setTimeout(()=>{
    const next=document.getElementById('page-'+page);
    next.style.display='block';
    next.classList.add('active');
    currentPage=page;
    updateActive(page);
    window.scrollTo({top:0,behavior:'smooth'});
    initAnim(page);
  },250);
}
function updateActive(page){
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.classList.remove('active');
    if(a.dataset.page===page) a.classList.add('active');
  });
}

// ── NAV SCROLL ──
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>30);
});

// ── MOBILE MENU ──
function toggleMenu(){
  const h=document.getElementById('hamburger');
  const m=document.getElementById('mobile-menu');
  h.classList.toggle('open');
  m.classList.toggle('open');
}
function closeMenu(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
}

// ── REVEAL OBSERVER ──
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('visible')});
},{threshold:0.15});
document.querySelectorAll('[data-reveal]').forEach(el=>revObs.observe(el));

// ── INIT PAGE ANIMATIONS ──
function initAnim(page){
  if(page==='education'){
    setTimeout(()=>{
      document.querySelectorAll('.timeline-item').forEach((el,i)=>{
        setTimeout(()=>el.classList.add('visible'),i*150);
      });
    },200);
  }
  if(page==='skills'){
    setTimeout(()=>{
      document.querySelectorAll('.skill-card').forEach((c,i)=>{
        const delay=parseInt(c.dataset.delay||0);
        setTimeout(()=>{
          c.classList.add('visible');
          const bar=c.querySelector('.skill-bar-fill');
          if(bar) bar.style.width=bar.dataset.level+'%';
        },200+delay);
      });
    },200);
  }
  setTimeout(()=>{
    document.querySelectorAll('#page-'+page+' [data-reveal]').forEach((el,i)=>{
      setTimeout(()=>el.classList.add('visible'),i*100);
    });
  },100);
}

// ── CONTACT FORM ──
function handleSubmit(e){
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  btn.textContent='Sending...';btn.disabled=true;
  setTimeout(()=>{
    document.getElementById('form-success').style.display='block';
    btn.style.display='none';
    e.target.reset();
  },1400);
}

// ── SCREENSHOT MODAL ──
function openModal(src){
  document.getElementById('ss-modal-img').src=src;
  document.getElementById('ss-modal').classList.add('open');
}

// ── INIT ──
initAnim('home');
