const revealBtn = document.getElementById("revealBtn");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");
const secretMessage = document.getElementById("secretMessage");
const counter = document.getElementById("counter");
let typingTimeout = null;
let isPaused = false;

/* ⏳ Compteur */
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

/* 💖 Cœurs */
function createHeart() {
  const heart = document.createElement("div");
//   heart.innerHTML = "🤍";
// heart.style.opacity = "0.6";

  heart.className = "heart";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}



/* 💌 Message long */
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


let index = 0;
secretMessage.innerHTML = "";

function showMessageSlowly() {
  if (index < longMessage.length) {
    secretMessage.innerHTML += longMessage.charAt(index);
    index++;
    setTimeout(showMessageSlowly, 100);
  }
}

/* ▶️ Lancement principal */
musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    isPaused = false;
    showMessageSlowly(); // reprend l'écriture
    musicBtn.textContent = "⏸️ Pause musique";
  } else {
    music.pause();
    isPaused = true;
    clearTimeout(typingTimeout); // stop immédiat
    musicBtn.textContent = "▶️ Jouer la musique";
  }
});


function showMessageSlowly() {
  if (index < longMessage.length && !isPaused) {
    secretMessage.innerHTML += longMessage.charAt(index);
    index++;

    typingTimeout = setTimeout(showMessageSlowly, 90);
  }
}







function fadeOutMusic(duration = 8000) {
  const step = music.volume / (duration / 100);
  const fade = setInterval(() => {
    if (music.volume > step) {
      music.volume -= step;
    } else {
      music.volume = 0;
      music.pause();
      clearInterval(fade);
    }
  }, 100);
}


// recliquer sur le bouton
music.addEventListener("ended", resetExperience);
music.addEventListener("pause", () => {
  if (music.currentTime > 5) {
    resetExperience();
  }
});

function resetExperience() {
  revealBtn.style.display = "inline-block";
  revealBtn.textContent = "Clique ici mon amour 💖";

  musicBtn.classList.add("hidden");

  secretMessage.innerHTML = "";
  index = 0;

  music.currentTime = 0;
  music.volume = 1;
}


music.addEventListener("play", () => {
  myName.classList.add("glowBlink");
});

music.addEventListener("pause", () => {
  myName.classList.remove("glowBlink");
});

music.addEventListener("ended", () => {
  myName.classList.remove("glowBlink");
});


const herName = document.getElementById("herName");

music.addEventListener("play", () => {
  herName.classList.add("kadigeGlow");
});

music.addEventListener("pause", () => {
  herName.classList.remove("kadigeGlow");
});

music.addEventListener("ended", () => {
  herName.classList.remove("kadigeGlow");
});


const profileImg = document.querySelector(".profile-pic img");

music.addEventListener("play", () => {
  profileImg.classList.add("profileBlink");
});

music.addEventListener("pause", () => {
  profileImg.classList.remove("profileBlink");
});

music.addEventListener("ended", () => {
  profileImg.classList.remove("profileBlink");
});


const photos = [
  "kd1.jpg",
  "kd5.jpg",
  "kd2.jpg",
  "kd4.jpg"
  // "kd5.jpg"
];

let photoIndex = 0;
const profileImage = document.getElementById("profileImage");
let photoInterval = null;

function startPhotoSlideshow() {
  photoInterval = setInterval(() => {
    profileImage.style.opacity = 0;

    setTimeout(() => {
      photoIndex = (photoIndex + 1) % photos.length;
      profileImage.src = photos[photoIndex];
      profileImage.style.opacity = 1;
    }, 1500);

  }, 5000); // change toutes les 5 secondes
}

function stopPhotoSlideshow() {
  clearInterval(photoInterval);
}


music.addEventListener("play", startPhotoSlideshow);
music.addEventListener("pause", stopPhotoSlideshow);
music.addEventListener("ended", stopPhotoSlideshow);


function createFirework() {
  const firework = document.createElement("div");
  firework.className = "firework";

  firework.style.left = Math.random() * 100 + "vw";
  firework.style.top = Math.random() * 50 + "vh";

  document.body.appendChild(firework);

  setTimeout(() => firework.remove(), 2000);
}


if (index === longMessage.length) {
  setInterval(createFirework, 600);
}

