const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

const counterElement = document.getElementById("counter");
const completedCount = document.getElementById("completed-count");
const productivity = document.getElementById("productivity");
const progressFill = document.getElementById("progress-fill");
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");
const revealElements = document.querySelectorAll(".reveal");
const sectionLinks = document.querySelectorAll(".nav-links a");

let counter = 0;
const target = 250;
let counterAnimated = false;

function applyTheme(theme) {
  html.setAttribute("data-theme", theme);
  if (themeIcon) {
    themeIcon.textContent = theme === "light" ? "☀️" : "🌙";
  }
  localStorage.setItem("taskflow-theme", theme);
}

const savedTheme = localStorage.getItem("taskflow-theme");
applyTheme(savedTheme || "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

function animateCounter() {
  if (counterAnimated || !counterElement) return;
  counterAnimated = true;

  const interval = setInterval(() => {
    counter += 5;
    counterElement.textContent = `${counter}+`;

    if (counter >= target) {
      counterElement.textContent = `${target}+`;
      clearInterval(interval);
    }
  }, 28);
}

function animateDashboard() {
  if (completedCount) completedCount.textContent = "18";
  if (productivity) productivity.textContent = "92%";
  if (progressFill) progressFill.style.width = "92%";
}

window.addEventListener("load", () => {
  setTimeout(() => {
    animateDashboard();
  }, 800);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        if (entry.target.id === "sobre" || entry.target.closest("#sobre")) {
          animateCounter();
        }
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => observer.observe(element));

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Preencha todos os campos antes de enviar.";
      formStatus.style.color = "#fca5a5";
      return;
    }

    if (!isValidEmail(email)) {
      formStatus.textContent = "Digite um e-mail válido.";
      formStatus.style.color = "#fca5a5";
      return;
    }

    if (message.length < 10) {
      formStatus.textContent = "Sua mensagem deve ter pelo menos 10 caracteres.";
      formStatus.style.color = "#fca5a5";
      return;
    }

    formStatus.textContent = `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`;
    formStatus.style.color = "#86efac";
    form.reset();
  });
}

const sections = [...document.querySelectorAll("main section")];

function updateActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    if (!id) return;

    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      sectionLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();
