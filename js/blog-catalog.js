(() => {
  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.blog-card[data-category]')];
  const search = document.querySelector('#blogSearch');
  const resultCount = document.querySelector('#blogResultCount');
  if (!filters.length || !cards.length) return;

  let activeFilter = 'all';

  const applyFilters = () => {
    const query = (search?.value || '').trim().toLocaleLowerCase('ru');
    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      const haystack = card.dataset.search || card.textContent.toLocaleLowerCase('ru');
      const visible = matchesCategory && (!query || haystack.includes(query));
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (resultCount) resultCount.textContent = String(visibleCount);
  };

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      activeFilter = filter.dataset.filter;
      filters.forEach((item) => item.classList.toggle('active', item === filter));
      applyFilters();
    });
  });

  search?.addEventListener('input', applyFilters);
})();
