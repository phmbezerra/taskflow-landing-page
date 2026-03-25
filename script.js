const counterElement = document.getElementById('counter');
const completedCount = document.getElementById('completed-count');
const productivity = document.getElementById('productivity');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

let counter = 0;
const target = 250;

function animateCounter() {
  const interval = setInterval(() => {
    counter += 5;
    counterElement.textContent = `${counter}+`;

    if (counter >= target) {
      counterElement.textContent = `${target}+`;
      clearInterval(interval);
    }
  }, 30);
}

window.addEventListener('load', () => {
  animateCounter();

  setTimeout(() => {
    completedCount.textContent = '18';
    productivity.textContent = '92%';
  }, 1200);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Preencha todos os campos.';
    return;
  }

  formStatus.textContent = `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`;
  form.reset();
});
