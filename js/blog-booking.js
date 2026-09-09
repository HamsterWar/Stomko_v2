(() => {
  const mount = document.getElementById('bookingMount');
  if (!mount) return;
  const root = document.body.dataset.root || '../';

  mount.innerHTML = `
    <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="wizTitle">
      <div class="modal-box">
        <button class="modal-close" data-close-modal aria-label="Закрыть окно">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div id="wizard">
          <div class="wiz-step-label">Шаг <span id="wizStepNum">1</span> из 5</div>
          <h3 id="wizTitle">Филиал</h3>
          <div class="wiz-progress" id="wizProgress"><span></span><span></span><span></span><span></span><span></span></div>
          <section class="wiz-pane" data-pane="1">
            <p class="wiz-hint">Выберите ближайший филиал.</p>
            <div class="opt-grid" data-group="branch">
              <button type="button" class="opt-card" data-value="м. Сокол"><span class="t">м. Сокол</span><small>Ленинградский проспект, 77, корп. 4</small><small>Пн–Пт 09:00–21:00 · Сб 09:00–18:00</small></button>
              <button type="button" class="opt-card" data-value="м. Беломорская"><span class="t">м. Беломорская</span><small>ул. Беломорская, 26</small><small>Пн–Пт 09:00–21:00 · Сб 09:00–18:00</small></button>
            </div>
          </section>
          <section class="wiz-pane" data-pane="2" hidden>
            <p class="wiz-hint">Какая услуга вас интересует?</p>
            <div class="opt-grid" data-group="service">
              <button type="button" class="opt-card" data-value="consult"><span class="t">Консультация</span><small>Осмотр и план лечения — бесплатно</small></button>
              <button type="button" class="opt-card" data-value="therapy"><span class="t">Лечение зубов</span><small>Кариес, пульпит, пломбирование</small></button>
              <button type="button" class="opt-card" data-value="implant"><span class="t">Имплантация</span><small>Импланты и коронки на импланты</small></button>
              <button type="button" class="opt-card" data-value="prosthetics"><span class="t">Протезирование</span><small>Керамика и съёмные протезы</small></button>
              <button type="button" class="opt-card" data-value="surgery"><span class="t">Хирургия</span><small>Удаление зубов любой сложности</small></button>
              <button type="button" class="opt-card" data-value="hygiene"><span class="t">Гигиена и отбеливание</span><small>Чистка, отбеливание, виниры</small></button>
              <button type="button" class="opt-card" data-value="diagnostics"><span class="t">Диагностика</span><small>Снимки и визиограф</small></button>
            </div>
          </section>
          <section class="wiz-pane" data-pane="3" hidden><p class="wiz-hint">Выберите врача — или оставьте «любой».</p><div class="opt-grid" data-group="doctor" id="doctorOptions"></div></section>
          <section class="wiz-pane" data-pane="4" hidden>
            <p class="wiz-hint">Выберите удобный день. Воскресенье — выходной.</p>
            <div class="cal"><div class="cal-head"><button type="button" class="cal-nav" id="calPrev" aria-label="Предыдущий месяц">←</button><strong id="calTitle"></strong><button type="button" class="cal-nav" id="calNext" aria-label="Следующий месяц">→</button></div><div class="cal-grid" id="calGrid"></div></div>
          </section>
          <section class="wiz-pane" data-pane="5" hidden>
            <p class="wiz-hint">Проверьте детали записи и оставьте контакты.</p>
            <div class="wiz-summary" id="wizSummary"></div>
            <div class="wiz-fields"><label for="fName">Ваше имя<input id="fName" name="name" type="text" placeholder="Как к вам обращаться" required autocomplete="name"></label><label for="fPhone">Телефон<input id="fPhone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" required autocomplete="tel"></label></div>
            <label class="consent-check" for="fConsent"><input id="fConsent" name="consent" type="checkbox" required><span>Оставляя заявку на сайте, я подтверждаю, что ознакомлен(а) с <a href="${root}politika-konfidencial-nosti/" target="_blank" rel="noopener">Соглашением об обработке персональных данных на интернет-сайте</a>.</span></label>
          </section>
          <div class="wiz-footer"><button type="button" class="btn btn-back" id="wizBack"><span>Назад</span></button><button type="button" class="btn btn-primary" id="wizNext"><span id="wizNextText">Далее</span><span aria-hidden="true">→</span></button></div>
          <div class="modal-phone-section" aria-label="Телефоны филиалов">
            <p class="modal-phone-title">Или позвоните в клинику</p>
            <div class="modal-branch-phones">
              <div class="modal-phone-card"><strong>м. Сокол</strong><span class="phone-kind">Основной мобильный</span><a class="primary-phone" href="tel:+79260749710">+7 (926) 074-97-10</a><span class="phone-kind">Дополнительные</span><a href="tel:+74954519710">8 (495) 451-97-10</a><a href="tel:+74991588471">8 (499) 158-84-71</a></div>
              <div class="modal-phone-card"><strong>м. Беломорская</strong><span class="phone-kind">Основной мобильный</span><a class="primary-phone" href="tel:+79162040200">+7 (916) 204-02-00</a><span class="phone-kind">Дополнительный</span><a href="tel:+74954518238">8 (495) 451-82-38</a></div>
            </div>
          </div>
        </div>
        <div class="form-ok" id="formOk"><h4>Заявка отправлена!</h4><p id="okSummary">Мы свяжемся с вами в часы работы клиники.</p></div>
      </div>
    </div>`;
})();
