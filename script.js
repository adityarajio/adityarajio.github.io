/* ── Cursor ── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();
document.querySelectorAll('a,button,.project-card,.stat-row,.skill-item,.c-social').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='16px';cur.style.height='16px';ring.style.width='50px';ring.style.height='50px';});
  el.addEventListener('mouseleave',()=>{cur.style.width='10px';cur.style.height='10px';ring.style.width='36px';ring.style.height='36px';});
});

/* ── Nav scroll ── */
const navEl=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  navEl.classList.toggle('scrolled',window.scrollY>40);
},{ passive:true });

/* ── Theme ── */
const tt=document.getElementById('themeToggle');
tt.addEventListener('click',()=>{
  const h=document.documentElement;
  h.dataset.theme=h.dataset.theme==='dark'?'light':'dark';
  localStorage.setItem('ar-theme',h.dataset.theme);
});
const st=localStorage.getItem('ar-theme');
if(st)document.documentElement.dataset.theme=st;

/* ── Burger ── */
const burger=document.getElementById('burger');
const navLinks=document.getElementById('navLinks');
burger.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

/* ── Marquee ── */
const items=['HTML5','CSS3','JavaScript','Responsive Design','Git & GitHub','UI/UX','Web Performance','Accessibility','Flexbox & Grid','Animations','DOM APIs','Fetch API'];
const track=document.getElementById('marquee');
const html=items.map(i=>`<div class="marquee-item"><span class="m-dot">✦</span>${i}</div>`).join('');
track.innerHTML=html+html; // duplicate for seamless loop

/* ── Scroll reveal ── */
const revEls=document.querySelectorAll('.rv');
const revObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('in'),i*60);
      revObs.unobserve(e.target);
    }
  });
},{threshold:0.1});
revEls.forEach(el=>revObs.observe(el));

/* ── Skill bars ── */
document.querySelectorAll('.skill-fill, .status-fill').forEach(bar=>{
  const w=bar.dataset.w;
  bar.style.width=(parseFloat(w)*100)+'%';
  bar.style.transform='scaleX(0)';
  const obs=new IntersectionObserver(([e])=>{
    if(e.isIntersecting){bar.classList.add('in');obs.disconnect();}
  },{threshold:.5});
  obs.observe(bar);
});

/* ── Skill spotlight effect ── */
document.querySelectorAll('.skill-item').forEach(item=>{
  item.addEventListener('mousemove',e=>{
    const rect=item.getBoundingClientRect();
    const x=((e.clientX-rect.left)/rect.width*100)+'%';
    const y=((e.clientY-rect.top)/rect.height*100)+'%';
    item.style.setProperty('--mx',x);
    item.style.setProperty('--my',y);
  });
});

/* ── Toast ── */
function showToast(msg){
  const t=document.getElementById('toast');
  document.getElementById('toast-msg').textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3500);
}

/* ── Send ── */
/* ── Send via Formspree ── */
async function sendMsg(){
  const nameEl = document.getElementById('cf-name');
  const emailEl = document.getElementById('cf-email');
  const subjEl = document.getElementById('cf-subject');
  const msgEl = document.getElementById('cf-msg');

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const subj = subjEl.value.trim();
  const msg = msgEl.value.trim();

  if(!name || !email || !msg){
    showToast('Please fill in all required fields.');
    return;
  }

  const btn = document.querySelector('.btn-send');
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Sending...';

  try {
    const response = await fetch('https://formspree.io/f/mvzezgbb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, subject: subj, message: msg })
    });

    if (response.ok) {
      showToast('Message sent! I\'ll get back to you soon.');
      [nameEl, emailEl, subjEl, msgEl].forEach(el => el.value = '');
    } else {
      showToast('Something went wrong. Please try again.');
    }
  } catch (err) {
    showToast('Network error. Please try again.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
}

/* ── Nav active ── */
const secs=document.querySelectorAll('section[id]');
const nAs=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-140)cur=s.id;});
  nAs.forEach(a=>a.style.color=a.getAttribute('href')==='#'+cur?'var(--blue)':'');
},{passive:true});
