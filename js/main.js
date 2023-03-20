$(document).ready(function() {
  $('.header-image img').animate({
    opacity: 0.25,
  }, 0).animate({
    opacity: 1,
  }, 2000);


  // Smooth scrolling for internal links
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });
});

// Smooth Scrolling
function smoothScroll(target, duration) {
var target = document.querySelector(target);
var targetPosition = target.getBoundingClientRect().top;
var startPosition = window.pageYOffset;
var distance = targetPosition - startPosition;
var startTime = null;

function animation(currentTime) {
  if (startTime === null) startTime = currentTime;
  var timeElapsed = currentTime - startTime;
  var run = ease(timeElapsed, startPosition, distance, duration);
  window.scrollTo(0, run);
  if (timeElapsed < duration) requestAnimationFrame(animation);
}

function ease(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

requestAnimationFrame(animation);
}

// Smooth scrolling for "Back to Top" button
var backToTopButton = document.querySelector("#back-to-top");

if (backToTopButton) {
backToTopButton.addEventListener("click", function() {
  smoothScroll("#header", 1000);
});
}
