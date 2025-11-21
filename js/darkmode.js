// js/darkmode.js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('modo-btn');
  const body = document.body;

  // Si quieres persistir la preferencia:
  const saved = localStorage.getItem('umb-dark');
  if (saved === 'true') {
    body.classList.add('dark-mode');
    if (btn) btn.innerHTML = "<img src='/img/icons/sol.png' width='50px'>";
  } else {
    if (btn) btn.innerHTML = "<img src='/img/icons/luna.png' width='50px'>";
  }

  if (!btn) return;
  btn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const active = body.classList.contains('dark-mode');
    btn.innerHTML = active ? 
    "<img src='/img/icons/sol.png' width='50px'>" : 
    "<img src='/img/icons/luna.png' width='50px'>";
    localStorage.setItem('umb-dark', active ? 'true' : 'false');
  });
});
