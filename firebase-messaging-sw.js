importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCACzjcG59VuWIGFjM2e0_fipK6hI3CXKY",
  authDomain: "espace-personnel---pdo.firebaseapp.com",
  databaseURL: "https://espace-personnel---pdo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "espace-personnel---pdo",
  storageBucket: "espace-personnel---pdo.firebasestorage.app",
  messagingSenderId: "808450248683",
  appId: "1:808450248683:web:10bf43e54f7796264093ae",
  measurementId: "G-4WJ4QYEP88"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Message reçu en arrière-plan :', payload);
  const notificationTitle = payload.notification ? payload.notification.title : "PDORegul";
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : "Nouvelle alerte du réseau",
    icon: '/icon-512.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
