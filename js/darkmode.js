// js/darkmode.js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('modo-btn');
  const body = document.body;

  // Si quieres persistir la preferencia:
  const saved = localStorage.getItem('umb-dark');
  if (saved === 'true') {
    body.classList.add('dark-mode');
    if (btn) btn.textContent = 'Modo Claro';
  } else {
    if (btn) btn.textContent = 'Modo Oscuro';
  }

  if (!btn) return;
  btn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const active = body.classList.contains('dark-mode');
    btn.textContent = active ? 'Modo Claro' : 'Modo Oscuro';
    localStorage.setItem('umb-dark', active ? 'true' : 'false');
  });
});
