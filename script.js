'use strict';
const languageButton = document.querySelector('#language');
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#navigation');
let currentLanguage = 'es';
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', currentLanguage === 'es' ? 'Abrir menú' : 'Open menu');
}
languageButton.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-es][data-en]').forEach(element => {
    // Both translations are static, developer-authored strings, never user input.
    element.innerHTML = element.dataset[currentLanguage];
  });
  languageButton.innerHTML = `${currentLanguage === 'es' ? 'EN' : 'ES'} <span aria-hidden="true">↗</span>`;
  languageButton.setAttribute('aria-label', currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a español');
  navigation.setAttribute('aria-label', currentLanguage === 'es' ? 'Principal' : 'Main navigation');
  document.querySelector('.art').setAttribute('aria-label', currentLanguage === 'es' ? 'Ilustración abstracta original de un jardín con sol, arco y plantas' : 'Original abstract garden illustration with sun, arch and plants');
  document.querySelector('.header .brand').setAttribute('aria-label', currentLanguage === 'es' ? 'Casa Brote, inicio' : 'Casa Brote, home');
  document.title = currentLanguage === 'es' ? 'Casa Brote · Demo de portafolio' : 'Casa Brote · Portfolio demo';
  closeMenu();
});
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', currentLanguage === 'es' ? (isOpen ? 'Cerrar menú' : 'Abrir menú') : (isOpen ? 'Close menu' : 'Open menu'));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
