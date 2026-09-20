importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

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

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title  "PALMEDOR";
  const notificationOptions = {
    body: payload.notification.body  "Nouvelle information réseau",
    icon: './icon-512.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
