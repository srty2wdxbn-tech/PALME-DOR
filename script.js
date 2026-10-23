// ==========================================
// CONFIGURATION DES ALERTES DISCORD
// ==========================================
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1551679598251741324/FIa2Aeai9RSSVS4lXxb0acfEhbVKds0hQnGsSRVRH60jhscIBIzvqy7N7sa3atNsnio2";

const DISCORD_IDS = {
  "1805": "<@833857238741155860>", // Naatan
  "1942": "<@1134003126261776404>"  // Romain
};

async function envoyerAlerteDiscord(titre, message) {
  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `🚨 **${titre}**\n${message}` })
    });
  } catch (error) {
    console.error("Erreur réseau (Discord) :", error);
  }
}

// === TRAPPEUR D'ERREURS VISUEL POUR IPHONE ===
window.onerror = function(msg, url, line) {
  alert("Erreur JS : " + msg + " (Ligne " + line + ")");
};
window.addEventListener('unhandledrejection', function(event) {
  alert("Erreur Promesse : " + event.reason);
});

// Synchronisation Firebase en temps réel sécurisée
stateRef.on('value', (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const oldRequest = state.serviceRequest;
    const oldPlanning = state.planningRequest;
    const oldNotif = state.driverNotification;

    state = data;
  } else {
    // Si la base est vide, on initialise le nœud avec l'état par défaut
    stateRef.set(state).catch(err => console.error("Erreur d'initialisation Firebase :", err));
  }
  
  // On force l'affichage dans tous les cas pour éviter le blocage
  render();
  renderChat();
}, (error) => {
  console.error("Erreur de lecture Firebase :", error);
  // Même en cas d'erreur réseau, on force l'affichage local
  render();
});
