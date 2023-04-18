/*슬라이드 배너*/
const slides = document.querySelector(".slides");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const dotsContainer = document.querySelector(".dots");

let currentSlide = 0;
const slideWidth = slides.children[0].offsetWidth;
const slideCount = slides.children.length;
const intervalDuration = 3000;
let intervalId = null;

function createDots() {
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dotsContainer.appendChild(dot);
    dot.addEventListener("click", () => moveToSlide(i));
  }

  dotsContainer.children[currentSlide].classList.add("active");
}

function updateDots() {
  dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function moveToSlide(slideIndex) {
  slides.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
  currentSlide = slideIndex;
  hidePrevButton();
  hideNextButton();
}

function hidePrevButton() {
  prevButton.style.display = currentSlide === 0 ? "none" : "block";
}

function hideNextButton() {
  nextButton.style.display = currentSlide === slideCount - 1 ? "none" : "block";
}

function startSlideShow() {
  intervalId = setInterval(() => {
    currentSlide = (currentSlide + 1) % slideCount;
    moveToSlide(currentSlide);
    updateDots();
  }, intervalDuration);
}

function stopSlideShow() {
  clearInterval(intervalId);
}

prevButton.addEventListener("click", () => {
  if (currentSlide === 0) return;
  moveToSlide(currentSlide - 1);
  updateDots();
});

nextButton.addEventListener("click", () => {
  if (currentSlide === slideCount - 1) return;
  moveToSlide(currentSlide + 1);
  updateDots();
});

createDots();
startSlideShow();