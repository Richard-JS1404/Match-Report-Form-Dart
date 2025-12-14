// -------------------- Spielerzuordnung --------------------

function resolvePlayerId(playerId) {
  return GameState.activePlayerMap[playerId] || playerId;
}

function getActivePlayer(basePlayer) {
  return GameState.activePlayerMap[basePlayer] || basePlayer;
}

const roundPlayerMap = {
  r1g1: { home: "h1", guest: "g1" },
  r1g2: { home: "h2", guest: "g2" },
  r1g3: { home: "h3", guest: "g3" },
  r1g4: { home: "h4", guest: "g4" },
  r2g1: { home: "h1", guest: "g2" },
  r2g2: { home: "h3", guest: "g4" },
  r2g3: { home: "h2", guest: "g1" },
  r2g4: { home: "h4", guest: "g3" },
  r3g1: { home: "h3", guest: "g2" },
  r3g2: { home: "h1", guest: "g4" },
  r3g3: { home: "h2", guest: "g3" },
  r3g4: { home: "h4", guest: "g1" },
  r4g1: { home: "h1", guest: "g3" },
  r4g2: { home: "h2", guest: "g4" },
  r4g3: { home: "h3", guest: "g1" },
  r4g4: { home: "h4", guest: "g2" },
};

// -------------------- Ergebnis-Mapping --------------------
const resultMapH = {
  r1g1: "h1r1",
  r1g2: "h2r1",
  r1g3: "h3r1",
  r1g4: "h4r1",
  r2g1: "h1r2",
  r2g2: "h3r2",
  r2g3: "h2r2",
  r2g4: "h4r2",
  r3g1: "h3r3",
  r3g2: "h1r3",
  r3g3: "h2r3",
  r3g4: "h4r3",
  r4g1: "h1r4",
  r4g2: "h2r4",
  r4g3: "h3r4",
  r4g4: "h4r4",
};
const resultMapHPoints = Object.fromEntries(
  Object.entries(resultMapH).map(([k, v]) => [k, v + "P"])
);
const resultMapG = {
  r1g1: "g1r1",
  r1g2: "g2r1",
  r1g3: "g3r1",
  r1g4: "g4r1",
  r2g1: "g2r2",
  r2g2: "g4r2",
  r2g3: "g1r2",
  r2g4: "g3r2",
  r3g1: "g2r3",
  r3g2: "g4r3",
  r3g3: "g3r3",
  r3g4: "g1r3",
  r4g1: "g3r4",
  r4g2: "g4r4",
  r4g3: "g1r4",
  r4g4: "g2r4",
};
const resultMapGPoints = Object.fromEntries(
  Object.entries(resultMapG).map(([k, v]) => [k, v + "P"])
);

const resultMapAllH = {
  r1g1: "h1All",
  r1g2: "h2All",
  r1g3: "h3All",
  r1g4: "h4All",
  r2g1: "h1All",
  r2g2: "h3All",
  r2g3: "h2All",
  r2g4: "h4All",
  r3g1: "h3All",
  r3g2: "h1All",
  r3g3: "h2All",
  r3g4: "h4All",
  r4g1: "h1All",
  r4g2: "h2All",
  r4g3: "h3All",
  r4g4: "h4All",
};
const resultMapAllHPoints = Object.fromEntries(
  Object.entries(resultMapAllH).map(([k, v]) => [k, v + "P"])
);
const resultMapAllG = {
  r1g1: "g1All",
  r1g2: "g2All",
  r1g3: "g3All",
  r1g4: "g4All",
  r2g1: "g2All",
  r2g2: "g4All",
  r2g3: "g1All",
  r2g4: "g3All",
  r3g1: "g2All",
  r3g2: "g4All",
  r3g3: "g3All",
  r3g4: "g1All",
  r4g1: "g3All",
  r4g2: "g4All",
  r4g3: "g1All",
  r4g4: "g2All",
};
const resultMapAllGPoints = Object.fromEntries(
  Object.entries(resultMapAllG).map(([k, v]) => [k, v + "P"])
);

