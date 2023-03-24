// Import jQuery
import $ from "jquery";

// Define a type for the target element
type TargetElement = HTMLElement | null;

// Define the smoothScroll function
function smoothScroll(target: TargetElement, duration: number): void {
  const targetElement = target as HTMLElement;
  const targetPosition = targetElement.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number): void {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Add an event listener for the "Back to Top" button
const backToTopButton = document.querySelector("#back-to-top");
if (backToTopButton) {
  backToTopButton.addEventListener("click", function () {
    smoothScroll(document.querySelector("#header"), 1000);
  });
}

// Add an event listener for internal links
$('a[href^="#"]').on('click', function (event) {
  const target = $(this.getAttribute('href'));
  if (target.length) {
    event.preventDefault();
    smoothScroll(target[0], 1000);
  }
});
