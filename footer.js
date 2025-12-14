const date = document.querySelector(".date");

const today = new Date();
const formatted = today.toLocaleDateString("de-DE");

date.textContent = formatted;

function updateFooterScores() {
  let totalHome = 0;
  let totalGuest = 0;

  // Alle Runden durchlaufen
  Object.keys(GameState.matchResults).forEach((r) => {
    totalHome += GameState.matchResults[r].home || 0;
    totalGuest += GameState.matchResults[r].guest || 0;
  });

  // Ausgeben in Footer
  const elHome = document.getElementById("footerLegsHome");
  const elGuest = document.getElementById("footerLegsGuest");

  if (elHome) elHome.textContent = `${totalHome}:${totalGuest}`;
  if (elGuest) elGuest.textContent = `${totalGuest}:${totalHome}`;
}

function updateFooterScores1() {
  let totalHome = 0;
  let totalGuest = 0;

  // Alle Runden durchlaufen
  Object.keys(GameState.matchResults).forEach((r) => {
    totalHome += GameState.matchResults[r].homepoints || 0;
    totalGuest += GameState.matchResults[r].guestpoints || 0;
  });

  // Ausgeben in Footer
  const elHome = document.getElementById("footerSetsHome");
  const elGuest = document.getElementById("footerSetsGuest");
  const elHomePoint = document.getElementById("footerPointsHome");
  const elGuestPoint = document.getElementById("footerPointsGuest");

  if (elHome) elHome.textContent = `${totalHome}:${totalGuest}`;
  if (elGuest) elGuest.textContent = `${totalGuest}:${totalHome}`;

  if (totalHome === 8) {
    elHomePoint.textContent = 1;
  } else if (totalHome > 8) {
    elHomePoint.textContent = 2;
  } else {
    elHomePoint.textContent = 0;
  }

  if (totalGuest === 8) {
    elGuestPoint.textContent = 1;
  } else if (totalGuest > 8) {
    elGuestPoint.textContent = 2;
  } else {
    elGuestPoint.textContent = 0;
  }
}
