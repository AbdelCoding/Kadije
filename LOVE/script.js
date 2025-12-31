// Elements
const revealBtn = document.getElementById("revealBtn");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");
const secretMessage = document.getElementById("secretMessage");
const counter = document.getElementById("counter");
const herName = document.getElementById("herName");
const myName = document.getElementById("myName");
const profileImg = document.getElementById("profileImage");
const finalLine = document.getElementById("finalLine");
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

// Photos
const photos = ["kd1.jpg","kd2.jpg","kd3.jpg","kd4.jpg","kd5.jpg","kd6.jpg"];
let photoIndex = 0;
let photoInterval = null;

// Text
const longMessage = `Kadige…

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

— Ton Njibah 💫`;

let textIndex = 0;
let textTimer = null;

// Hearts
let heartsInterval = null;
function createHeart(){
  const heart = document.createElement("div");
  heart.className="heart";
  heart.innerHTML="💖";
  heart.style.left=Math.random()*100+"vw";
  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(),7000);
}
function startHearts(){ heartsInterval=setInterval(createHeart,400); }
function stopHearts(){ clearInterval(heartsInterval); }

// Text typing
function startText(){ textTimer=setInterval(()=>{
  if(textIndex<longMessage.length){
    secretMessage.innerHTML += longMessage[textIndex];
    textIndex++;
  } else { clearInterval(textTimer); showConfetti(); }
},90);}
function stopText(){ clearInterval(textTimer); }

// Photo slideshow
function startSlideshow(){ photoInterval=setInterval(()=>{
  photoIndex=(photoIndex+1)%photos.length;
  profileImg.src=photos[photoIndex];
},5000);}
function stopSlideshow(){ clearInterval(photoInterval); }

// Counter
const startDate = new Date("2024-02-14");
function updateCounter(){
  const now = new Date();
  const diff = now - startDate;
  const days = Math.floor(diff/86400000);
  const hours = Math.floor((diff/3600000)%24);
  const minutes = Math.floor((diff/60000)%60);
  counter.innerHTML=`💖 ${days} jours ${hours}h ${minutes}min d'amour`;
}
setInterval(updateCounter,1000);
updateCounter();

// Reveal
revealBtn.addEventListener("click", async ()=>{
  revealBtn.style.display="none";
  musicBtn.classList.remove("hidden");
  try{ await music.play(); } catch(e){ console.log("Audio bloqué"); }

  profileImg.classList.add("profileBlink");
  herName.classList.add("kadigeGlow");
  myName.classList.add("glowBlink");

  startText();
  startHearts();
  startSlideshow();
});

// Music control
musicBtn.addEventListener("click", ()=>{
  if(music.paused){
    music.play();
    startText();
    startHearts();
    startSlideshow();
    musicBtn.textContent="⏸️ Pause musique";
  } else {
    music.pause();
    stopText();
    stopHearts();
    stopSlideshow();
    musicBtn.textContent="▶️ Play musique";
  }
});

// Confetti
function resizeCanvas(){ confettiCanvas.width=window.innerWidth; confettiCanvas.height=window.innerHeight; }
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let confettis=[];
function showConfetti(){
  for(let i=0;i<200;i++){
    confettis.push({x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight, r:Math.random()*6+2, d:Math.random()*10+5, color:`hsl(${Math.random()*360},100%,80%)`});
  }
  requestAnimationFrame(drawConfetti);
}
function drawConfetti(){
  ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettis.forEach((c,i)=>{
    ctx.fillStyle=c.color;
    ctx.beginPath();
    ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
    ctx.fill();
    c.y+=c.d;
    if(c.y>window.innerHeight){ c.y=-10; c.x=Math.random()*window.innerWidth; }
  });
  requestAnimationFrame(drawConfetti);
}
