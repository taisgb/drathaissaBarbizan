const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
window.matchMedia('(min-width:801px)').addEventListener('change',closeMenu);

/* Entrada progressiva: conteúdo permanece visível sem JS ou sem suporte. */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  const selectors = '.trust > div, .section-head, .care-grid > .care, .about-art, .about > div:last-child, .journey-grid > article, .clinic-info, .clinic-grid iframe, .social-wrap > div, .faq > div, .final-cta > .wrap';
  const elements = [...document.querySelectorAll(selectors)];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({target, isIntersecting}) => {
      if (!isIntersecting) return;
      target.classList.add('is-visible');
      observer.unobserve(target);
    });
  }, {threshold: 0, rootMargin: '0px 0px -20px 0px'});
  elements.forEach((element) => {
    if (element.matches('.journey-grid > article')) element.classList.add('journey-card');
    const siblings = Array.from(element.parentElement.children);
    element.style.setProperty('--reveal-delay', Math.min(siblings.indexOf(element) * 65, 195) + 'ms');
    element.classList.add('reveal-motion');
    observer.observe(element);
  });
  document.documentElement.classList.add('reveal-ready');
  reduced.addEventListener?.('change', (event) => {
    if (event.matches) {
      observer.disconnect();
      document.documentElement.classList.remove('reveal-ready');
      elements.forEach(element => element.classList.add('is-visible'));
    }
  });
})();
