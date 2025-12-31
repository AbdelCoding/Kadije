/* ===== RÉFÉRENCES HTML ===== */
const revealBtn = document.getElementById("revealBtn");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");
const secretMessage = document.getElementById("secretMessage");
const counter = document.getElementById("counter");
const profileImage = document.getElementById("profileImage");
const herName = document.getElementById("herName");
const myName = document.getElementById("myName");

/* ===== VARIABLES ===== */
let index = 0;
let typingTimeout = null;
let isPaused = false;
let photoInterval = null;

/* ===== MESSAGE SECRET ===== */
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

/* ===== COMPTEUR D'AMOUR ===== */
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

/* ===== COEURS ANIMÉS ===== */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}

/* ===== SLIDESHOW DES PHOTOS ===== */
const photos = ["kd1.jpg","kd5.jpg","kd2.jpg","kd4.jpg"];
let photoIndex = 0;

function startPhotoSlideshow() {
  photoInterval = setInterval(() => {
    profileImage.style.opacity = 0;
    setTimeout(() => {
      photoIndex = (photoIndex + 1) % photos.length;
      profileImage.src = photos[photoIndex];
      profileImage.style.opacity = 1;
    }, 1500);
  }, 5000);
}

function stopPhotoSlideshow() {
  clearInterval(photoInterval);
}

/* ===== AFFICHAGE DU TEXTE EN DOUCEUR ===== */
secretMessage.style.padding = "20px"; // marge autour du texte
secretMessage.style.maxWidth = "90%";
secretMessage.style.margin = "20px auto";
secretMessage.style.lineHeight = "1.8";
secretMessage.style.fontSize = "1.2rem";

function showMessageSlowly() {
  if (index < longMessage.length && !isPaused) {
    secretMessage.innerHTML += longMessage.charAt(index);
    index++;
    typingTimeout = setTimeout(showMessageSlowly, 90);
  } else if (index >= longMessage.length) {
    // Lancer feux d'artifice
    setInterval(launchFirework, 600);
  }
}

/* ===== BOUTONS PLAY / PAUSE ===== */
revealBtn.addEventListener("click", async () => {
  revealBtn.style.display = "none";
  musicBtn.classList.remove("hidden");

  try { await music.play(); } catch(e){ console.log("Audio bloqué"); }

  showMessageSlowly();
  setInterval(createHeart, 400);
  startPhotoSlideshow();
});

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    isPaused = false;
    showMessageSlowly(); // reprend le texte
    startPhotoSlideshow();
    musicBtn.textContent = "⏸️ Pause musique";
  } else {
    music.pause();
    isPaused = true;
    clearTimeout(typingTimeout); // stop texte
    stopPhotoSlideshow();
    musicBtn.textContent = "▶️ Jouer la musique";
  }
});

/* ===== RESET EXPERIENCE ===== */
function resetExperience() {
  revealBtn.style.display = "inline-block";
  revealBtn.textContent = "Clique ici mon amour 💖";
  musicBtn.classList.add("hidden");
  secretMessage.innerHTML = "";
  index = 0;
  music.currentTime = 0;
  music.volume = 1;
  stopPhotoSlideshow();
}

music.addEventListener("ended", resetExperience);

/* ===== EFFETS SUR NOM ET PHOTO ===== */
music.addEventListener("play", () => { myName.classList.add("glowBlink"); herName.classList.add("kadigeGlow"); profileImage.classList.add("profileBlink"); });
music.addEventListener("pause", () => { myName.classList.remove("glowBlink"); herName.classList.remove("kadigeGlow"); profileImage.classList.remove("profileBlink"); });
music.addEventListener("ended", () => { myName.classList.remove("glowBlink"); herName.classList.remove("kadigeGlow"); profileImage.classList.remove("profileBlink"); });

/* ===== FEUX D'ARTIFICE PLEIN ÉCRAN ===== */
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let fireworks = [];

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = canvas.height;
    this.targetY = y;
    this.speed = 6 + Math.random() * 3;
    this.particles = [];
    this.exploded = false;
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.exploded = true;
        this.explode();
      }
    }
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => !p.dead);
  }

  explode() {
    const count = 50 + Math.floor(Math.random() * 30);
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.x, this.y));
    }
  }

  draw() { this.particles.forEach(p => p.draw()); }
}

class Particle {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.speed = 2 + Math.random() * 5;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = 2 + Math.random() * 3;
    this.color = `hsl(${Math.random()*360}, 80%, 60%)`;
    this.gravity = 0.05; this.alpha = 1; this.dead = false;
  }

  update() {
    this.x += Math.cos(this.angle)*this.speed;
    this.y += Math.sin(this.angle)*this.speed + this.gravity*this.speed;
    this.alpha -= 0.015;
    if(this.alpha<=0) this.dead=true;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

function launchFirework() {
  const x = Math.random()*canvas.width*0.8 + canvas.width*0.1;
  const y = Math.random()*canvas.height*0.5 + canvas.height*0.1;
  fireworks.push(new Firework(x,y));
}

function animateFireworks() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  fireworks.forEach(fw => { fw.update(); fw.draw(); });
  fireworks = fireworks.filter(fw => fw.particles.length>0);
  requestAnimationFrame(animateFireworks);
}

animateFireworks();
