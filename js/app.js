/* =========================
   💖 GLOBAL CONFIG 💖
   Edit ONLY this section
========================= */

const CONFIG = {
  girlName: "My Love ❤️",

  messages: [
    "Mummmaah🥺",
    "Bogluuu se naaraz ho kya...",
    "Bachee ki gustakhi maaf kr do💔",
    "Plssss potttyy mummaah bht mehnat se baanaya hu aapke liye maan jaao😔",
    "Acha chlo game khlte h tum jeet gye to mt manana haar gye to maan jana? 🎮💗"
  ],

  images: {
    sorryGif: "assets/S1.gif",
    
    herPic: "assets/OLUU.png"
  }
};
let msgIndex = 0;
let typing = false;

const title = document.getElementById("title");
const text = document.getElementById("text");
const img = document.getElementById("mainImg");
const card = document.getElementById("card");
const btn = document.getElementById("nextBtn");

title.innerText = CONFIG.girlName;
img.src = CONFIG.images.sorryGif;

/* ========= TYPING ========= */
function typeMessage(message) {
  typing = true;
  btn.disabled = true;
  text.innerHTML = "";

  let i = 0;
  const interval = setInterval(() => {
    text.innerHTML += message.charAt(i);
    i++;
    if (i >= message.length) {
      clearInterval(interval);
      typing = false;
      btn.disabled = false;
    }
  }, 35);
}

/* ========= FLOW ========= */
function next() {
  if (typing) return;

  if (msgIndex < CONFIG.messages.length) {
    typeMessage(CONFIG.messages[msgIndex]);
    msgIndex++;
  } else {
    memoryGame();
  }
}

/* ========= GAME 1: MEMORY ========= */
function memoryGame() {
  const symbols = ["💗","💗","💞","💞","💕","💕"];
  symbols.sort(() => Math.random() - 0.5);
  let open = [];
  let matched = 0;

  card.innerHTML = `
    <h2 class="neon-text">Match the Hearts 💕</h2>
    <div class="grid"></div>
  `;

  const grid = document.querySelector(".grid");

  symbols.forEach(sym => {
    const div = document.createElement("div");
    div.className = "tile";
    div.innerText = "❓";
    div.onclick = () => {
      if (open.length < 2 && div.innerText === "❓") {
        div.innerText = sym;
        open.push({div, sym});
        if (open.length === 2) {
          setTimeout(() => {
            if (open[0].sym === open[1].sym) {
              matched += 2;
            } else {
              open[0].div.innerText = "❓";
              open[1].div.innerText = "❓";
            }
            open = [];
            if (matched === symbols.length) chaseGame();
          }, 600);
        }
      }
    };
    grid.appendChild(div);
  });
}

/* ========= GAME 2: CHASE ========= */
function chaseGame() {
  let timeLeft = 60;           // ⏱ 60 seconds
  let gameOver = false;

  card.innerHTML = `
    <h2 class="neon-text">Catch My Heart 💗</h2>
    <p id="timer">Time left: 60s</p>
    <button id="heart">💗</button>
  `;

  const heart = document.getElementById("heart");
  const timerText = document.getElementById("timer");

  heart.style.position = "absolute";

  // ❤️ MOVE HEART
  const moveInterval = setInterval(() => {
    if (gameOver) return;

    heart.style.left = Math.random() * 80 + "vw";
    heart.style.top = Math.random() * 80 + "vh";
  }, 700);

  // ⏱ COUNTDOWN TIMER
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerText.innerText = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      endGame(false);
    }
  }, 1000);

  // ❤️ CLICK = WIN
  heart.onclick = () => {
    endGame(true);
  };

  // 🎯 END GAME HANDLER
  function endGame(won) {
    if (gameOver) return;
    gameOver = true;

    clearInterval(moveInterval);
    clearInterval(timerInterval);

    if (won) {
      finalScreen();   // existing success flow
    } else {
      loseScreen();    // new lose flow
    }
  }
}
function loseScreen() {
  card.innerHTML = `
    <h1 class="neon-text">Oops 😳</h1>
    <p>
      You didn’t catch my heart in time 💔<br>
      But my apology is still real 🥺
    </p>
    <button onclick="finalScreen()">Continue 💖</button>
  `;
}

/* ========= FINAL ========= */
function finalScreen() {
  card.innerHTML = `
    <h1 class="neon-text">It’s You 💖</h1>

    <img src="${CONFIG.images.herPic}" 
         style="
           width: 220px;
           border-radius: 20px;
           box-shadow: 0 0 25px rgba(255,77,166,0.8);
           margin: 15px auto;
         ">

    <p>
      No matter what happens,<br>
      you are my favorite person 🌸<br><br>
      I’m really sorry 🥺❤️
    </p>

    <button onclick="forgiven()">Forgive Me 💞</button>
  `;
}

function forgiven() {
  document.body.innerHTML = `
    <div class="card">
      <h1 class="neon-text">Thank You 🥹💖</h1>
      <p>
        Your smile fixes everything ✨<br>
        Tu to meri pyaari beti h n...Sorry 🫶
      </p>
    </div>
  `;
}


/* START */
typeMessage(CONFIG.messages[msgIndex]);

msgIndex++;
