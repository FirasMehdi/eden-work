const WHATSAPP = '21655394074';
const EMAIL = 'info.eden.work@gmail.com';

const setMenuState = (isOpen) => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');

  if (!menuToggle || !nav) return;

  nav.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('span').textContent = isOpen ? '×' : '＋';
};

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.contains('open');
  setMenuState(!isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    setMenuState(false);
  });
});

const planSelect = document.querySelector('#plan-select');

const updateSelectedPlan = (selectedPlan) => {
  if (!selectedPlan || !planSelect) return;
  planSelect.value = selectedPlan;

  document.querySelectorAll('.plan').forEach((plan) => {
    const isActive = plan.dataset.plan === selectedPlan;
    plan.classList.toggle('active', isActive);
  });
};

document.querySelectorAll('[data-plan]').forEach((button) => {
  button.addEventListener('click', () => {
    const selectedPlan = button.dataset.plan;
    updateSelectedPlan(selectedPlan);
  });
});

const form = document.querySelector('#request-form');
const status = document.querySelector('#form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get('name') ?? '').trim();
  const contact = String(data.get('contact') ?? '').trim();

  if (!name || !contact) return;

  const plan = String(data.get('plan') || 'Hot desk');
  const date = String(data.get('date') || 'À définir');
  const duration = String(data.get('duration') || 'À définir');
  const message = String(data.get('message') || 'Aucun message complémentaire.').trim();

  const body = [
    'Bonjour Éden Work,',
    '',
    `Je m'appelle ${name}.`,
    '',
    `Je suis intéressé(e) par : ${plan}`,
    `Date souhaitée : ${date}`,
    `Durée : ${duration}`,
    '',
    `Mon contact : ${contact}`,
    '',
    `Message : ${message}`,
    '',
    'Merci !',
  ].join('\n');

  const encodedBody = encodeURIComponent(body);

  window.open(`mailto:${EMAIL}?subject=${encodeURIComponent(`Demande Éden Work — ${plan}`)}&body=${encodedBody}`, '_blank');
  window.open(`https://wa.me/${WHATSAPP}?text=${encodedBody}`, '_blank');

  if (status) {
    status.textContent = 'Votre demande est prête dans vos applications email et WhatsApp.';
  }

  form.reset();
  updateSelectedPlan(plan);
});

document.querySelector('#year')?.replaceChildren(new Date().getFullYear().toString());
