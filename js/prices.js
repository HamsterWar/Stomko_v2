(() => {
  const normalise = (value) => value.toLocaleLowerCase('ru-RU').trim();
  const plural = (value) => {
    const mod10 = value % 10;
    const mod100 = value % 100;
    if (mod10 === 1 && mod100 !== 11) return 'позиция';
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return 'позиции';
    return 'позиций';
  };

  document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#priceSearch');
    const clear = document.querySelector('#priceSearchClear');
    const result = document.querySelector('#priceResults');
    const empty = document.querySelector('#priceEmpty');
    const categories = [...document.querySelectorAll('.price-category')];
    const chips = [...document.querySelectorAll('.price-chip')];
    const items = [...document.querySelectorAll('.price-item')];

    const update = () => {
      const query = normalise(input.value);
      let visibleItems = 0;

      items.forEach((item) => {
        const matches = !query || item.dataset.search.includes(query);
        item.hidden = !matches;
        if (matches) visibleItems += 1;
      });

      document.querySelectorAll('.price-group').forEach((group) => {
        const hasItems = [...group.querySelectorAll('.price-item')].some((item) => !item.hidden);
        group.hidden = !hasItems;
        if (query && hasItems) group.open = true;
      });

      categories.forEach((category) => {
        category.hidden = ![...category.querySelectorAll('.price-group')].some((group) => !group.hidden);
      });

      clear.hidden = !query;
      empty.hidden = visibleItems !== 0;
      result.textContent = query
        ? `Найдено: ${visibleItems} ${plural(visibleItems)}`
        : `${items.length} ${plural(items.length)} в прайсе`;
    };

    input.addEventListener('input', update);
    clear.addEventListener('click', () => { input.value = ''; input.focus(); update(); });

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const target = document.getElementById(chip.dataset.target);
        if (!target) return;
        input.value = '';
        update();
        chips.forEach((button) => button.classList.toggle('is-active', button === chip));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    update();
  });
})();
