const revealBtn = document.getElementById("revealBtn");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");
const secretMessage = document.getElementById("secretMessage");
const counter = document.getElementById("counter");
const profileImage = document.getElementById("profileImage");
const herName = document.getElementById("herName");
const myName = document.getElementById("myName");

let typingTimeout = null;
let isPaused = false;
let index = 0;

/* ⏳ COMPTEUR */
const startDate = new Date("2024-02-14");

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);

  counter.innerHTML = `💖 ${days} jours ${hours}h ${minutes}min d'amour`;
}
setInterval(updateCounter, 1000);
updateCounter();

/* 💖 CŒURS */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}

/* 💌 TEXTE EXACT (INCHANGÉ) */
const longMessage = `
Kadige…

Il y a des personnes qui passent dans une vie,
et il y a celles qui deviennent la vie elle-même.

Depuis que tu es entrée dans mon monde,
tout a changé sans que je m’en rende compte.
Les jours ont pris des couleurs,
les nuits ont pris du sens,
et mon cœur a enfin compris pourquoi il battait.

Quand je pense à toi,
ce n’est pas seulement à ton sourire,
mais à la paix que tu m’apportes,
à la douceur de ta voix,
à la force que tu me donnes.

Tu es cette lumière discrète
qui éclaire mes moments sombres,
cette chaleur qui me rassure
quand le monde devient trop lourd.

Kadige, je te choisis.
Aujourd’hui. Demain.
Pour la vie.

— Ton  Njibah 💫
`;

secretMessage.innerHTML = "";

/* ✍️ ÉCRITURE LENTE (PAUSE SAFE) */
function showMessageSlowly() {
  if (index < longMessage.length && !isPaused) {
    secretMessage.innerHTML += longMessage.charAt(index);
    index++;
    typingTimeout = setTimeout(showMessageSlowly, 90);
  }
}

/* 🖼️ SLIDESHOW */
const photos = ["kd1.jpg", "kd5.jpg", "kd2.jpg", "kd4.jpg"];
let photoIndex = 0;
let photoInterval = null;

function startPhotoSlideshow() {
  if (photoInterval) return;

  photoInterval = setInterval(() => {
    if (isPaused) return;

    profileImage.style.opacity = 0;
    setTimeout(() => {
      photoIndex = (photoIndex + 1) % photos.length;
      profileImage.src = photos[photoIndex];
      profileImage.style.opacity = 1;
    }, 800);
  }, 4000);
}

function stopPhotoSlideshow() {
  clearInterval(photoInterval);
  photoInterval = null;
}

/* ▶️ LANCEMENT */
revealBtn.addEventListener("click", () => {
  revealBtn.style.display = "none";
  musicBtn.classList.remove("hidden");

  music.play();
  isPaused = false;

  showMessageSlowly();
  startPhotoSlideshow();
  setInterval(createHeart, 400);
});

/* ⏸️ PLAY / PAUSE TOTAL */
musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    isPaused = false;
    showMessageSlowly();
    startPhotoSlideshow();
    musicBtn.textContent = "⏸️ Pause musique";
  } else {
    music.pause();
    isPaused = true;
    clearTimeout(typingTimeout);
    stopPhotoSlideshow();
    musicBtn.textContent = "▶️ Jouer la musique";
  }
});

/* ✨ ANIMATIONS LIÉES À LA MUSIQUE */
music.addEventListener("play", () => {
  herName.classList.add("kadigeGlow");
  myName.classList.add("glowBlink");
  profileImage.classList.add("profileBlink");
});

music.addEventListener("pause", () => {
  herName.classList.remove("kadigeGlow");
  myName.classList.remove("glowBlink");
  profileImage.classList.remove("profileBlink");
});

music.addEventListener("ended", () => {
  herName.classList.remove("kadigeGlow");
  myName.classList.remove("glowBlink");
  profileImage.classList.remove("profileBlink");
});
