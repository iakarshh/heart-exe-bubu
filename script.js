// HEART.exe — personalize the text in this file before publishing.
const CONFIG = {
  recipient: "Bubu",
  sender: "someone who wanted to make you smile",
  memories: [
    { icon: "✦", title: "Your kind of magic", subtitle: "A tiny reminder", message: "You don't have to be extraordinary every second to be special. Sometimes the way you simply exist is already a kind of magic.", color: "#ff5bd9" },
    { icon: "☾", title: "On the hard days", subtitle: "Keep this close", message: "You don't need to have everything figured out. Take things one moment at a time. You deserve softness on the days that feel difficult, too.", color: "#a78bfa" },
    { icon: "♡", title: "A small wish", subtitle: "From this side of the screen", message: "I hope little things find you: a song at the right moment, a sky worth looking at, a reason to laugh when you least expect it.", color: "#ff87c9" },
    { icon: "∞", title: "No pressure", subtitle: "Just a truth", message: "This little website is a gift, not a request for anything in return. Enjoy it at your own pace, exactly as you are.", color: "#77f7ff" },
    { icon: "✧", title: "Your smile", subtitle: "Classified information", message: "If smiles were constellations, yours would probably make astronomers question their entire career.", color: "#d2a2ff" },
    { icon: "☼", title: "One more thing", subtitle: "Read whenever", message: "You are allowed to grow, change, rest, say no, start again, and take up space. Never forget that.", color: "#ffc078" }
  ]
};

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
let activeScreen = "access";
let toastTimer;
let audioContext = null;
let soundtrackOn = false;
let soundtrackTimer = null;

