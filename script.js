(() => {
  'use strict';
  const PHONE_1 = '2250789923066';
  const PHONE_2 = '2250759278478';
  const EMAIL = 'Babiboost@zohomail.com';
  const video = document.getElementById('background-video');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const whatsappToggle = document.getElementById('whatsapp-toggle');
  const whatsappOptions = document.getElementById('whatsapp-options');
  const quoteForm = document.getElementById('quote-form');
  const formStatus = document.getElementById('form-status');
  const serviceSelect = document.getElementById('service-select');
  const messageField = document.getElementById('client-message');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  let staticMode = reducedMotion.matches || Boolean(connection && connection.saveData);

  document.getElementById('year').textContent = new Date().getFullYear();

  function applyMotionPreference() {
    staticMode = reducedMotion.matches || Boolean(connection && connection.saveData);
    document.body.classList.toggle('static-background', staticMode);
    if (staticMode) {
      video.pause();
      video.removeAttribute('autoplay');
    } else {
      video.setAttribute('autoplay', '');
      const playResult = video.play();
      if (playResult && typeof playResult.catch === 'function') playResult.catch(() => {});
    }
  }
  video.addEventListener('error', () => {
    staticMode = true;
    document.body.classList.add('static-background');
  });
  if (typeof reducedMotion.addEventListener === 'function') reducedMotion.addEventListener('change', applyMotionPreference);
  if (connection && typeof connection.addEventListener === 'function') connection.addEventListener('change', applyMotionPreference);
  applyMotionPreference();

  function closeMenu() {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('.sr-only').textContent = 'Ouvrir le menu';
    document.body.classList.remove('menu-open');
  }
  menuToggle.addEventListener('click', () => {
    const opening = !nav.classList.contains('open');
    nav.classList.toggle('open', opening);
    menuToggle.setAttribute('aria-expanded', String(opening));
    menuToggle.querySelector('.sr-only').textContent = opening ? 'Fermer le menu' : 'Ouvrir le menu';
    document.body.classList.toggle('menu-open', opening);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); closeWhatsApp(); } });

  function closeWhatsApp() {
    whatsappOptions.hidden = true;
    whatsappToggle.setAttribute('aria-expanded', 'false');
  }
  whatsappToggle.addEventListener('click', () => {
    const open = whatsappOptions.hidden;
    whatsappOptions.hidden = !open;
    whatsappToggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.whatsapp-float')) closeWhatsApp();
  });

  const serviceMap = {
    'Création de site e-commerce': 'Site e-commerce',
    'Création d’affiches et de visuels': 'Affiches et visuels',
    'Pack portfolio + CV + lettre de motivation': 'Pack portfolio + CV + lettre de motivation',
    'Création de site vitrine': 'Site vitrine',
    'Accompagnement à la présence digitale d’une PME': 'Présence digitale des PME',
    'Création d’un tableau de bord de gestion': 'Tableau de bord de gestion',
    'Projet personnalisé': 'Autre projet'
  };
  document.querySelectorAll('[data-quote]').forEach(link => {
    link.addEventListener('click', () => {
      const quote = link.getAttribute('data-quote');
      const option = serviceMap[quote] || (quote === 'Demande générale' ? '' : quote);
      if (option) {
        const match = Array.from(serviceSelect.options).find(item => item.textContent.trim() === option);
        if (match) serviceSelect.value = match.value;
      }
      if (!messageField.value.trim() && quote && quote !== 'Demande générale') messageField.value = `Bonjour BabiBoost Digital, je souhaite discuter de : ${quote}. Pouvez-vous m’indiquer les informations nécessaires pour établir un devis ?`;
    });
  });

  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const data = new FormData(quoteForm);
    const name = String(data.get('name') || '').trim();
    const company = String(data.get('company') || '').trim();
    const contact = String(data.get('contact') || '').trim();
    const service = String(data.get('service') || '').trim();
    const message = String(data.get('message') || '').trim();
    const body = [
      'Bonjour BabiBoost Digital, je souhaite demander un devis.',
      '',
      `Nom : ${name}`,
      company ? `Entreprise : ${company}` : '',
      `Téléphone ou e-mail : ${contact}`,
      `Service recherché : ${service}`,
      '',
      'Détails du projet :',
      message
    ].filter(Boolean).join('\n');
    const encoded = encodeURIComponent(body);
    const first = `https://wa.me/${PHONE_1}?text=${encoded}`;
    const second = `https://wa.me/${PHONE_2}?text=${encoded}`;
    formStatus.textContent = 'Choisissez le contact à qui envoyer votre demande. Votre message est prérempli et restera à vérifier avant envoi.';
    whatsappOptions.innerHTML = `<p>Envoyer la demande à…</p><a href="${first}" target="_blank" rel="noopener noreferrer">+225 07 89 92 30 66 <span>↗</span></a><a href="${second}" target="_blank" rel="noopener noreferrer">+225 07 59 27 84 78 <span>↗</span></a><a href="mailto:${EMAIL}?subject=${encodeURIComponent('Demande de devis — BabiBoost Digital')}&body=${encoded}">Envoyer par e-mail <span>↗</span></a>`;
    whatsappOptions.hidden = false;
    whatsappToggle.setAttribute('aria-expanded', 'true');
    whatsappOptions.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'nearest' });
  });
})();
