// ============================================================
// Стоматология «Оптимальный выбор» — main.js
// ============================================================

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Шапка: фон при прокрутке ---
const header = document.getElementById('header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// --- Мобильное меню ---
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
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
}

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

// --- Баннер акций в hero (карусель) ---
(() => {
  const banner = document.getElementById('promoBanner');
  if (!banner) return;
  const slides = [...banner.querySelectorAll('.banner-slide')];
  const dotsWrap = banner.querySelector('.banner-dots');
  let idx = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'banner-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Акция ' + (i + 1));
    dot.addEventListener('click', () => {
      go(i);
      restart();
    });
    dotsWrap.appendChild(dot);
  });

  const dots = [...dotsWrap.children];

  const go = (i) => {
    slides[idx].classList.remove('active');
    dots[idx].classList.remove('active');
    idx = i;
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
  };

  const restart = () => {
    if (timer) clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => go((idx + 1) % slides.length), 5000);
  };

  banner.addEventListener('mouseenter', () => timer && clearInterval(timer));
  banner.addEventListener('mouseleave', restart);
  restart();
})();

// --- Версия 2: полноэкранный фотослайдер в hero (index2.html) ---
(() => {
  const hero = document.getElementById('heroSlider');
  if (!hero) return;
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const dotsWrap = hero.querySelector('.hero-full-dots');
  let idx = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'banner-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Фото ' + (i + 1));
    dot.addEventListener('click', () => {
      go(i);
      restart();
    });
    dotsWrap.appendChild(dot);
  });

  const dots = [...dotsWrap.children];

  const go = (i) => {
    slides[idx].classList.remove('active');
    dots[idx].classList.remove('active');
    idx = i;
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
  };

  const restart = () => {
    if (timer) clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => go((idx + 1) % slides.length), 6000);
  };

  restart();
})();

// ============================================================
// Пошаговый мастер записи
// ============================================================

// Врачи и их направления (со старого сайта клиники)
const DOCTORS = [
  { name: 'Любой доступный врач', spec: 'Мы подберём специалиста под вашу задачу', any: true, tags: [] },
  { name: 'Марков Юрий Сергеевич', spec: 'Главный врач, стоматолог-ортопед, хирург', tags: ['prosthetics', 'surgery'] },
  { name: 'Дарьина Валерия Николаевна', spec: 'Врач стоматолог-терапевт', tags: ['therapy', 'hygiene'] },
  { name: 'Девицкий Михаил Александрович', spec: 'Врач стоматолог-ортопед, хирург', tags: ['prosthetics', 'surgery'] },
  { name: 'Кибенко Юлия Дмитриевна', spec: 'Врач стоматолог-терапевт', tags: ['therapy', 'hygiene'] },
  { name: 'Егоров Антон Михайлович', spec: 'Врач стоматолог-имплантолог', tags: ['implant'] },
  { name: 'Марков Роман Юрьевич', spec: 'Стоматолог-ортопед', tags: ['prosthetics'] },
  { name: 'Рязанцева Полина Алексеевна', spec: 'Врач стоматолог-терапевт', tags: ['therapy', 'hygiene'] },
  { name: 'Голоднова Мария Александровна', spec: 'Врач стоматолог-терапевт', tags: ['therapy', 'hygiene'] },
];

// Для консультации и диагностики подходит любой врач
const OPEN_SERVICES = ['consult', 'diagnostics'];

const STEP_TITLES = ['Филиал', 'Услуга', 'Врач', 'Дата приёма', 'Ваши контакты'];

const modal = document.getElementById('modal');
const wizard = document.getElementById('wizard');
const formOk = document.getElementById('formOk');
const okSummary = document.getElementById('okSummary');
const wizStepNum = document.getElementById('wizStepNum');
const wizTitle = document.getElementById('wizTitle');
const wizProgress = document.getElementById('wizProgress');
const wizBack = document.getElementById('wizBack');
const wizNext = document.getElementById('wizNext');
const wizNextText = document.getElementById('wizNextText');
const doctorOptions = document.getElementById('doctorOptions');
const wizSummary = document.getElementById('wizSummary');
const fName = document.getElementById('fName');
const fPhone = document.getElementById('fPhone');
const fConsent = document.getElementById('fConsent');
const calTitle = document.getElementById('calTitle');
const calGrid = document.getElementById('calGrid');
const calPrev = document.getElementById('calPrev');
const calNext = document.getElementById('calNext');

let wizStep = 1;
const wizState = { branch: null, service: null, serviceLabel: null, doctor: null, date: null };

const stepValid = () => {
  switch (wizStep) {
    case 1: return Boolean(wizState.branch);
    case 2: return Boolean(wizState.service);
    case 3: return Boolean(wizState.doctor);
    case 4: return Boolean(wizState.date);
    case 5: return fName.value.trim().length > 1 && fPhone.value.replace(/\D/g, '').length >= 10 && fConsent.checked;
    default: return false;
  }
};

const updateNext = () => {
  wizNext.disabled = !stepValid();
};

const setStep = (n) => {
  wizStep = n;
  document.querySelectorAll('.wiz-pane').forEach((p) => {
    p.hidden = Number(p.dataset.pane) !== n;
  });
  wizStepNum.textContent = n;
  wizTitle.textContent = STEP_TITLES[n - 1];
  [...wizProgress.children].forEach((s, i) => s.classList.toggle('done', i < n));
  wizBack.disabled = n === 1;
  wizNextText.textContent = n === 5 ? 'Отправить заявку' : 'Далее';
  if (n === 3) renderDoctors();
  if (n === 4) renderCal();
  if (n === 5) renderSummary();
  updateNext();
};

