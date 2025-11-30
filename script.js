const playerName = document.querySelectorAll(".playerPosition");
const dialogPlayer = document.getElementById("dialogTeams");
const close = document.getElementById("ok-btn");
const input = document.getElementById("inputTeams");

const homeIndexMap = {
  homeTeam: 0,
  hCaptain: 1,
  h1: 2,
  h2: 3,
  h3: 4,
  h4: 5,
  he1: 6,
  he2: 7,
};

const guestIndexMap = {
  guestTeam: 0,
  gCaptain: 1,
  g1: 2,
  g2: 3,
  g3: 4,
  g4: 5,
  ge1: 6,
  ge2: 7,
};

const resultMap = {
  homeTeam: "HTeamRes",
  h1: "homePlayer1",
  h2: "homePlayer2",
  h3: "homePlayer3",
  h4: "homePlayer4",
  he1: "homeHE1",
  he2: "homeHE2",

  guestTeam: "GTeamRes",
  g1: "guestPlayer1",
  g2: "guestPlayer2",
  g3: "guestPlayer3",
  g4: "guestPlayer4",
  ge1: "guestGE1",
  ge2: "guestGE2",
};

let homePlayer = [];
let guestPlayer = [];
let currentElement = null;
let currentHeader = null;

// === Klick auf Spieler ===
playerName.forEach((el) => {
  el.addEventListener("click", () => {
    // <p>-Element im .playerPosition holen
    currentElement = el.querySelector("p");
    currentHeader = el.dataset.header;
    input.value = "";
    dialogPlayer.show();
    input.focus();
    console.log(el);
  });
});

function updateResultHeaders() {
  for (const key in resultMap) {
    const targetId = resultMap[key];
    const targetEl = document.getElementById(targetId);
    if (!targetEl) continue;

    const container = targetEl.parentElement;
    let value = "";
    let isEmpty = false;

    // HOME
    if (homeIndexMap[key] !== undefined) {
      const index = homeIndexMap[key];
      value = homePlayer[index] || "";

      if (!value || value.trim() === "") {
        value = key;
        isEmpty = true;
      }
    }

    // GUEST
    else if (guestIndexMap[key] !== undefined) {
      const index = guestIndexMap[key];
      value = guestPlayer[index] || "";

      if (!value || value.trim() === "") {
        value = key;
        isEmpty = true;
      }
    }

    // Wert in HTML schreiben
    targetEl.textContent = value;

    if (isEmpty) {
      container.classList.add("diagonal-strike");
    } else {
      container.classList.remove("diagonal-strike");
    }
  }
}

function applyPlayer() {
  if (!currentElement || input.value.trim() === "") return;

  let newValue = input.value.trim();
  currentElement.textContent = newValue;

  if (homeIndexMap[currentHeader] !== undefined) {
    const index = homeIndexMap[currentHeader];
    homePlayer[index] = newValue; // <-- feste Position
  }

  if (guestIndexMap[currentHeader] !== undefined) {
    const index = guestIndexMap[currentHeader];
    guestPlayer[index] = newValue; // <-- feste Position
  }

  console.log("HOME:", homePlayer);
  console.log("GAST:", guestPlayer);

  dialogPlayer.close();
}

close.addEventListener("click", () => {
  // Runde 2 aktualisieren, sobald Spieler eingegeben werden
  applyPlayer();
  console.log(homePlayer);
});

// === OK-Button + Enter ===

dialogPlayer.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyPlayer();
  }
});

const round1Matches = [
  { home: "h1", guest: "g1", id: "r1g1" },
  { home: "h2", guest: "g2", id: "r1g2" },
  { home: "h3", guest: "g3", id: "r1g3" },
  { home: "h4", guest: "g4", id: "r1g4" },
];

// Runde 2 in HTML füllen
function fillRound1() {
  round1Matches.forEach((match) => {
    const output = document.getElementById(match.id);
    if (!output) return;

    const homeIndex = homeIndexMap[match.home];
    const guestIndex = guestIndexMap[match.guest];

    const homeName = homePlayer[homeIndex] || "";
    const guestName = guestPlayer[guestIndex] || "";

    output.textContent = `${homeName} vs ${guestName}`;
  });
}

const round2Matches = [
  { home: "h1", guest: "g2", id: "r2g1" },
  { home: "h3", guest: "g4", id: "r2g2" },
  { home: "h2", guest: "g1", id: "r2g3" },
  { home: "h4", guest: "g3", id: "r2g4" },
];

function fillRound2() {
  round2Matches.forEach((match) => {
    const output = document.getElementById(match.id);
    if (!output) return;

    const homeIndex = homeIndexMap[match.home];
    const guestIndex = guestIndexMap[match.guest];

    const homeName = homePlayer[homeIndex] || "";
    const guestName = guestPlayer[guestIndex] || "";

    output.textContent = `${homeName} vs ${guestName}`;
  });
}

const round3Matches = [
  { home: "h3", guest: "g2", id: "r3g1" },
  { home: "h1", guest: "g4", id: "r3g2" },
  { home: "h2", guest: "g3", id: "r3g3" },
  { home: "h4", guest: "g1", id: "r3g4" },
];

function fillRound3() {
  round3Matches.forEach((match) => {
    const output = document.getElementById(match.id);
    if (!output) return;

    const homeIndex = homeIndexMap[match.home];
    const guestIndex = guestIndexMap[match.guest];

    const homeName = homePlayer[homeIndex] || "";
    const guestName = guestPlayer[guestIndex] || "";

    output.textContent = `${homeName} vs ${guestName}`;
  });
}

const round4Matches = [
  { home: "h1", guest: "g3", id: "r4g1" },
  { home: "h2", guest: "g4", id: "r4g2" },
  { home: "h3", guest: "g1", id: "r4g3" },
  { home: "h4", guest: "g2", id: "r4g4" },
];

function fillRound4() {
  round4Matches.forEach((match) => {
    const output = document.getElementById(match.id);
    if (!output) return;

    const homeIndex = homeIndexMap[match.home];
    const guestIndex = guestIndexMap[match.guest];

    const homeName = homePlayer[homeIndex] || "";
    const guestName = guestPlayer[guestIndex] || "";

    output.textContent = `${homeName} vs ${guestName}`;
  });
}

function removeButton() {
  const container = document.getElementById("playerConfirmBtn");

  container.remove();
}

const dialogPlayerConfirm = document.getElementById("dialogPlayerConfirm");
const playerConfirmBtn = document.getElementById("playerConfirmBtn");
playerConfirmBtn.addEventListener("click", () => {
  const OkBtn = document.getElementById("playerConfirmDialogOkBtn");
  const closeBtn = document.getElementById("playerConfirmDialogCloseBtn");
  dialogPlayerConfirm.show();
  OkBtn.addEventListener("click", () => {
    fillRound1();
    fillRound2();
    fillRound3();
    fillRound4();
    updateResultHeaders();
    // removeButton();

    dialogPlayerConfirm.close();
  });
  closeBtn.addEventListener("click", () => {
    dialogPlayerConfirm.close();
  });
});
