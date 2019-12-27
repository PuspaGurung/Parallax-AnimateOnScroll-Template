////////////////////////// ANIMATION ELEMENTS ON SCROLL //////////////////////////
// Browser support for to requestAnimationFrame method
let requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.emRequestAnimationFrame ||
  // for IE support
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  };
let showOnScroll = document.querySelectorAll('.visible-on-scroll');

function loopOnScroll() {
  // showOnScroll.forEach(e => {
  //   (isElementViewPort(e)) ? e.classList.add('visible'): e.classList.remove('visible');
  // })

  for (let i = 0; i < showOnScroll.length; i++) {
    (isElementViewPort(showOnScroll[i])) ? showOnScroll[i].classList.add('visible'): showOnScroll[i].classList.remove('visible');
  }
  requestAnimationFrame(loopOnScroll);
}
loopOnScroll();

function isElementViewPort(e) {
  //Get the size (height, and width (x)) of an element and its position relative to the viewport :Y
  let rec = e.getBoundingClientRect();
  return (
    (rec.top <= 0 && rec.bottom >= 0) ||
    (rec.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rec.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
    (rec.top >= 0 && rec.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
};