// --- Выбор карточек (филиал / услуга / врач) ---
document.querySelectorAll('[data-group]').forEach((group) => {
  group.addEventListener('click', (e) => {
    const card = e.target.closest('.opt-card');
    if (!card) return;
    group.querySelectorAll('.opt-card').forEach((c) => c.classList.remove('selected'));
    card.classList.add('selected');
    const g = group.dataset.group;
    if (g === 'branch') {
      wizState.branch = card.dataset.value;
    } else if (g === 'service') {
      if (wizState.service !== card.dataset.value) wizState.doctor = null;
      wizState.service = card.dataset.value;
      wizState.serviceLabel = card.querySelector('.t').textContent.trim();
    } else if (g === 'doctor') {
      wizState.doctor = card.dataset.value;
    }
    updateNext();
  });
});

// --- Шаг 3: врачи по выбранной услуге ---
const initials = (name) => name.split(' ').slice(0, 2).map((w) => w[0]).join('');

function renderDoctors() {
  const list = DOCTORS.filter(
    (d) => d.any || OPEN_SERVICES.includes(wizState.service) || d.tags.includes(wizState.service)
  );
  doctorOptions.innerHTML = '';
  list.forEach((d) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'opt-card doc' + (wizState.doctor === d.name ? ' selected' : '');
    card.dataset.value = d.name;
    card.innerHTML = `
      <span class="ava">${d.any ? '?' : initials(d.name)}</span>
      <span class="doc-info">
        <span class="t">${d.name}</span>
        <small>${d.spec}</small>
      </span>`;
    doctorOptions.appendChild(card);
  });
  // Если выбранный ранее врач не подходит под новую услугу — сбрасываем
  if (wizState.doctor && !list.some((d) => d.name === wizState.doctor)) {
    wizState.doctor = null;
  }
}

// --- Шаг 4: календарь (выбор дня, воскресенье — выходной) ---
const today = new Date();
today.setHours(0, 0, 0, 0);
const monthStart = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const calBase = monthStart(today);
const CAL_MAX_MONTHS = 2; // насколько месяцев вперёд можно листать
let calShown = new Date(calBase);

const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function renderCal() {
  const y = calShown.getFullYear();
  const m = calShown.getMonth();
  calTitle.textContent = calShown.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
  calPrev.disabled = calShown <= calBase;
  calNext.disabled = calShown >= new Date(calBase.getFullYear(), calBase.getMonth() + CAL_MAX_MONTHS, 1);

  calGrid.innerHTML = '';
  ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].forEach((d) => {
    const el = document.createElement('span');
    el.className = 'cal-dow';
    el.textContent = d;
    calGrid.appendChild(el);
  });

  const firstDow = (new Date(y, m, 1).getDay() + 6) % 7; // 0 = понедельник
  for (let i = 0; i < firstDow; i++) {
    const el = document.createElement('span');
    el.className = 'cal-day empty';
    calGrid.appendChild(el);
  }

  const daysInMonth = new Date(y, m + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cal-day' + (sameDay(date, wizState.date) ? ' selected' : '');
    btn.textContent = d;
    btn.disabled = date < today || date.getDay() === 0; // прошлое и воскресенья
    btn.addEventListener('click', () => {
      wizState.date = date;
      renderCal();
      updateNext();
    });
    calGrid.appendChild(btn);
  }
}

calPrev.addEventListener('click', () => {
  calShown = new Date(calShown.getFullYear(), calShown.getMonth() - 1, 1);
  renderCal();
});

calNext.addEventListener('click', () => {
  calShown = new Date(calShown.getFullYear(), calShown.getMonth() + 1, 1);
  renderCal();
});

// --- Шаг 5: сводка ---
const fmtDate = (d) => d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

function renderSummary() {
  const rows = [
    ['Филиал', wizState.branch],
    ['Услуга', wizState.serviceLabel],
    ['Врач', wizState.doctor],
    ['Дата', wizState.date ? fmtDate(wizState.date) : ''],
  ];
  wizSummary.innerHTML = rows
    .map(([k, v]) => `<div class="sum-row"><span>${k}</span><b>${v}</b></div>`)
    .join('');
}

[fName, fPhone].forEach((input) => input.addEventListener('input', updateNext));
fConsent.addEventListener('change', updateNext);

// --- Навигация по шагам ---
wizBack.addEventListener('click', () => {
  if (wizStep > 1) setStep(wizStep - 1);
});

wizNext.addEventListener('click', () => {
  if (!stepValid()) return;
  if (wizStep < 5) {
    setStep(wizStep + 1);
  } else {
    // Прототип: показываем подтверждение без отправки на сервер
    wizard.style.display = 'none';
    formOk.style.display = 'block';
    okSummary.textContent =
      `${wizState.branch} · ${wizState.serviceLabel} · ${wizState.doctor} · ${fmtDate(wizState.date)} — ` +
      'мы перезвоним вам в часы работы клиники и подтвердим запись.';
  }
});

// --- Открытие / закрытие модального окна ---
const resetWizard = () => {
  wizState.branch = null;
  wizState.service = null;
  wizState.serviceLabel = null;
  wizState.doctor = null;
  wizState.date = null;
  calShown = new Date(calBase);
  fName.value = '';
  fPhone.value = '';
  fConsent.checked = false;
  document.querySelectorAll('.opt-card').forEach((c) => c.classList.remove('selected'));
  wizard.style.display = '';
  formOk.style.display = 'none';
  setStep(1);
};

const openModal = () => {
  resetWizard();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

document.querySelectorAll('[data-open-modal]').forEach((el) => el.addEventListener('click', openModal));
document.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeModal));

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});
