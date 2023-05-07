let activeIndex = 0;

const groups = document.getElementsByClassName("card-group");

const handleLoveClick = () => {
  const nextIndex = activeIndex + 1 <= groups.length - 1 ? activeIndex + 1 : 0;
  
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);
        
  currentGroup.dataset.status = "after";
  
  nextGroup.dataset.status = "becoming-active-from-before";
  
  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  });
}

const handleHateClick = () => {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : groups.length - 1;
  
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);
  
  currentGroup.dataset.status = "before";
  
  nextGroup.dataset.status = "becoming-active-from-after";
  
  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  });
}




$(document).ready(function() {
  $('.header-image img').animate({
    opacity: 0.65,
  }, 0).animate({
    opacity: 1,
  }, 1500);


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

const cards = document.getElementById("cards");

if (cards) {
  cards.addEventListener("mouseover", function() {
    let intervalId = setInterval(function() {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let rgb = `rgb(${r},${g},${b})`;
      document.body.style.cursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='6' fill='${rgb}'/%3E%3C/svg%3E"),none`;
    }, 100);
    cards.addEventListener("mouseout", function() {
      clearInterval(intervalId);
      document.body.style.cursor = "default";
    });
  });
}

  const darkModeToggle = document.getElementById("darkModeToggle");
  const html = document.documentElement;

  // Check if dark mode preference is saved in localStorage
  if (localStorage.getItem("darkMode") === "true") {
    html.setAttribute("data-theme", "dark");
    darkModeToggle.checked = true;
  } else {
    html.removeAttribute("data-theme");
    darkModeToggle.checked = false;
  }

  darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("darkMode", "true");
    } else {
      html.removeAttribute("data-theme");
      localStorage.setItem("darkMode", "false");
    }
  });








