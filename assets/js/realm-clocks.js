(() => {
  'use strict';
  const strip = document.querySelector('.contact-strip');
  if (!strip) return;
  const regions = [
    {id:'eu', label:'EU · Central Europe', zone:'Europe/Paris'},
    {id:'us', label:'US · Pacific', zone:'America/Los_Angeles'},
    {id:'cn', label:'China · Beijing', zone:'Asia/Shanghai'},
    {id:'kr', label:'Korea · Seoul', zone:'Asia/Seoul'},
    {id:'tw', label:'Taiwan · Taipei', zone:'Asia/Taipei'},
    {id:'oc', label:'Oceania · Sydney', zone:'Australia/Sydney'}
  ];
  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>';
  strip.insertAdjacentHTML('afterbegin', `<div class="realm-clocks" role="group" aria-label="Live regional clocks">${regions.map(region=>`<div class="realm-clock" id="realm-${region.id}" title="${region.label} regional reference time; individual realm times may differ"><span class="realm-clock-label">${icon}${region.label}</span><time class="realm-clock-time" aria-label="${region.label} current time" aria-live="off">--:--:--</time><span class="realm-clock-meta"></span></div>`).join('')}</div>`);
  const clocks = regions.map(region => ({
    element:document.querySelector(`#realm-${region.id}`),
    time:new Intl.DateTimeFormat('en-GB',{timeZone:region.zone,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}),
    date:new Intl.DateTimeFormat('en-GB',{timeZone:region.zone,day:'2-digit',month:'short',timeZoneName:'short'})
  }));
  function tick() {
    const now = new Date();
    clocks.forEach(clock => {
      const time = clock.element.querySelector('time');
      const meta = clock.element.querySelector('.realm-clock-meta');
      time.textContent = clock.time.format(now);
      time.dateTime = now.toISOString();
      meta.textContent = clock.date.format(now);
    });
  }
  tick();
  // Recalculate from the current instant to avoid drift after a suspended tab.
  setInterval(tick,1000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});
})();
