(() => {
  const cookieNotice = document.getElementById('cookieNotice');
  const cookieAccept = document.getElementById('cookieAccept');
  const storageKey = 'stomko-cookie-accepted';

  if (cookieNotice && cookieAccept) {
    let accepted = false;
    try {
      accepted = localStorage.getItem(storageKey) === 'true';
    } catch (_) {
      accepted = false;
    }

    if (!accepted) {
      accepted = document.cookie
        .split('; ')
        .some((item) => item === `${storageKey}=true`);
    }

    if (!accepted) cookieNotice.hidden = false;

    cookieAccept.addEventListener('click', () => {
      cookieNotice.hidden = true;
      try {
        localStorage.setItem(storageKey, 'true');
      } catch (_) {
        // В браузерах без localStorage используется cookie ниже.
      }
      document.cookie = `${storageKey}=true; path=/; max-age=31536000; SameSite=Lax`;
    });
  }

  const lightbox = document.getElementById('licenseLightbox');
  const lightboxImage = document.getElementById('licenseLightboxImage');
  if (!lightbox || !lightboxImage) return;

  let opener = null;
  const close = () => {
    lightbox.hidden = true;
    lightboxImage.src = '';
    document.body.style.overflow = '';
    if (opener) opener.focus();
  };

  document.querySelectorAll('[data-license-src]').forEach((button) => {
    button.addEventListener('click', () => {
      opener = button;
      lightboxImage.src = button.dataset.licenseSrc;
      lightboxImage.alt = button.dataset.licenseAlt || 'Лицензия клиники';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.license-lightbox-close').focus();
    });
  });

  lightbox.querySelectorAll('[data-license-close]').forEach((button) =>
    button.addEventListener('click', close)
  );

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) close();
  });
})();
