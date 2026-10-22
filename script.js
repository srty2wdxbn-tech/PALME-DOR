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
  appId: "1:808450248683:web:10bf43e54f7796264093ae",
  measurementId: "G-4WJ4QYEP88"
};

// Initialisation Firebase (Compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const stateRef = db.ref('palme_dor_state');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(reg => console.log('Service Worker enregistré:', reg.scope))
    .catch(err => console.error('Erreur Service Worker:', err));
}

const notifBanner = document.getElementById('notif-banner');
if (notifBanner && "Notification" in window && Notification.permission === "default") {
  notifBanner.classList.remove