function makeStars() {
  const container = $("#stars");
  for (let i = 0; i < 90; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = (Math.random() * 4) + "s";
    star.style.animationDuration = (2 + Math.random() * 4) + "s";
    star.style.opacity = (0.2 + Math.random() * 0.65).toFixed(2);
    container.appendChild(star);
  }
}
function updateClock() {
  const now = new Date();
  $("#clock").textContent = [now.getHours(),now.getMinutes(),now.getSeconds()].map(n=>String(n).padStart(2,"0")).join(":");
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function goTo(name) {
  const target = name === "access" ? "access" : name;
  const screen = $("#screen-" + target);
  if (!screen) return;
  $$(".screen").forEach(el => el.classList.remove("active"));
  screen.classList.add("active");
  activeScreen = target;
  $$(".bottom-nav button").forEach(btn => btn.classList.toggle("current", btn.dataset.go === target));
  window.scrollTo({top:0, behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
}
function openModal(title, message) {
  $("#modalTitle").textContent = title;
  $("#modalText").textContent = message;
  $("#messageModal").classList.remove("hidden");
  $("#modalOkay").focus();
}
function closeModal() {
  $("#messageModal").classList.add("hidden");
}
function renderMemories() {
  const grid = $("#memoryGrid");
  CONFIG.memories.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "memory-card";
    button.style.setProperty("--orb", item.color);
    button.innerHTML = `<div class="memory-icon">${item.icon}</div><strong></strong><small></small>`;
    $("strong", button).textContent = item.title;
    $("small", button).textContent = item.subtitle;
    button.addEventListener("click", () => openModal(item.title, item.message));
    grid.appendChild(button);
  });
}
function bootLog() {
  const lines = [
    "Initializing HEART.exe core...",
    "Searching for a little bit of wonder...",
    "Recipient identified: Bubu ♡",
    "Loading tiny surprises... DONE"
  ];
  const box = $("#bootLog");
  lines.forEach((line, i) => setTimeout(() => {
    const row = document.createElement("div");
    row.textContent = line;
    box.appendChild(row);
  }, 350 * (i + 1)));
}
let scanCount = 0;
const scanJokes = [
  {
    title: "Bubu.exe has stopped being normal. 😂",
    text: "Scan result: 99.9% cuteness, 0% willingness to share snacks, and one (1) Dudu permanently confused.",
    caption: "TECH SUPPORT SAYS: GIVE BUBU A SNACK."
  },
  {
    title: "URGENT: Dudu needs a software update. 🐼",
    text: "The system detected excessive cuteness. Dudu.exe is buffering because Bubu is too adorable. Please do not unplug the panda.",
    caption: "ERROR 404: DUDU'S CHILL NOT FOUND."
  }
];
function runScan() {
  const btn = $("#scanBtn");
  if (btn.disabled) return;
  btn.disabled = true;
  btn.textContent = "SCANNING...";
  $(".scanner-visual").classList.add("scanning");
  $("#scanResult").classList.add("hidden");
  $("#scanContinueBtn").classList.add("hidden");
  let progress = 0;
  $("#scanStatus").textContent = "MEASURING BUBU LEVELS";
  const interval = setInterval(() => {
    progress = Math.min(100, progress + Math.floor(Math.random() * 10) + 5);
    $("#scanPercent").textContent = String(progress).padStart(2,"0") + "%";
    $("#scanProgress").style.width = progress + "%";
    if (progress >= 100) {
      clearInterval(interval);
      scanCount++;
      const joke = scanJokes[Math.min(scanCount - 1, scanJokes.length - 1)];
      $("#scanStatus").textContent = scanCount === 1 ? "CUTE-NESS OVERLOAD DETECTED" : "FINAL DIAGNOSIS: CHAOTIC CUTE";
      $("#scanJokeTitle").textContent = joke.title;
      $("#scanJokeText").textContent = joke.text;
      $("#scanCaption").textContent = joke.caption;
      btn.disabled = false;
      btn.innerHTML = 'SCAN COMPLETE <span>✓</span>';
      $(".scanner-visual").classList.remove("scanning");
      $("#scanResult").classList.remove("hidden");
      if (scanCount < 2) {
        $("#scanAgainBtn").classList.remove("hidden");
        $("#scanContinueBtn").classList.add("hidden");
        showToast("The scanner is confused. One more scan? 😂");
      } else {
        $("#scanAgainBtn").classList.add("hidden");
        $("#scanContinueBtn").classList.remove("hidden");
        showToast("Two scans done. Bubu is officially too powerful. 😂");
      }
    }
  }, 140);
}

function renderTheme(theme) {
  document.body.classList.remove("theme-moonlight","theme-sunset");
  if (theme === "moonlight") document.body.classList.add("theme-moonlight");
  if (theme === "sunset") document.body.classList.add("theme-sunset");
  $$(".theme-choice").forEach(btn => btn.classList.toggle("selected", btn.dataset.theme === theme));
  const messages = {
    nebula: "NEBULA selected. Neon dreams, cosmic dust, and a universe with extra sparkle.",
    moonlight: "MOONLIGHT selected. Softer glow, quieter skies, and a little peaceful magic.",
    sunset: "AFTERGLOW selected. Warm light, golden-hour energy, and a soft landing."
  };
  $("#themeMessage").textContent = messages[theme];
  showToast("Universe theme updated.");
}
function startSoundtrack() {
  // Synthesized ambient sci-fi tones: no external audio file or copyrighted track required.
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) { showToast("This browser does not support the optional ambient sound."); return; }
  if (!audioContext) audioContext = new AudioCtx();
  audioContext.resume();
  soundtrackOn = true;
  $("#soundLabel").textContent = "SOUND ON";
  $("#soundToggle").style.borderColor = "rgba(255,79,216,.75)";
  const master = audioContext.createGain();
  master.gain.value = 0.035;
  master.connect(audioContext.destination);
  const notes = [110,164.81,220,146.83];
  let index = 0;
  const playNote = () => {
    if (!soundtrackOn) { master.disconnect(); return; }
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.value = notes[index % notes.length];
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 3.8);
    osc.connect(gain); gain.connect(master);
    osc.start(); osc.stop(audioContext.currentTime + 4);
    index++;
  };
  playNote();
  soundtrackTimer = setInterval(playNote, 2400);
}
function stopSoundtrack() {
  soundtrackOn = false;
  clearInterval(soundtrackTimer);
  $("#soundLabel").textContent = "SOUND OFF";
  $("#soundToggle").style.borderColor = "";
}
function confettiBurst() {
  const symbols = ["♥","✦","✧","♡","✺"];
  for (let i=0;i<42;i++) {
    const el = document.createElement("span");
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    Object.assign(el.style, {
      position:"fixed", left:(Math.random()*100)+"vw", top:"-30px",
      zIndex:60, color:["#ff5bd9","#a96cff","#76f7ff","#ffd1f5"][Math.floor(Math.random()*4)],
      fontSize:(12+Math.random()*22)+"px", pointerEvents:"none",
      transition:"transform 2.5s ease-in, opacity 2.5s ease-in"
    });
    document.body.appendChild(el);
    requestAnimationFrame(()=>{el.style.transform=`translate(${(Math.random()-.5)*220}px, ${window.innerHeight+80}px) rotate(${Math.random()*720}deg)`;el.style.opacity="0";});
    setTimeout(()=>el.remove(),2700);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  makeStars(); updateClock(); setInterval(updateClock,1000); bootLog(); renderMemories();
  $("#enterBtn").addEventListener("click", () => goTo("welcome"));
  $$("[data-go]").forEach(btn => btn.addEventListener("click", () => goTo(btn.dataset.go)));
  $$("[data-note]").forEach(btn => btn.addEventListener("click", () => openModal("A little universe note", btn.dataset.note)));
  $("#scanBtn").addEventListener("click", runScan);
  $("#scanAgainBtn").addEventListener("click", () => {
    $("#scanResult").classList.add("hidden");
    $("#scanBtn").innerHTML = 'RUN SECOND SCAN <span>⌁</span>';
    $("#scanBtn").click();
  });
  $("#scanContinueBtn").addEventListener("click", () => goTo("galaxy"));
  $$(".theme-choice").forEach(btn => btn.addEventListener("click", () => renderTheme(btn.dataset.theme)));
  let found = 0;
  $$("#heartHunt button").forEach(btn => btn.addEventListener("click", () => {
    if (btn.classList.contains("found")) return;
    btn.classList.add("found"); btn.textContent = "♥"; found++;
    $("#huntMessage").textContent = `${found} / 3 found`;
    if (found === 3) {
      $("#huntMessage").textContent = "SECRET UNLOCKED: You deserve good things, Bubu. Always. ♡";
      showToast("All hidden hearts found!");
    }
  }));
  $("#unlockVault").addEventListener("click", () => {
    $("#vaultCode").textContent = "ACCESS GRANTED";
    $("#vaultHint").textContent = "Message decrypted successfully.";
    $("#unlockVault").classList.add("hidden");
    $("#letter").classList.remove("hidden");
    showToast("A little note unlocked.");
  });
  $("#revealBtn").addEventListener("click", () => {
    $("#finalMessage").classList.remove("hidden");
    $("#revealBtn").classList.add("hidden");
    $("#surpriseHeart").textContent = "♡";
    confettiBurst();
  });
  $("#celebrateBtn").addEventListener("click", () => { confettiBurst(); showToast("A little sparkle, just for Bubu ✦"); });
  $("#soundToggle").addEventListener("click", () => soundtrackOn ? stopSoundtrack() : startSoundtrack());
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalOkay").addEventListener("click", closeModal);
  $("#messageModal").addEventListener("click", e => { if (e.target.id === "messageModal") closeModal(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
    if (e.altKey && e.key === "1") goTo("welcome");
    if (e.altKey && e.key === "2") goTo("scanner");
    if (e.altKey && e.key === "3") goTo("galaxy");
    if (e.altKey && e.key === "4") goTo("game");
    if (e.altKey && e.key === "5") goTo("vault");
  });
  const glow = $("#cursorGlow");
  window.addEventListener("pointermove", e => { glow.style.left=e.clientX+"px"; glow.style.top=e.clientY+"px"; });
});
