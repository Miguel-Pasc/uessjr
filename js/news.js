// js/news.js
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById('newsTrack');
  const prevBtn = document.querySelector('.news-btn.prev');
  const nextBtn = document.querySelector('.news-btn.next');

  // elementos originales (2)
  const originalCards = Array.from(track.querySelectorAll('.news-card'));

  // guardamos el ancho dinámico (incluyendo gap)
  function cardFullWidth(card) {
    const style = getComputedStyle(card);
    const marginRight = parseFloat(style.marginRight || 0);
    const gap =  parseFloat(getComputedStyle(track).gap || 0);
    return card.getBoundingClientRect().width + gap;
  }

  // CLONAR para efecto infinito: clonamos los originales una vez
  // (si hay solo 2, con esto ya hay suficientes para desplazarse)
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone');
    track.appendChild(clone);
  });

  // recalcula en resize
  let currentIndex = 0;
  let step = Math.round(cardFullWidth(originalCards[0])); // pixel por desplazamiento
  window.addEventListener('resize', () => {
    step = Math.round(cardFullWidth(originalCards[0]));
  });

  // Mover a la derecha
  function moveNext() {
    currentIndex++;
    track.style.transition = 'transform 0.45s ease';
    track.style.transform = `translateX(-${currentIndex * step}px)`;

    // si llegamos al final de los originales (index == originals.length)
    if (currentIndex === originalCards.length) {
      // al terminar la transición, reset sin animación
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = 0;
        track.style.transform = `translateX(0px)`;
        // forzar reflow para que la siguiente transición funcione correctamente
        void track.offsetWidth;
      }, 460);
    }
  }

  // Mover a la izquierda
  function movePrev() {
    if (currentIndex === 0) {
      // moverse inmediatamente al clon final
      track.style.transition = 'none';
      currentIndex = originalCards.length;
      track.style.transform = `translateX(-${currentIndex * step}px)`;
      // force reflow
      void track.offsetWidth;
    }
    // luego desplazamos una posición a la izquierda
    currentIndex--;
    track.style.transition = 'transform 0.45s ease';
    track.style.transform = `translateX(-${currentIndex * step}px)`;
  }

  nextBtn.addEventListener('click', moveNext);
  prevBtn.addEventListener('click', movePrev);

  /* --- soporte táctil: toque sobre la tarjeta voltea (toggle) --- */
  // en móviles es común no depender sólo del :hover; añadimos toggle a cada tarjeta
  track.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('touchstart', (e) => {
      // evitar que el evento active scroll accidentalmente
      // toggle la clase 'touched' para forzar flip
      const inner = card.querySelector('.card-inner');
      if (inner) {
        inner.classList.toggle('flipped-by-touch');
      }
    });
  });

  // Si quieres que los flips por touch se auto-remuevan después de X segundos, descomenta:
  // document.querySelectorAll('.news-card .card-inner').forEach(inner => {
  //   inner.addEventListener('transitionend', () => {
  //     setTimeout(() => inner.classList.remove('flipped-by-touch'), 3500);
  //   });
  // });
});
