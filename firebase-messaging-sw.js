// Import des scripts compat Firebase v9 pour Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

// Initialisation de Firebase dans le Service Worker avec la même config
firebase.initializeApp({
  apiKey: "AIzaSyCACzjcG59VuWIGFjM2e0_fipK6hI3CXKY",
  authDomain: "espace-personnel---pdo.firebaseapp.com",
  databaseURL: "https://espace-personnel---pdo-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "espace-personnel---pdo",
  storageBucket: "espace-personnel---pdo.firebasestorage.app",
  messagingSenderId: "808450248683",
  appId: "1:808450248683:web:10bf43e54f7796264093ae"
});

const messaging = firebase.messaging();

// Gestionnaire de messages en arrière-plan (quand l'app est fermée ou en tâche de fond)
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Message reçu en arrière-plan : ", payload);

  const notificationTitle = payload.notification ? payload.notification.title : "PALMEDOR - Alerte Réseau";
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : "Nouvelle information sur le réseau.",
    icon: "/icon-512.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Action au clic sur la notification (ouvre ou ramène l'application au premier plan)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
