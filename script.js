document.addEventListener('DOMContentLoaded', () => {
  // CAROUSEL
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const imgs = document.querySelectorAll('.carousel-track img');
  let current = 0;
  const total = imgs.length;

  function goTo(i) {
    current = (i + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
  }

  document.querySelector('.carousel-arrow.prev')?.addEventListener('click', () => goTo(current - 1));
  document.querySelector('.carousel-arrow.next')?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Touch swipe
  let startX = 0;
  const carousel = document.querySelector('.carousel');
  carousel?.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  carousel?.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  });

  // Auto-slide
  let autoSlide = setInterval(() => goTo(current + 1), 4500);
  carousel?.addEventListener('touchstart', () => clearInterval(autoSlide));

  // QUANTITY
  const qtyVal = document.getElementById('qty-value');
  const priceEl = document.querySelector('.price-current');
  const stickyPrice = document.querySelector('.sticky-bar-price');
  const basePrice = 69.90;

  document.getElementById('qty-minus')?.addEventListener('click', () => {
    let v = parseInt(qtyVal.textContent);
    if (v > 1) { v--; qtyVal.textContent = v; updatePrice(v); }
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    let v = parseInt(qtyVal.textContent);
    if (v < 5) { v++; qtyVal.textContent = v; updatePrice(v); }
  });

  function updatePrice(q) {
    const p = (basePrice * q).toFixed(2).replace('.', ',');
    priceEl.textContent = `${p}€`;
    if (stickyPrice) stickyPrice.textContent = `${p}€`;
  }

  // VARIANT SELECTION
  document.querySelectorAll('.variant-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.variant-options').querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // STICKY BAR
  const buySection = document.querySelector('.buy-section');
  const stickyBar = document.querySelector('.sticky-bar');
  if (buySection && stickyBar) {
    const obs = new IntersectionObserver(entries => {
      stickyBar.classList.toggle('visible', !entries[0].isIntersecting);
    }, { threshold: 0 });
    obs.observe(buySection);
  }

  // FAQ ACCORDION
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      document.querySelectorAll('.faq-item').forEach(i => { if (i !== item) i.classList.remove('open'); });
      item.classList.toggle('open');
    });
  });

  // SHOW MORE REVIEWS
  const showMoreBtn = document.getElementById('show-more-reviews');
  const hiddenReviews = document.querySelectorAll('.review-card.hidden');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      hiddenReviews.forEach(r => r.classList.remove('hidden'));
      showMoreBtn.style.display = 'none';
    });
  }

  // COUNTDOWN TIMER
  const timerEl = document.getElementById('countdown');
  if (timerEl) {
    let mins = 14, secs = 59;
    setInterval(() => {
      if (secs === 0) { if (mins === 0) return; mins--; secs = 59; }
      else secs--;
      timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
  }
});
