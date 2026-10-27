"use strict";

// Native page scroll contributes 100%; the image adds another 20% upward.
const hero = document.querySelector(".hero");
const image = hero.querySelector(".hero__image");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const extraSpeed = Number(hero.dataset.parallaxSpeed) - 1;
let frame = null;
let heroTop = 0;
let heroHeight = 0;

function renderParallax() {
  frame = null;
  const distance = Math.min(Math.max(window.scrollY - heroTop, 0), heroHeight);
  const offset = motionPreference.matches ? 0 : -distance * extraSpeed;
  image.style.transform = `translate3d(0, ${offset}px, 0)`;
}

function queueRender() {
  if (frame === null) frame = window.requestAnimationFrame(renderParallax);
}

function measureHero() {
  heroTop = hero.getBoundingClientRect().top + window.scrollY;
  heroHeight = hero.offsetHeight;
  queueRender();
}

window.addEventListener("scroll", queueRender, { passive: true });
window.addEventListener("resize", measureHero, { passive: true });
window.addEventListener("pageshow", measureHero);
motionPreference.addEventListener("change", queueRender);
measureHero();
