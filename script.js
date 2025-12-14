/**********************************************************
 * GRUNDVARIABLEN & MAPS
 **********************************************************/

const playerName = document.querySelectorAll(".playerPosition");
const dialogPlayer = document.getElementById("dialogTeams");
const close = document.getElementById("ok-btn");
const input = document.getElementById("inputTeams");
const diaText = document.getElementById("diaText");

const chooseDialog = document.getElementById("choosePlayerDialog");
const dropdown = document.getElementById("myDropdown");
const closeChooseDialogBtn = document.getElementById("choosePlayerDialogBtn");

let currentElement = null;
let currentHeader = null;

// Spielerwechsel-Status
let replacedKey = null; // z. B. h2 / g3
let replacedSide = null; // "home" | "guest"

/**********************************************************
 * INDEX MAPS
 **********************************************************/

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

/**********************************************************
 * DATEN
 **********************************************************/

let teams = [];
let captains = [];

let homePlayer = [];
let guestPlayer = [];

let homeSubstitudePlayer = [];
let guestSubstitudePlayer = [];

/**********************************************************
 * SPIELERNAMEN EINGEBEN
 **********************************************************/

playerName.forEach((el) => {
  el.addEventListener("click", () => {
    currentHeader = el.dataset.header;
    currentElement = el.querySelector("p");
    input.value = "";

    if (currentHeader.includes("Team"))
      diaText.textContent = "Teamname eingeben!";
    else if (currentHeader.includes("Captain"))
      diaText.textContent = "Kapitänsname eingeben!";
    else diaText.textContent = "Spielername eingeben!";

    dialogPlayer.show();
    input.focus();
  });
});

function applyPlayer() {
  if (!currentElement || !input.value.trim()) return;

  const value = input.value.trim();
  currentElement.textContent = value;

  if (homeIndexMap[currentHeader] !== undefined) {
    homePlayer[homeIndexMap[currentHeader]] = value;
    if (currentHeader === "homeTeam") teams[0] = value;
    if (currentHeader === "hCaptain") captains[0] = value;
    if (currentHeader === "he1") homeSubstitudePlayer[0] = value;
    if (currentHeader === "he2") homeSubstitudePlayer[1] = value;
  }

  if (guestIndexMap[currentHeader] !== undefined) {
    guestPlayer[guestIndexMap[currentHeader]] = value;
    if (currentHeader === "guestTeam") teams[1] = value;
    if (currentHeader === "gCaptain") captains[1] = value;
    if (currentHeader === "ge1") guestSubstitudePlayer[0] = value;
    if (currentHeader === "ge2") guestSubstitudePlayer[1] = value;
  }

  dialogPlayer.close();
}

close.addEventListener("click", applyPlayer);
dialogPlayer.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    applyPlayer();
  }
});

/**********************************************************
 * RUNDEN
 **********************************************************/

const round1Matches = [
  { home: "h1", guest: "g1", id: "r1g1" },
  { home: "h2", guest: "g2", id: "r1g2" },
  { home: "h3", guest: "g3", id: "r1g3" },
  { home: "h4", guest: "g4", id: "r1g4" },
];

const round2Matches = [
  { home: "h1", guest: "g2", id: "r2g1" },
  { home: "h3", guest: "g4", id: "r2g2" },
  { home: "h2", guest: "g1", id: "r2g3" },
  { home: "h4", guest: "g3", id: "r2g4" },
];

const round3Matches = [
  { home: "h3", guest: "g2", id: "r3g1" },
  { home: "h1", guest: "g4", id: "r3g2" },
  { home: "h2", guest: "g3", id: "r3g3" },
  { home: "h4", guest: "g1", id: "r3g4" },
];

const round4Matches = [
  { home: "h1", guest: "g3", id: "r4g1" },
  { home: "h2", guest: "g4", id: "r4g2" },
  { home: "h3", guest: "g1", id: "r4g3" },
  { home: "h4", guest: "g2", id: "r4g4" },
];

const allRounds = [round1Matches, round2Matches, round3Matches, round4Matches];

function fillAllRounds() {
  allRounds.flat().forEach((match) => {
    const homeName = homePlayer[homeIndexMap[match.home]] || "";
    const guestName = guestPlayer[guestIndexMap[match.guest]] || "";
    document.getElementById(
      match.id
    ).textContent = `${homeName} vs ${guestName}`;
  });
}

/**********************************************************
 * WECHSEL – KLICK AUF 🔄 ICON
 **********************************************************/

document.querySelectorAll(".changePlayerImg").forEach((img) => {
  img.addEventListener("click", (e) => {
    e.stopPropagation();

    const wrapper = img.closest(".playerPosition");
    replacedKey = wrapper.dataset.header;
    replacedSide = replacedKey.startsWith("h") ? "home" : "guest";

    openSubDialog(replacedSide);
  });
});

/**********************************************************
 * WECHSELSPIELER DIALOG
 **********************************************************/

function openSubDialog(side) {
  dropdown.innerHTML = "";
  dropdown.style.display = "block";

  const subs = side === "home" ? homeSubstitudePlayer : guestSubstitudePlayer;

  subs.forEach((p) => {
    if (!p) return;
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    dropdown.appendChild(opt);
  });

  chooseDialog.showModal();
}

closeChooseDialogBtn.addEventListener("click", () => {
  chooseDialog.close();
});

dropdown.addEventListener("change", () => {
  const newPlayer = dropdown.value;

  if (replacedSide === "home") {
    changeHomePlayer(replacedKey, newPlayer);
  } else {
    changeGuestPlayer(replacedKey, newPlayer);
  }

  chooseDialog.close();
});

/**********************************************************
 * HILFSFUNKTIONEN
 **********************************************************/

function isRoundPlayed(matchId) {
  const el = document.getElementById(matchId);
  return el.nextElementSibling.textContent.trim() !== "";
}

function getHomeName(key) {
  return homePlayer[homeIndexMap[key]] || "";
}

function getGuestName(key) {
  return guestPlayer[guestIndexMap[key]] || "";
}

/**********************************************************
 * HEIMSPIELER WECHSEL
 **********************************************************/

function changeHomePlayer(oldKey, newName) {
  allRounds.flat().forEach((match) => {
    if (match.home === oldKey && !isRoundPlayed(match.id)) {
      const guestName = getGuestName(match.guest);
      document.getElementById(
        match.id
      ).textContent = `${newName} vs ${guestName}`;
    }
  });
}

/**********************************************************
 * GASTSPIELER WECHSEL
 **********************************************************/

function changeGuestPlayer(oldKey, newName) {
  allRounds.flat().forEach((match) => {
    if (match.guest === oldKey && !isRoundPlayed(match.id)) {
      const homeName = getHomeName(match.home);
      document.getElementById(
        match.id
      ).textContent = `${homeName} vs ${newName}`;
    }
  });
}

/**********************************************************
 * ERGEBNISBEREICH AKTUALISIEREN
 **********************************************************/

function updateResultHeaders() {
  for (const key in resultMap) {
    const el = document.getElementById(resultMap[key]);
    if (!el) continue;

    if (homeIndexMap[key] !== undefined)
      el.textContent = homePlayer[homeIndexMap[key]] || key;

    if (guestIndexMap[key] !== undefined)
      el.textContent = guestPlayer[guestIndexMap[key]] || key;
  }
}

/**********************************************************
 * SPIELER BESTÄTIGEN
 **********************************************************/

document.getElementById("playerConfirmBtn").addEventListener("click", () => {
  fillAllRounds();
  updateResultHeaders();
});
