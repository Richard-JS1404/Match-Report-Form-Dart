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

const resultMapAllH = {
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

const resultMapAllG = {
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

legResult.forEach((el) => {
  el.addEventListener("click", () => {
    currentResult = el.querySelector("p");
    inputResult.value = "";
    inputResult2.value = "";
    dialogResult.show();
    inputResult.focus();
  });
});

let matchResults = {}; // { r1g1: { home: 0, guest: 0 }, ... }
Object.keys(resultMapH).forEach((roundId) => {
  matchResults[roundId] = { home: 0, guest: 0 };
});

function applyResult() {
  if (!currentResult) return;

  const homeScore = parseInt(inputResult.value) || 0;
  const guestScore = parseInt(inputResult2.value) || 0;

  const roundId = currentResult.id;

  // Ergebnis im Array speichern
  matchResults[roundId] = { home: homeScore, guest: guestScore };

  // Spielerfeld aktualisieren
  currentResult.textContent =
    currentResult.textContent + `${homeScore}:${guestScore}`;

  // Ergebnisfelder anhand der Maps aktualisieren
  const resultIdH = resultMapH[roundId];
  const resultIdG = resultMapG[roundId];
  const resultAllH = resultMapAllH[roundId];
  const resultAllG = resultMapAllG[roundId];

  // Einzelspieler aktualisieren
  if (resultIdH) {
    const elH = document.getElementById(resultIdH);
    if (elH) elH.textContent = `${homeScore}:${guestScore}`;
  }
  if (resultIdG) {
    const elG = document.getElementById(resultIdG);
    if (elG) elG.textContent = `${guestScore}:${homeScore}`;
  }

  // Zähler aktualisieren (AllP)
  if (resultAllH) {
    const elAllH = document.getElementById(resultAllH);
    if (elAllH) {
      let counter = parseInt(elAllH.textContent) || 0;
      if (homeScore > 1) counter++;
      elAllH.textContent = counter;
    }
  }

  if (resultAllG) {
    const elAllG = document.getElementById(resultAllG);
    if (elAllG) {
      let counter = parseInt(elAllG.textContent) || 0;
      if (guestScore > 1) counter++;
      elAllG.textContent = counter;
    }
  }
  console.log(matchResults);

  // Dialog zurücksetzen
  inputResult.value = "";
  inputResult2.value = "";
  dialogResult.close();
}

closeDialogResult.addEventListener("click", applyResult);

legResult.forEach((el) => {
  el.addEventListener("click", () => {
    currentResult = el.querySelector("p");
    inputResult.value = "";
    inputResult2.value = "";
    dialogResult.show();
    inputResult.focus();
  });
});
