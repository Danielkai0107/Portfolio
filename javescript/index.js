const open = document.querySelector('.open-animation');
setTimeout(() => {
  open.style.display = 'none';
}, 4500);

const projectsBtn = document.querySelectorAll('.projectsBtn');
const aboutBtn = document.querySelectorAll('.aboutBtn');
const projectPage = document.querySelector('.bgc-wrapper-1');
const aboutPage = document.querySelector('.bgc-wrapper-2');
const artTop = document.querySelector('.projects-top');

projectsBtn.forEach((n) => {
  n.addEventListener('click', () => {
    aboutPage.classList.remove('ab');
    projectPage.classList.add('overflow');
    window.scrollTo(0, artTop.offsetTop);
  });
});

aboutBtn.forEach((n) => {
  n.addEventListener('click', () => {
    aboutPage.classList.add('ab');
    projectPage.classList.remove('overflow');
    window.scrollTo(0, 0);
  });
});
