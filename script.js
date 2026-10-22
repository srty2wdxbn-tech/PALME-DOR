// ==========================================
// CONFIGURATION DES ALERTES DISCORD (IPHONE)
// ==========================================
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1551679598251741324/FIa2Aeai9RSSVS4lXxb0acfEhbVKds0hQnGsSRVRH60jhscIBIzvqy7N7sa3atNsnio2";

// Les IDs Discord des utilisateurs pour les pings automatiques
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

// ==========================================
// CONFIGURATION FIREBASE & APPLICATION
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyCACzjcG59VuWIGFjM2e0_fipK6hI3CXKY",
    authDomain: "espace-personnel---pdo.firebaseapp.com",
    databaseURL: "https://espace-personnel---pdo-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "espace-personnel---pdo",
    storageBucket: "espace-personnel---pdo.firebasestorage.app",
    messagingSenderId: "808450248683",
    appId: "1:808450248683:web:10bf43e54f7796264093ae"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const stateRef = db.ref('palme_dor_state');
  const messaging = firebase.messaging();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
      .then(reg => console.log('Service Worker enregistré:', reg.scope))
      .catch(err => console.error('Erreur Service Worker:', err));
  }

  const notifBanner = document.getElementById('notif-banner');
  if ("Notification" in window && Notification.permission === "default") {
    notifBanner.classList.remove('hidden');
  }

  document.getElementById('enable-notif-btn').addEventListener('click', async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        notifBanner.classList.add('hidden');
        new Notification("PDORegul", { body: "Notifications activées !" });
      } else {
        alert("Notifications refusées.");
      }
    } catch (e) {
      console.error(e);
    }
  });

  const LIGNES = [
    { id: 'AUCUNE', nom: 'Aucune ligne ne vous est assignée pour aujourd’hui', badge: '∅', bg: '#64748b', text: '#ffffff' },
    { id: '2', nom: 'Salérin Graudegnan <> Beaulieu - Rosa Parks', badge: '2', bg: '#00adff', text: '#ffffff' },
    { id: 'C13', nom: 'MONFORT Beausoleil <> Salérin Gare', badge: 'C13', bg: '#ccc800', text: '#000000' },
    { id: '14', nom: 'CFA <> MONFORT Coedic', badge: '14', bg: '#a82249', text: '#ffffff' },
    { id: '15', nom: 'Palais de Justice <> Stade de Verfontaine', badge: '15', bg: '#16a34a', text: '#ffffff' },
    { id: '16', nom: 'CFA <> Hôtel de Ville', badge: '16', bg: '#a82292', text: '#ffffff' },
    { id: '17', nom: 'Verfontaine <> Salérin Leclerc Graudegnan', badge: '17', bg: '#4ebf8a', text: '#ffffff' },
    { id: '19', nom: 'Collège Notre Dame <> Hôtel de Ville', badge: '19', bg: '#441a5e', text: '#ffffff' },
    { id: 'C20', nom: 'Kerfaïence <> Jardin des Val', badge: 'C20', bg: '#00ccbd', text: '#ffffff' },
    { id: '21', nom: 'P+R Ronoé <> Thiers - Victor Hugo', badge: '21', bg: '#1e40af', text: '#ffffff' },
    { id: 'C23', nom: 'Mendès France <> Jardin des Val', badge: 'C23', bg: '#0092ff', text: '#ffffff' },
    { id: 'C24', nom: 'Thiers - Victor Hugo (circulaire)', badge: 'C24', bg: '#006fa8', text: '#ffffff' },
    { id: '25', nom: 'Verfontaine <> Salérin Leclerc Graudegnan', badge: '25', bg: '#003652', text: '#ffffff' },
    { id: '200', nom: 'Collège Dreyfus <> Salérin Leclerc Graudegnan', badge: '200', bg: '#1ec9a7', text: '#ffffff' },
    { id: '201', nom: 'Collège Dreyfus <> Verfontaine', badge: '201', bg: '#3693a8', text: '#000000' },
    { id: '204', nom: 'Maison Blanche <> CFA <> Verfontaine', badge: '204', bg: '#4a8bba', text: '#000000' },
    { id: '207', nom: 'Salérin Gare <> La Gachet <> Église de Salvaris', badge: '207', bg: '#ff6161', text: '#000000' },
    { id: 'U', nom: 'Maison Blanche <> Restaurant Universitaire', badge: 'U', bg: '#d90000', text: '#ffffff' },
    { id: 'N2', nom: 'Maison Blanche <> Jardin des Val', badge: 'N2', bg: '#341191', text: '#ffcc00' },
    { id: 'P1', nom: 'Stade <> P+R Jardins', badge: 'P1', bg: '#ff0000', text: '#ffffff' },
    { id: 'P2', nom: 'Stade <> Verfontaine', badge: 'P2', bg: '#00aeff', text: '#ffffff' },
    { id: 'P3', nom: 'Stade <> Salérin Leclerc Graudegnan', badge: 'P3', bg: '#ff7b00', text: '#ffffff' }
  ];

  const FLEET_RAW =
