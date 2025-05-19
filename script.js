let lastScrollTop = 0;
const header = document.querySelector('.header');
const words = ["DEVELOPER", "PROBLEM SOLVER", "DESIGNER", "CODER", "CREATOR"];
let currentWordIndex = 0;
const rotatingWord = document.getElementById("rotating-word");
const themeToggle = document.getElementById("theme-icon");
const body = document.body;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  header.classList.toggle('hide', currentScroll > lastScrollTop);
  header.classList.toggle('show', currentScroll <= lastScrollTop);
  lastScrollTop = Math.max(currentScroll, 0);
});

setInterval(() => {
  rotatingWord.classList.add("fade-out");
  setTimeout(() => {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    rotatingWord.textContent = words[currentWordIndex];
    rotatingWord.classList.remove("fade-out");
  }, 500);
}, 2000);

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.classList.replace("bx-moon", "bx-sun");
}

themeToggle.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark-mode");
  themeToggle.classList.replace(isDark ? "bx-moon" : "bx-sun", isDark ? "bx-sun" : "bx-moon");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

const isInViewport = el => {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom >= 0;
};

const animateSkillBars = () => {
  document.querySelectorAll('.skill-bar .bar').forEach(bar => {
    if (isInViewport(bar)) {
      bar.querySelectorAll('.python, .html, .css, .javascript').forEach(skill => skill.classList.add('animate'));
    }
  });
};

const checkResBox = () => {
  const resBox = document.querySelector('.res-box');
  if (resBox && isInViewport(resBox)) {
    resBox.classList.add('fade-in');
    window.removeEventListener('scroll', checkResBox);
  }
};

const checkFadeIn = () => {
  const sendBtn = document.querySelector('.contact-form form .send');
  if (sendBtn && isInViewport(sendBtn)) {
    sendBtn.classList.add('fade-in');
    window.removeEventListener('scroll', checkFadeIn);
  }
};

window.addEventListener('scroll', () => {
  animateSkillBars();
  checkResBox();
  checkFadeIn();
});
window.addEventListener('load', () => {
  animateSkillBars();
  checkResBox();
  checkFadeIn();
});
