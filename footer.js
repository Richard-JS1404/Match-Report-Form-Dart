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
  const teamGameHome = GameState.teamGameResults?.home || 0;
  const teamGameGuest = GameState.teamGameResults?.guest || 0;

  if (elHome)
    elHome.textContent = `${totalHome + teamGameHome}:${
      totalGuest + teamGameGuest
    }`;
  if (elGuest)
    elGuest.textContent = `${totalGuest + teamGameGuest}:${
      totalHome + teamGameHome
    }`;

  console.log(teamGameHome);
  console.log(teamGameGuest);
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
  const teamGameHomePoints = GameState.teamGameResults?.homepoints || 0;
  const teamGameGuestPoints = GameState.teamGameResults?.guestpoints || 0;

  if (elHome)
    elHome.textContent = `${totalHome + teamGameHomePoints}:${
      totalGuest + teamGameGuestPoints
    }`;
  if (elGuest)
    elGuest.textContent = `${totalGuest + teamGameGuestPoints}:${
      totalHome + teamGameHomePoints
    }`;

  if (totalHome + teamGameHomePoints === 8) {
    elHomePoint.textContent = 1;
  } else if (totalHome + teamGameHomePoints > 8) {
    elHomePoint.textContent = 2;
  } else {
    elHomePoint.textContent = 0;
  }

  if (totalGuest + teamGameGuestPoints === 8) {
    elGuestPoint.textContent = 1;
  } else if (totalGuest + teamGameGuestPoints > 8) {
    elGuestPoint.textContent = 2;
  } else {
    elGuestPoint.textContent = 0;
  }
}
