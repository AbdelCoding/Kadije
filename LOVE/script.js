/* =======================
   ELEMENTS
======================= */
const revealBtn = document.getElementById("revealBtn");
const musicBtn  = document.getElementById("musicBtn");
const music     = document.getElementById("bgMusic");
const secretMessage = document.getElementById("secretMessage");
const counter   = document.getElementById("counter");
const herName   = document.getElementById("herName");
const myName    = document.getElementById("myName");
const profileImage = document.getElementById("profileImage");

/* =======================
   ETATS
======================= */
let index = 0;
let typingTimeout = null;
let isPaused = false;
let textFinished = false;

/* =======================
   COMPTEUR
======================= */
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

/* =======================
   COEURS
======================= */
let heartInterval = null;

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}

/* =======================
   MESSAGE (EXACT)
======================= */
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

— Ton Njibah 💫
`;

secretMessage.innerHTML = "";

/* =======================
   ECRITURE LENTE
======================= */
function showMessageSlowly() {
  if (isPaused) return;

  if (index < longMessage.length) {
    secretMessage.innerHTML += longMessage.charAt(index);
    index++;
    typingTimeout = setTimeout(showMessageSlowly, 90);
  } else if (!textFinished) {
    textFinished = true;
    startFireworks();
  }
}

/* =======================
   SLIDESHOW PHOTOS
======================= */
const photos = ["kd1.jpg", "kd5.jpg", "kd2.jpg", "kd4.jpg"];
let photoIndex = 0;
let photoInterval = null;

function startPhotoSlideshow() {
  photoInterval = setInterval(() => {
    profileImage.style.opacity = 0;
    setTimeout(() => {
      photoIndex = (photoIndex + 1) % photos.length;
      profileImage.src = photos[photoIndex];
      profileImage.style.opacity = 1;
    }, 1200);
  }, 5000);
}

function stopPhotoSlideshow() {
  clearInterval(photoInterval);
}

/* =======================
   FEUX D’ARTIFICE (CANVAS)
======================= */
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

let fireworksActive = false;
let fireworksPaused = false;
let fireworks = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height * 0.4;
    this.exploded = false;
    this.particles = [];
  }

  explode() {
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 4 + 1,
        life: 100
      });
    }
  }

  update() {
    if (!this.exploded) {
      this.y -= 4;
      if (this.y <= this.targetY) {
        this.exploded = true;
        this.explode();
      }
    } else {
      this.particles.forEach(p => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
      });
      this.particles = this.particles.filter(p => p.life > 0);
    }
  }

  draw() {
    if (!this.exploded) return;
    this.particles.forEach(p => {
      ctx.fillStyle = "rgba(255,182,193,0.8)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

function startFireworks() {
  fireworksActive = true;
  fireworksPaused = false;
  animateFireworks();
}

function animateFireworks() {
  if (!fireworksActive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!fireworksPaused && Math.random() < 0.05) {
    fireworks.push(new Firework());
  }

  fireworks.forEach(f => {
    f.update();
    f.draw();
  });

  fireworks = fireworks.filter(f => f.particles.length > 0 || !f.exploded);

  requestAnimationFrame(animateFireworks);
}

/* =======================
   LANCEMENT
======================= */
revealBtn.addEventListener("click", async () => {
  revealBtn.style.display = "none";
  musicBtn.classList.remove("hidden");

  await music.play();
  isPaused = false;

  heartInterval = setInterval(createHeart, 400);
  startPhotoSlideshow();
  showMessageSlowly();
});

/* =======================
   PLAY / PAUSE
======================= */
musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    isPaused = false;
    fireworksPaused = false;
    showMessageSlowly();
    startPhotoSlideshow();
    musicBtn.textContent = "⏸️ Pause musique";
  } else {
    music.pause();
    isPaused = true;
    fireworksPaused = true;
    clearTimeout(typingTimeout);
    stopPhotoSlideshow();
    musicBtn.textContent = "▶️ Jouer la musique";
  }
});
