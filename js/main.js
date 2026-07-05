// ============================================================
// Стоматология «Оптимальный выбор» — main.js
// ============================================================

// --- Шапка: фон при прокрутке ---
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --- Мобильное меню ---
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  })
);

// --- Появление блоков при прокрутке ---
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// --- Анимированные счётчики статистики ---
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animateCount = (el) => {
  const target = Number(el.dataset.count);
  if (reduceMotion) {
    el.textContent = target;
    return;
  }
  const duration = 1600;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        countObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

// --- Модальное окно записи ---
const modal = document.getElementById('modal');
const bookingForm = document.getElementById('bookingForm');
const formOk = document.getElementById('formOk');

const openModal = () => {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const first = modal.querySelector('input');
  if (first) setTimeout(() => first.focus(), 350);
};

const closeModal = () => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

document.querySelectorAll('[data-open-modal]').forEach((el) =>
  el.addEventListener('click', openModal)
);

document.querySelectorAll('[data-close-modal]').forEach((el) =>
  el.addEventListener('click', closeModal)
);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// Прототип: показываем подтверждение без отправки на сервер
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  bookingForm.style.display = 'none';
  formOk.style.display = 'block';
});
