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

const resultMapHPoints = {
  r1g1: "h1r1P",
  r1g2: "h2r1P",
  r1g3: "h3r1P",
  r1g4: "h4r1P",
  r2g1: "h1r2P",
  r2g2: "h3r2P",
  r2g3: "h2r2P",
  r2g4: "h4r2P",
  r3g1: "h3r3P",
  r3g2: "h1r3P",
  r3g3: "h2r3P",
  r3g4: "h4r3P",
  r4g1: "h1r4P",
  r4g2: "h2r4P",
  r4g3: "h3r4P",
  r4g4: "h4r4P",
};

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

const resultMapGPoints = {
  r1g1: "g1r1P",
  r1g2: "g2r1P",
  r1g3: "g3r1P",
  r1g4: "g4r1P",
  r2g1: "g2r2P",
  r2g2: "g4r2P",
  r2g3: "g1r2P",
  r2g4: "g3r2P",
  r3g1: "g2r3P",
  r3g2: "g4r3P",
  r3g3: "g3r3P",
  r3g4: "g1r3P",
  r4g1: "g3r4P",
  r4g2: "g4r4P",
  r4g3: "g1r4P",
  r4g4: "g2r4P",
};

const resultMapAllHLegs = {
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

const resultMapAllHPoints = {
  r1g1: "h1AllP",
  r1g2: "h2AllP",
  r1g3: "h3AllP",
  r1g4: "h4AllP",
  r2g1: "h1AllP",
  r2g2: "h3AllP",
  r2g3: "h2AllP",
  r2g4: "h4AllP",
  r3g1: "h3AllP",
  r3g2: "h1AllP",
  r3g3: "h2AllP",
  r3g4: "h4AllP",
  r4g1: "h1AllP",
  r4g2: "h2AllP",
  r4g3: "h3AllP",
  r4g4: "h4AllP",
};

const resultMapAllGLegs = {
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

const resultMapAllGPoints = {
  r1g1: "g1AllP",
  r1g2: "g2AllP",
  r1g3: "g3AllP",
  r1g4: "g4AllP",
  r2g1: "g2AllP",
  r2g2: "g4AllP",
  r2g3: "g1AllP",
  r2g4: "g3AllP",
  r3g1: "g2AllP",
  r3g2: "g4AllP",
  r3g3: "g3AllP",
  r3g4: "g1AllP",
  r4g1: "g3AllP",
  r4g2: "g4AllP",
  r4g3: "g1AllP",
  r4g4: "g2AllP",
};

const legResult = document.querySelectorAll(".gmpl-container");
const dialogResult = document.getElementById("diaResult");
const inputResult = document.getElementById("inputResult");
const inputResult2 = document.getElementById("inputResult2");

const closeDialogResult = document.getElementById("ok-btn-result");

let currentResult = null;
let currentResult2 = null;

legResult.forEach((el) => {
  el.addEventListener("click", () => {
    currentResult = el.querySelector("p");
    currentResult2 = el.querySelector(".result");
    inputResult.value = "";
    inputResult2.value = "";
    dialogResult.show();
    inputResult.focus();
  });
});

let matchResults = {}; // { r1g1: { home: 0, guest: 0 }, ... }
Object.keys(resultMapH).forEach((roundId) => {
  matchResults[roundId] = { home: 0, guest: 0, homepoints: 0, guestpoints: 0 };
});

function applyResult() {
  if (!currentResult) return;

  const homeScore = parseInt(inputResult.value) || 0;
  const guestScore = parseInt(inputResult2.value) || 0;
  let homePoints = 0;
  let guestPoints = 0;
  const roundId = currentResult.id;

  if (homeScore >= 2) {
    homePoints = 1;
  } else if (homeScore <= 2) {
    homePoints = 0;
  }
  if (guestScore >= 2) {
    guestPoints = 1;
  } else if (guestScore <= 2) {
    guestPoints = 0;
  }
  // Ergebnis im Array speichern
  matchResults[roundId] = {
    home: homeScore,
    guest: guestScore,
    homepoints: homePoints,
    guestpoints: guestPoints,
  };

  // Spielerfeld aktualisieren

  currentResult2.textContent = `${homeScore}:${guestScore}`;

  // Ergebnisfelder anhand der Maps aktualisieren
  const resultIdH = resultMapH[roundId];
  const resultIdHPoints = resultMapHPoints[roundId];
  const resultIdG = resultMapG[roundId];
  const resultIdGPoints = resultMapGPoints[roundId];
  const resultAllHPoints = resultMapAllHPoints[roundId];
  const resultAllHLegs = resultMapAllHLegs[roundId];
  const resultAllGPoints = resultMapAllGPoints[roundId];
  const resultAllGLegs = resultMapAllGLegs[roundId];

  // Einzelspieler aktualisieren
  if (resultIdH) {
    const elH = document.getElementById(resultIdH);
    const elH2 = document.getElementById(resultIdHPoints);
    if (elH) elH.textContent = `${homeScore}:${guestScore}`;
    if (elH2) elH2.textContent = `${homePoints}:${guestPoints}`;
  }
  if (resultIdG) {
    const elG = document.getElementById(resultIdG);
    const elG2 = document.getElementById(resultIdGPoints);
    if (elG) elG.textContent = `${guestScore}:${homeScore}`;
    if (elG2) elG2.textContent = `${guestPoints}:${homePoints}`;
  }

  if (resultAllHLegs) {
    const elHLegs = document.getElementById(resultAllHLegs);
    const elHPoints = document.getElementById(resultAllHPoints);
    if (elHLegs) elHLegs.textContent = `${homeScore}:${guestScore}`;
    if (elHPoints) elHPoints.textContent = `${homePoints}:${guestPoints}`;
  }

  if (resultAllGLegs) {
    const elGLegs = document.getElementById(resultAllGLegs);
    const elGPoints = document.getElementById(resultAllGPoints);
    if (elGLegs) elGLegs.textContent = `${guestScore}:${homeScore}`;
    if (elGPoints) elGPoints.textContent = `${guestPoints}:${homePoints}`;
  }
  /*
  // Zähler aktualisieren (AllP)
  if (resultAllHPoints) {
    const elAllH = document.getElementById(resultAllHPoints);
    if (elAllH) {
      let counter = parseInt(elAllH.textContent) || 0;
      if (homeScore > 1) counter++;
      elAllH.textContent = counter;
    }
  }

  if (resultAllGPoints) {
    const elAllG = document.getElementById(resultAllGPoints);
    if (elAllG) {
      let counter = parseInt(elAllG.textContent) || 0;
      if (guestScore > 1) counter++;
      elAllG.textContent = counter;
    }
  }

  */
  console.log(matchResults);
  updateAllPlayerLegs();
  updateAllPlayerPoints();
  updateFooterScores();

  // Dialog zurücksetzen
  inputResult.value = "";
  inputResult2.value = "";
  dialogResult.close();
}

closeDialogResult.addEventListener("click", applyResult);

dialogResult.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyResult();
    updateAllPlayerLegs();
    updateAllPlayerPoints();
    updateFooterScores();
  }
});
/*
legResult.forEach((el) => {
  el.addEventListener("click", () => {
    currentResult = el.querySelector("p");
    inputResult.value = "";
    inputResult2.value = "";
    dialogResult.show();
    inputResult.focus();
  });
});
*/
document.addEventListener("DOMContentLoaded", () => {
  function allowOnly012(input) {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^012]/g, "");
      if (input.value.length > 1) input.value = input.value[0];
    });
  }

  // Input-Felder
  const input1 = document.getElementById("inputResult");
  const input2 = document.getElementById("inputResult2");

  // Grundregel: beide Inputs dürfen nur 0/1/2
  allowOnly012(input1);
  allowOnly012(input2);

  // Zusatzregel: Wenn im ersten Feld eine 2 steht → zweites Feld darf NICHT 2 sein
  input1.addEventListener("input", () => {
    if (input1.value === "2") {
      // Zweites Feld darf nur 0 oder 1 sein
      input2.value = input2.value.replace(/2/g, "");
    }

    if (input1.value === "0" || input1.value === "1") {
      // Zweites Feld darf 0,1,2
      input2.value = input2.value.replace(/[^012]/g, "");
    }
  });
});

