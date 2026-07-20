"use strict";

const intro = document.getElementById("intro");
const openButton = document.getElementById("openButton");
const birthdayCard = document.getElementById("birthdayCard");

const wishButtons = document.querySelectorAll(".wish-button");

const wishModal = document.getElementById("wishModal");
const wishModalIcon = document.getElementById("wishModalIcon");
const wishModalTitle = document.getElementById("wishModalTitle");
const wishModalText = document.getElementById("wishModalText");

const closeModalButton = document.getElementById("closeModalButton");
const modalOkButton = document.getElementById("modalOkButton");
const modalBackdrop = document.getElementById("modalBackdrop");

const particlesContainer = document.getElementById("particles");
const fallingElementsContainer =
  document.getElementById("fallingElements");

const fallingSymbols = [
  {
    symbol: "🎈",
    type: "balloon",
    minSize: 25,
    maxSize: 36
  },
  {
    symbol: "🎉",
    type: "small",
    minSize: 17,
    maxSize: 24
  },
  {
    symbol: "✨",
    type: "small",
    minSize: 15,
    maxSize: 22
  },
  {
    symbol: "🎊",
    type: "small",
    minSize: 17,
    maxSize: 24
  },
  {
    symbol: "🌸",
    type: "small",
    minSize: 15,
    maxSize: 21
  },
  {
    symbol: "✦",
    type: "small",
    minSize: 14,
    maxSize: 20
  }
];
let lastFocusedElement = null;

/**
 * Открывает основную открытку.
 */
function openBirthdayCard() {
  intro.classList.add("is-closing");

  createParticles(
    window.innerWidth / 2,
    window.innerHeight / 2,
    ["✨", "🌸", "✦", "🤍"],
    18
  );

  window.setTimeout(() => {
    intro.classList.add("hidden");
    birthdayCard.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, 500);
}

/**
 * Открывает всплывающее пожелание.
 *
 * @param {HTMLButtonElement} button
 */
function openWish(button) {
  const title = button.dataset.title;
  const message = button.dataset.message;
  const icon = button.textContent.trim();

  lastFocusedElement = button;

  wishModalIcon.textContent = icon;
  wishModalTitle.textContent = title;
  wishModalText.textContent = message;

  wishModal.classList.remove("hidden");
  document.body.classList.add("modal-open");

  button.classList.add("is-opened");

  const buttonRect = button.getBoundingClientRect();

  createParticles(
    buttonRect.left + buttonRect.width / 2,
    buttonRect.top + buttonRect.height / 2,
    [icon, "✨", "✦"],
    10
  );

  window.setTimeout(() => {
    closeModalButton.focus();
  }, 50);
}

/**
 * Закрывает всплывающее пожелание.
 */
function closeWish() {
  wishModal.classList.add("hidden");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

/**
 * Создаёт короткую анимацию из эмодзи.
 *
 * @param {number} startX
 * @param {number} startY
 * @param {string[]} symbols
 * @param {number} amount
 */
function createParticles(startX, startY, symbols, amount = 12) {
  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement("span");

    const angle = Math.random() * Math.PI * 2;
    const distance = 55 + Math.random() * 110;

    const destinationX = Math.cos(angle) * distance;
    const destinationY = Math.sin(angle) * distance;

    const rotation = Math.round(Math.random() * 240 - 120);
    const size = 13 + Math.random() * 13;

    particle.className = "particle";
    particle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.fontSize = `${size}px`;

    particle.style.setProperty(
      "--particle-x",
      `${destinationX}px`
    );

    particle.style.setProperty(
      "--particle-y",
      `${destinationY}px`
    );

    particle.style.setProperty(
      "--particle-rotate",
      `${rotation}deg`
    );

    particlesContainer.appendChild(particle);

    particle.addEventListener(
      "animationend",
      () => {
        particle.remove();
      },
      { once: true }
    );
  }
}

/**
 * Закрытие модального окна клавишей Escape.
 *
 * @param {KeyboardEvent} event
 */
function handleEscape(event) {
  if (
    event.key === "Escape" &&
    !wishModal.classList.contains("hidden")
  ) {
    closeWish();
  }
}
/**
 * Создаёт один медленно падающий фоновый элемент.
 */
function createFallingElement() {
  if (!fallingElementsContainer) {
    return;
  }

  const selected =
    fallingSymbols[
      Math.floor(Math.random() * fallingSymbols.length)
    ];

  const element = document.createElement("span");

  const horizontalPosition = Math.random() * 96;
  const duration = 10 + Math.random() * 7;
  const delay = Math.random() * 1.5;

  const size =
    selected.minSize +
    Math.random() * (selected.maxSize - selected.minSize);

  const scale = 0.8 + Math.random() * 0.45;
  const opacity = 0.35 + Math.random() * 0.28;

  const swayOne = Math.round(Math.random() * 80 - 40);
  const swayTwo = Math.round(Math.random() * 130 - 65);

  const startRotation = Math.round(Math.random() * 30 - 15);
  const middleRotation = Math.round(Math.random() * 90 - 45);
  const endRotation = Math.round(Math.random() * 180 - 90);

  element.className =
    `falling-element falling-element--${selected.type}`;

  element.textContent = selected.symbol;

  element.style.left = `${horizontalPosition}%`;
  element.style.fontSize = `${size}px`;
  element.style.animationDuration = `${duration}s`;
  element.style.animationDelay = `${delay}s`;

  element.style.setProperty(
    "--element-scale",
    scale.toFixed(2)
  );

  element.style.setProperty(
    "--element-opacity",
    opacity.toFixed(2)
  );

  element.style.setProperty(
    "--sway-one",
    `${swayOne}px`
  );

  element.style.setProperty(
    "--sway-two",
    `${swayTwo}px`
  );

  element.style.setProperty(
    "--start-rotation",
    `${startRotation}deg`
  );

  element.style.setProperty(
    "--middle-rotation",
    `${middleRotation}deg`
  );

  element.style.setProperty(
    "--end-rotation",
    `${endRotation}deg`
  );

  fallingElementsContainer.appendChild(element);

  element.addEventListener(
    "animationend",
    () => {
      element.remove();
    },
    { once: true }
  );
}

/**
 * Запускает спокойную фоновую анимацию.
 */
function startFallingElements() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    return;
  }

  // Несколько элементов уже присутствуют при загрузке страницы.
  for (let index = 0; index < 5; index += 1) {
    window.setTimeout(() => {
      createFallingElement();
    }, index * 700);
  }

  // Затем новые элементы появляются постепенно.
  window.setInterval(() => {
    const currentElements =
      fallingElementsContainer.childElementCount;

    // Не позволяем фону становиться слишком загруженным.
    if (currentElements < 9) {
      createFallingElement();
    }
  }, 1900);
}
openButton.addEventListener("click", openBirthdayCard);

wishButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openWish(button);
  });
});

closeModalButton.addEventListener("click", closeWish);
modalOkButton.addEventListener("click", closeWish);
modalBackdrop.addEventListener("click", closeWish);

document.addEventListener("keydown", handleEscape);
startFallingElements();