// -------------------- DOM-Elemente --------------------
const legResult = document.querySelectorAll(".gmpl-container");
const dialogResult = document.getElementById("diaResult");
const inputResult = document.getElementById("inputResult");
const inputResult2 = document.getElementById("inputResult2");
const closeDialogResult = document.getElementById("ok-btn-result");

let currentResult = null;
let currentResult2 = null;

// -------------------- Match Results --------------------

Object.keys(resultMapH).forEach((roundId) => {
  GameState.matchResults[roundId] = {
    home: 0,
    guest: 0,
    homepoints: 0,
    guestpoints: 0,
    homePlayer: null,
    guestPlayer: null,
  };
});

// -------------------- EventListener für Ergebnis-Klick --------------------
legResult.forEach((el) => {
  el.addEventListener("click", () => {
    currentResult = el.querySelector("p.gmpl-GM1");
    currentResult2 = el.querySelector("p.result");
    inputResult.value = "";
    inputResult2.value = "";
    dialogResult.show();
    inputResult.focus();
  });
});

function extractPlayerId(value) {
  const match = value.match(/^([a-z]+[0-9]+)/); // nur h1, h2, g1, g2, he1, ge2 usw.
  return match ? match[1] : value;
}

// -------------------- Ergebnis anwenden --------------------
function applyResult() {
  if (!currentResult) return;
  const roundId = currentResult.id;
  const homeScore = parseInt(inputResult.value) || 0;
  const guestScore = parseInt(inputResult2.value) || 0;

  const homePoints = homeScore >= 2 ? 1 : 0;
  const guestPoints = guestScore >= 2 ? 1 : 0;

  // Spieler aus Maps ermitteln
  const homePlayerOriginal = roundPlayerMap[roundId].home;
  const guestPlayerOriginal = roundPlayerMap[roundId].guest;

  const homePlayer = getActivePlayer(homePlayerOriginal);
  const guestPlayer = getActivePlayer(guestPlayerOriginal);

  GameState.matchResults[roundId] = {
    home: homeScore,
    guest: guestScore,
    homepoints: homePoints,
    guestpoints: guestPoints,
    homePlayer: homePlayerOriginal,
    guestPlayer: guestPlayerOriginal,
  };

  // Einzelspieler-Resultate aktualisieren
  currentResult2.textContent = `${homeScore}:${guestScore}`;

  function resolveResultId(map, roundId) {
    const baseId = map[roundId];
    if (!baseId) return null;
    const match = baseId.match(/^([a-z0-9]+)(r\d.*)$/);
    if (!match) return baseId;
    const originalPlayer = match[1];
    const rest = match[2];
    const activePlayer = resolvePlayerId(originalPlayer);
    return `${activePlayer}${rest}`;
  }

  const ids = {
    h: resolveResultId(resultMapH, roundId),
    hP: resolveResultId(resultMapHPoints, roundId),
    g: resolveResultId(resultMapG, roundId),
    gP: resolveResultId(resultMapGPoints, roundId),
  };

  // Einzelspieler-DOM aktualisieren
  if (ids.h) {
    const elH = document.getElementById(ids.h);
    const elHP = document.getElementById(ids.hP);
    if (elH) elH.textContent = `${homeScore}:${guestScore}`;
    if (elHP) elHP.textContent = `${homePoints}:${guestPoints}`;
  }
  if (ids.g) {
    const elG = document.getElementById(ids.g);
    const elGP = document.getElementById(ids.gP);
    if (elG) elG.textContent = `${guestScore}:${homeScore}`;
    if (elGP) elGP.textContent = `${guestPoints}:${homePoints}`;
  }

  // Gesamtwerte aller Spieler aktualisieren
  updateAllPlayerLegsAndPoints();
  updateFooterScores();

  // Input zurücksetzen und Dialog schließen
  inputResult.value = "";
  inputResult2.value = "";
  dialogResult.close();
}

closeDialogResult.addEventListener("click", applyResult);

dialogResult.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyResult();
  }
});

