
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Splash remove when ready
window.addEventListener('load', () => {
  document.getElementById('splash').style.display = 'none';
});

// PWA install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.hidden = false;
});
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });
}

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
}

// Assistant
const panel = document.getElementById('assistantPanel');
const toggle = document.getElementById('assistantToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const visible = panel.classList.toggle('visible');
    toggle.setAttribute('aria-expanded', visible ? 'true' : 'false');
  });
}
document.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    if (!target) return;
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({behavior:'smooth'});
  });
});

// Simple contact form (demo)
const form = document.getElementById('requestForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const contactInfo = document.getElementById('contactInfo').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !contactInfo || !message) {
      alert('Please fill the form so we can help you.');
      return;
    }
    const ok = document.getElementById('formMessage');
    ok.hidden = false;
    setTimeout(() => { ok.hidden = true; form.reset(); }, 3500);
  });
  document.getElementById('clearForm').addEventListener('click', () => form.reset());
}
