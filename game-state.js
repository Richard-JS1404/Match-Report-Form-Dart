// Globaler Game State
const GameState = {
  // Spielerdaten
  teams: [],
  captains: [],
  homePlayer: [],
  guestPlayer: [],
  homeSubstitudePlayer: [],
  guestSubstitudePlayer: [],

  // Spielerwechsel: { h1: "he1", g2: "ge2" }
  activePlayerMap: {},

  // Match-Ergebnisse
  matchResults: {},
};

// Hilfsfunktionen
function resolvePlayerId(playerId) {
  return GameState.activePlayerMap[playerId] || playerId;
}

function getActivePlayer(basePlayer) {
  return GameState.activePlayerMap[basePlayer] || basePlayer;
}

// Initialisierung der Match-Ergebnisse
function initMatchResults() {
  const rounds = [
    "r1g1",
    "r1g2",
    "r1g3",
    "r1g4",
    "r2g1",
    "r2g2",
    "r2g3",
    "r2g4",
    "r3g1",
    "r3g2",
    "r3g3",
    "r3g4",
    "r4g1",
    "r4g2",
    "r4g3",
    "r4g4",
  ];

  rounds.forEach((roundId) => {
    GameState.matchResults[roundId] = {
      home: 0,
      guest: 0,
      homepoints: 0,
      guestpoints: 0,
      homePlayer: null,
      guestPlayer: null,
    };
  });
}

// Beim Laden initialisieren
initMatchResults();
