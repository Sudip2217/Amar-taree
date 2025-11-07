/* AMAR TORI — interactive behaviors */

/* tiny helpers */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* year */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* top progress bar */
const progress = $('#progressBar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  progress.style.width = `${Math.min(100, Math.round(scrolled * 100))}%`;
});

/* mobile menu toggle (simple) */
const menuBtn = document.getElementById('menuToggle');
menuBtn && menuBtn.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

/* tilt hover effect on cards */
$$('.tilt').forEach(card => {
  card.addEventListener('mousemove', (ev) => {
    const rect = card.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width;
    const y = (ev.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * 6; // rotation X
    const ry = (x - 0.5) * -8; // rotation Y
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 400ms ease';
    setTimeout(()=>card.style.transition='', 400);
  });
});

/* reveal on scroll */
const reveals = $$('.section, .floor-card, .masonry img, .contact-card');
function reveal() {
  reveals.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) el.style.opacity = 1, el.style.transform = 'translateY(0)';
    else el.style.opacity = 0.1, el.style.transform = 'translateY(18px)';
  });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);
reveal();

/* booking buttons open quick modal (simple) */
$$('.book').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.dataset.item || 'Enquiry';
    const name = prompt(`Quick enquiry for ${item} — please enter your name:`);
    if (!name) return alert('Name is required to proceed.');
    const phone = prompt('Phone number:');
    if (!phone) return alert('Phone is required.');
    alert(`Thanks ${name}! We received your enquiry for ${item}. Our agent will contact ${phone}. (Demo behaviour)`);
  });
});

/* gallery lightbox (single implementation) */
const lb = $('#lb');

/* contact form — EmailJS integration */
const form = $('#enquiryForm');
form && form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn && (submitBtn.disabled = true);

  document.addEventListener('submit', async (e) => {
  const form = e.target;
  if (!form.matches('#contactForm')) return;
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
  const msgBox = document.getElementById('formMessage');
  msgBox.textContent = '';
  msgBox.style.color = '';

  submitBtn && (submitBtn.disabled = true);

  // Fallback demo
  if (!window.fetch) {
    const data = new FormData(form);
    const name = data.get('name') || 'Guest';
    const interest = data.get('interest') || 'enquiry';
    msgBox.style.color = 'green';
    msgBox.textContent = `Thanks ${name}! Your enquiry for "${interest}" was received (demo).`;
    form.reset();
    submitBtn && (submitBtn.disabled = false);
    return;
  }

  try {
    // 🔹 Replace with your actual Formspree endpoint
  document.addEventListener('submit', async (e) => {
  const form = e.target;
  if (!form.matches('#enquiryForm')) return;
  e.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  const msgBox = document.getElementById('formMessage');
  msgBox.textContent = '';
  msgBox.style.color = '';

  submitBtn && (submitBtn.disabled = true);

  // fallback demo if fetch not available
  if (!window.fetch) {
    const data = new FormData(form);
    const name = data.get('name') || 'Guest';
    const interest = data.get('interest') || 'enquiry';
    msgBox.style.color = 'green';
    msgBox.textContent = `Thanks ${name}! Your enquiry for "${interest}" was received (demo).`;
    form.reset();
    submitBtn && (submitBtn.disabled = false);
    return;
  }

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    const name = form.querySelector('[name="name"]').value || 'Guest';
    const interest = form.querySelector('[name="interest"]').value || 'enquiry';

    if (response.ok) {
      msgBox.style.color = 'green';
      msgBox.textContent = `✅ Thanks ${name}! Your enquiry for "${interest}" was sent successfully. We'll get back to you soon.`;
      form.reset();
    } else {
      const data = await response.json();
      msgBox.style.color = 'red';
      msgBox.textContent = data.errors
        ? `⚠️ Submission failed: ${data.errors.map(e => e.message).join(', ')}`
        : '⚠️ Sorry, something went wrong. Please try again later.';
    }
  } catch (err) {
    console.error('Formspree submit failed', err);
    msgBox.style.color = 'red';
    msgBox.textContent = '❌ Sorry, we could not send your enquiry right now. Please try again later or WhatsApp us.';
  } finally {
    submitBtn && (submitBtn.disabled = false);
  }
});

// Optional: WhatsApp button action
document.getElementById('whatsappNow').addEventListener('click', () => {
  const name = document.querySelector('[name="name"]').value || '';
  const interest = document.querySelector('[name="interest"]').value || '';
  const message = document.querySelector('[name="message"]').value || '';
  const phone = '91XXXXXXXXXX'; // 🔹 Replace with your WhatsApp number
  const text = `Hello, I'm ${name}. I'm interested in ${interest}. ${message ? 'Message: ' + message : ''}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
});


/* WhatsApp quick action */
const waBtn = document.getElementById('whatsappNow');
waBtn && waBtn.addEventListener('click', ()=> {
  const text = encodeURIComponent('Hello, I would like to enquire about Amar Tori cottages.');
  window.open(`https://wa.me/919000000000?text=${text}`, '_blank');
});

/* small UX: buttons ripple */
$$('button, .btn, a').forEach(el=>{
  el.addEventListener('pointerdown', (e)=> {
    el.style.transform = 'translateY(1px) scale(.998)';
    setTimeout(()=>el.style.transform='', 160);
  });
});

const galleryImages = document.querySelectorAll('.masonry img');
  const lightbox = document.getElementById('lb');
  let currentIndex = 0;

  function showImage(index) {
    if (index < 0) index = galleryImages.length - 1;
    if (index >= galleryImages.length) index = 0;
    currentIndex = index;
    const imgSrc = galleryImages[index].src;

    lightbox.innerHTML = `
      <span class="close-btn">&times;</span>
      <span class="arrow left">&#10094;</span>
      <img src="${imgSrc}" alt="">
      <span class="arrow right">&#10095;</span>
    `;
    lightbox.classList.add('open');
  }

  if (galleryImages && galleryImages.length && lightbox) {
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => showImage(index));
    });
  }

  // Navigation + close
  lightbox.addEventListener('click', e => {
    if (e.target.classList.contains('close-btn')) {
      lightbox.classList.remove('open');
    } else if (e.target.classList.contains('arrow')) {
      if (e.target.classList.contains('left')) {
        showImage(currentIndex - 1);
      } else {
        showImage(currentIndex + 1);
      }
    } else if (e.target === lightbox) {
      lightbox.classList.remove('open');
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });

/* ensure hero video attempts to play (mobile inline) */
window.addEventListener('load', () => {
  const hv = document.querySelector('.hero-video');
  if (hv && typeof hv.play === 'function') {
    const p = hv.play();
    if (p && typeof p.catch === 'function') p.catch(()=>{});
  }
});

/* subtle hero parallax */
(() => {
  const hero = document.querySelector('.hero');
  const inner = document.querySelector('.hero-inner');
  const orbs = $$('.orb');
  if (!hero || !inner) return;
  const move = (x, y, intensity) => `translate3d(${(x - 0.5) * intensity}px, ${(y - 0.5) * intensity}px, 0)`;
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    inner.style.transform = move(x, y, 12);
    orbs.forEach((o, i) => o.style.transform = `${move(x, y, (i+1)*6)} scale(1)`);
  });
  hero.addEventListener('mouseleave', () => {
    inner.style.transform = '';
    orbs.forEach(o => o.style.transform = '');
  });
})();