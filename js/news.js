document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById('newsTrack');
  const prevBtn = document.querySelector('.news-btn.prev');
  const nextBtn = document.querySelector('.news-btn.next');

  const originalCards = Array.from(track.querySelectorAll('.news-card'));

  // guardamos el ancho dinámico (incluyendo gap)
  function cardFullWidth(card) {
    const style = getComputedStyle(card);
    const marginRight = parseFloat(style.marginRight || 0);
    const gap = parseFloat(getComputedStyle(track).gap || 0);
    return card.getBoundingClientRect().width + gap;
  }

  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone');
    track.appendChild(clone);
  });

  let currentIndex = 0;
  let step = Math.round(cardFullWidth(originalCards[0]));
  window.addEventListener('resize', () => {
    step = Math.round(cardFullWidth(originalCards[0]));
  });

  function moveNext() {
    currentIndex++;
    track.style.transition = 'transform 0.45s ease';
    track.style.transform = `translateX(-${currentIndex * step}px)`;

    if (currentIndex === originalCards.length) {      
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = 0;
        track.style.transform = `translateX(0px)`;        
        void track.offsetWidth;
      }, 460);
    }
  }

  function movePrev() {
    if (currentIndex === 0) {
      track.style.transition = 'none';
      currentIndex = originalCards.length;
      track.style.transform = `translateX(-${currentIndex * step}px)`;      
      void track.offsetWidth;
    }
    currentIndex--;
    track.style.transition = 'transform 0.45s ease';
    track.style.transform = `translateX(-${currentIndex * step}px)`;
  }

  nextBtn.addEventListener('click', moveNext);
  prevBtn.addEventListener('click', movePrev);
});