// -------------------- Input Validierung --------------------
document.addEventListener("DOMContentLoaded", () => {
  function allowOnly012(input) {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^012]/g, "");
      if (input.value.length > 1) input.value = input.value[0];
    });
  }

  allowOnly012(inputResult);
  allowOnly012(inputResult2);

  inputResult.addEventListener("input", () => {
    if (inputResult.value === "2")
      inputResult2.value = inputResult2.value.replace(/2/g, "");
  });
});

// -------------------- Spieler Summierung --------------------
function updateAllPlayerLegsAndPoints() {
  const players = [
    "h1",
    "h2",
    "h3",
    "h4",
    "he1",
    "he2",
    "g1",
    "g2",
    "g3",
    "g4",
    "ge1",
    "ge2",
  ];

  // Totals initialisieren (für Originalspieler)
  const totals = {};
  players.forEach((p) => {
    totals[p] = { home: 0, guest: 0, homePoints: 0, guestPoints: 0 };
  });

  // Alle Runden durchgehen und Originalspieler summieren
  for (const roundId in GameState.matchResults) {
    const r = GameState.matchResults[roundId];
    if (!r || !r.homePlayer || !r.guestPlayer) continue;

    const homeKey = r.homePlayer; // Originalspieler
    const guestKey = r.guestPlayer; // Originalspieler

    if (!totals[homeKey])
      totals[homeKey] = { home: 0, guest: 0, homePoints: 0, guestPoints: 0 };
    if (!totals[guestKey])
      totals[guestKey] = { home: 0, guest: 0, homePoints: 0, guestPoints: 0 };

    totals[homeKey].home += r.home;
    totals[homeKey].guest += r.guest;
    totals[homeKey].homePoints += r.homepoints;
    totals[homeKey].guestPoints += r.guestpoints;

    totals[guestKey].guest += r.guest;
    totals[guestKey].home += r.home;
    totals[guestKey].guestPoints += r.guestpoints;
    totals[guestKey].homePoints += r.homepoints;
  }

  // DOM-Felder aktualisieren
  players.forEach((p) => {
    // Für Anzeige prüfen, ob Spieler aktuell getauscht wurde
    const displayPlayer = GameState.activePlayerMap[p] || p;

    // Legs
    const elLegs = document.getElementById(`${displayPlayer}All`);
    if (elLegs && totals[p]) {
      elLegs.textContent = `${totals[p].home}:${totals[p].guest}`;
    }

    // Points
    const elPoints = document.getElementById(`${displayPlayer}AllP`);
    if (elPoints && totals[p]) {
      elPoints.textContent = `${totals[p].homePoints}:${totals[p].guestPoints}`;
    }
  });
}

// -------------------- Dropdown für Spielerwechsel --------------------
const chooseHomePlayer = document.querySelectorAll(".teamGamePlayersHome");
const chooseGuestPlayer = document.querySelectorAll(".teamGamePlayersGuest");
const dropDown = document.getElementById("myDropdown");
const dialog = document.getElementById("choosePlayerDialog");
const choosePlayerDialogClose = document.getElementById(
  "choosePlayerDialogBtn"
);

let currentPlayer = null;

function fillDropdown(playerArray) {
  dropDown.innerHTML = "";
  playerArray.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    dropDown.appendChild(option);
  });
}

function dialogChoosePlayer(targetEl) {
  dialog.show();
  dropDown.style.display = "block";

  dropDown.onchange = () => {
    currentPlayer = dropDown.value;
    targetEl.textContent = currentPlayer;
    dropDown.style.display = "none";
    dialog.close();
  };
}

chooseHomePlayer.forEach((el) =>
  el.addEventListener("click", () => {
    const homePlayer = ["h1", "h2", "h3", "h4", "he1", "he2"];
    fillDropdown(homePlayer);
    dialogChoosePlayer(el);
  })
);

chooseGuestPlayer.forEach((el) =>
  el.addEventListener("click", () => {
    const guestPlayer = ["g1", "g2", "g3", "g4", "ge1", "ge2"];
    fillDropdown(guestPlayer);
    dialogChoosePlayer(el);
  })
);

choosePlayerDialogClose.addEventListener("click", () => dialog.close());
