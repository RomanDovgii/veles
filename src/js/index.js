const menuButton = document.querySelector('.header__button');
const navigation = document.querySelector('.header__navigation');
const wrapper = document.querySelector('.header__wrapper');
const openSvg = document.querySelector('.header__open');
const closeSvg = document.querySelector('.header__close');
const body = document.querySelector('body');

const stopScroll = () => {
  window.scrollTo(0,0);
};

const handleMenuButtonClick = () => {
  navigation.classList.toggle('header__navigation--open');
  wrapper.classList.toggle('header__wrapper--menu-open');
  openSvg.classList.toggle('header__open--hidden');
  closeSvg.classList.toggle('header__close--hidden');

  if (closeSvg.classList.contains('header__close--hidden')) {
    body.style.overflow = 'visible';
  } else {
    body.style.overflow = 'hidden';
  }
}

const handleResize = () => {
  const width = document.documentElement.clientWidth;

  if ((width >= 1160) && !(closeSvg.classList.contains('header__close--hidden'))) {
    body.style.overflow = 'visible';
    navigation.classList.toggle('header__navigation--open');
    wrapper.classList.toggle('header__wrapper--menu-open');
    openSvg.classList.toggle('header__open--hidden');
    closeSvg.classList.toggle('header__close--hidden');
  }
}

menuButton.addEventListener('click', handleMenuButtonClick);
window.addEventListener('resize', handleResize, {passive: true});
