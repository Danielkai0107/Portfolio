const open = document.querySelector('.open-animation');
setTimeout(() => {
  open.style.display = 'none';
}, 5000);

const projectsBtn = document.querySelectorAll('.projectsBtn');
const aboutBtn = document.querySelectorAll('.aboutBtn');
const projectPage = document.querySelector('.bgc-wrapper-1');
const aboutPage = document.querySelector('.bgc-wrapper-2');

projectsBtn.forEach((n) => {
  n.addEventListener('click', () => {
    aboutPage.classList.add('hidden');
    window.scrollTo(0, 0);
  });
});

aboutBtn.forEach((n) => {
  n.addEventListener('click', () => {
    aboutPage.classList.remove('hidden');
    window.scrollTo(0, 0);
  });
});