// Auch beim Tippen im zweiten Feld überprüfen

function updateAllPlayerLegs() {
  const playerLegs = [
    "h1All",
    "h2All",
    "h3All",
    "h4All",
    "g1All",
    "g2All",
    "g3All",
    "g4All",
  ];

  for (const player of playerLegs) {
    const el = document.getElementById(player);
    if (!el) continue;

    // Filter runden für diesen Spieler
    const rounds = [
      ...Object.keys(resultMapAllHLegs).filter(
        (key) => resultMapAllHLegs[key] === player
      ),
      ...Object.keys(resultMapAllGLegs).filter(
        (key) => resultMapAllGLegs[key] === player
      ),
    ];

    // Summiere Legs
    let totalHome = 0;
    let totalGuest = 0;

    rounds.forEach((r) => {
      totalHome += matchResults[r].home || 0;
      totalGuest += matchResults[r].guest || 0;
    });

    if (player.startsWith("h")) {
      el.textContent = `${totalHome}:${totalGuest}`;
    } else {
      el.textContent = `${totalGuest}:${totalHome}`;
    }
  }
}

function updateAllPlayerPoints() {
  const playerPoints = [
    "h1AllP",
    "h2AllP",
    "h3AllP",
    "h4AllP",
    "g1AllP",
    "g2AllP",
    "g3AllP",
    "g4AllP",
  ];

  for (const player of playerPoints) {
    const el = document.getElementById(player);
    if (!el) continue;

    // Filter runden für diesen Spieler
    const rounds = [
      ...Object.keys(resultMapAllHPoints).filter(
        (key) => resultMapAllHPoints[key] === player
      ),
      ...Object.keys(resultMapAllGPoints).filter(
        (key) => resultMapAllGPoints[key] === player
      ),
    ];

    // Summiere Legs
    let totalHome = 0;
    let totalGuest = 0;

    rounds.forEach((r) => {
      totalHome += matchResults[r].homepoints || 0;
      totalGuest += matchResults[r].guestpoints || 0;
    });

    if (player.startsWith("h")) {
      el.textContent = `${totalHome}:${totalGuest}`;
    } else {
      el.textContent = `${totalGuest}:${totalHome}`;
    }
  }
}
