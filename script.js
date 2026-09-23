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
    { id: 'C20', nom: 'Kerfaïence <> Jardin des Val', badge: 'C20', bg: '#38bdf8', text: '#ffffff' },
    { id: '21', nom: 'P+R Ronoé <> Thiers - Victor Hugo', badge: '21', bg: '#1e40af', text: '#ffffff' },
    { id: 'C23', nom: 'Mendès France <> Jardin des Val', badge: 'C23', bg: '#bae6fd', text: '#ffffff' },
    { id: 'C24', nom: 'Thiers - Victor Hugo (circulaire)', badge: 'C24', bg: '#006fa8', text: '#ffffff' },
    { id: '25', nom: 'Verfontaine <> Salérin Leclerc Graudegnan', badge: '25', bg: '#003652', text: '#ffffff' },
    { id: '200', nom: 'Collège Dreyfus <> Salérin Leclerc Graudegnan', badge: '200', bg: '#1ec9a7', text: '#ffffff' },
    { id: '201', nom: 'Collège Dreyfus <> Verfontaine', badge: '201', bg: '#3693a8', text: '#000000' },
    { id: '204', nom: 'Maison Blanche <> CFA <> Verfontaine', badge: '204', bg: '#61ddff', text: '#000000' },
    { id: '207', nom: 'Salérin Gare <> La Gachet <> Église de Salvaris', badge: '207', bg: '#ff6161', text: '#000000' },
    { id: 'U', nom: 'Maison Blanche <> Restaurant Universitaire', badge: 'U', bg: '#d90000', text: '#ffffff' },
    { id: 'N2', nom: 'Maison Blanche <> Jardin des Val', badge: 'N2', bg: '#341191', text: '#ffffff' },
    { id: 'P1', nom: 'Stade <> P+R Jardins', badge: 'P1', bg: '#ff0000', text: '#ffffff' },
    { id: 'P2', nom: 'Stade <> Verfontaine', badge: 'P2', bg: '#00aeff', text: '#ffffff' },
    { id: 'P3', nom: 'Stade <> Salérin Leclerc Graudegnan', badge: 'P3', bg: '#ff7b00', text: '#ffffff' }
  ];

  const FLEET_RAW = [
    { num: "Aucun", model: "Aucun véhicule ne vous est assigné pour aujourd’hui" },
    { num: 1121, model: "Midibus - HeuliezBus GX137 L" }, { num: 1122, model: "Midibus - HeuliezBus GX137 L" },
    { num: 1123, model: "Midibus - HeuliezBus GX137 L" }, { num: 1131, model: "Midibus - Heuliez GX137 ELEC" },
    { num: 1132, model: "Midibus - Heuliez GX137 ELEC" }, { num: 1191, model: "Standard - HeuliezBus GX427 GNV" },
    { num: 1192, model: "Articulé - HeuliezBus GX427 GNV" }, { num: 1193, model: "Articulé - HeuliezBus GX427 GNV" },
    { num: 1194, model: "Articulé - HeuliezBus GX427 GNV" }, { num: 1235, model: "Standard - Mercedes-Benz Citaro Facelift" },
    { num: 1236, model: "Standard - Mercedes-Benz Citaro Facelift" }, { num: 1237, model: "Standard - Mercedes-Benz Citaro Facelift" },
    { num: 1238, model: "Standard - Mercedes-Benz Citaro Facelift" }, { num: 1239, model: "Standard - Mercedes-Benz Citaro Facelift" },
    { num: 1241, model: "Standard - Irisbus Citelis 12 €5" }, { num: 1242, model: "Standard - Irisbus Citelis 12 €5" },
    { num: 1243, model: "Standard - Irisbus Citelis 12 €5" }, { num: 1251, model: "Standard - Irisbus Citelis 12 EEV" },
    { num: 1252, model: "Standard - Irisbus Citelis 12 EEV" }, { num: 1253, model: "Standard - Irisbus Citelis 12 EEV" },
    { num: 1254, model: "Standard - Irisbus Citelis 12 EEV" }, { num: 1255, model: "Standard - Irisbus Citelis 12 EEV" },
    { num: 1256, model: "Standard - Irisbus Citelis 12 EEV" }, { num: 1257, model: "Standard - Irisbus Citelis 12 EEV" },
    { num: 1258, model: "Standard - Irisbus Citelis 12 EEV" }, { num: 1259, model: "Standard - Irisbus Citelis 12 EEV" },
    { num: 1401, model: "Standard - Setra S415 NF" }, { num: 1402, model: "Standard - Setra S415 NF" },
    { num: 1403, model: "Standard - Setra S415 NF" }, { num: 1636, model: "Standard - Iveco Urbanway 12 Tector" },
    { num: 1637, model: "Standard - Iveco Urbanway 12 Tector" }, { num: 1638, model: "Standard - Iveco Urbanway 12 Tector" },
    { num: 1639, model: "Standard - Iveco Urbanway 12 Tector" }, { num: 1640, model: "Standard - Iveco Urbanway 12 GNV Cursor 8" },
    { num: 1641, model: "Standard - Iveco Urbanway 12 GNV Cursor 8" }, { num: 1651, model: "Autocar LE - Irisbus Crossway LE" },
    { num: 1671, model: "Autocar LE - Iveco Crossway LE" }, { num: 1672, model: "Autocar LE - Iveco Crossway LE" },
    { num: 1701, model: "Autocar LE - Iveco Crossway LE CNG" }, { num: 1702, model: "Autocar LE - Iveco Crossway LE CNG" },
    { num: 1703, model: "Autocar LE - Iveco Crossway LE CNG" }, { num: 1708, model: "Standard - Temsa Avenue LF12" },
    { num: 1709, model: "Standard - Temsa Avenue LF12" }, { num: 1850, model: "Standard - MAN Lions City A37" },
    { num: 1851, model: "Standard - MAN Lions City A37" }, { num: 1852, model: "Standard - MAN Lions City A37" },
    { num: 1853, model: "Standard - MAN Lions City A37" }, { num: 1854, model: "Standard - MAN Lions City A37" },
    { num: 1855, model: "Standard - MAN Lions City A37" }, { num: 1891, model: "Standard - HeuliezBus GX327" },
    { num: 1892, model: "Standard - HeuliezBus GX327" }, { num: 1893, model: "Standard - HeuliezBus GX327" },
    { num: 1894, model: "Standard - HeuliezBus GX327" }, { num: 1895, model: "Standard - HeuliezBus GX327" },
    { num: 1896, model: "Standard - HeuliezBus GX327" }, { num: 1897, model: "Standard - HeuliezBus GX327" },
    { num: 1902, model: "Standard - HeuliezBus GX337" }, { num: 1905, model: "Standard - Solaris Urbino 12 CNG" },
    { num: 1906, model: "Standard - Solaris Urbino 12 CNG" }, { num: 1907, model: "Standard - Solaris Urbino 12 CNG" },
    { num: 1908, model: "Standard - Solaris Urbino 12 CNG" }, { num: 1909, model: "Standard - Solaris Urbino 12 CNG" },
    { num: 1910, model: "Standard - Mercedes Citaro C2" }, { num: 1911, model: "Standard - Heuliez GX337 ELEC" },
    { num: 1912, model: "Standard - Heuliez GX337 ELEC" }, { num: 1913, model: "Standard - Heuliez GX337 ELEC" },
    { num: 1914, model: "Standard - Heuliez GX337 ELEC" }, { num: 1915, model: "Standard - Heuliez GX337 ELEC" },
    { num: 1921, model: "Standard - Iveco Urbanway 12 CNG BHNS New Face" }, { num: 1922, model: "Standard - Iveco Urbanway 12 CNG BHNS New Face" },
    { num: 1923, model: "Standard - Iveco Urbanway 12 CNG BHNS New Face" }, { num: 1924, model: "Standard - Iveco Urbanway 12 CNG BHNS New Face" },
    { num: 1925, model: "Standard - Iveco Urbanway 12 CNG Hybrid New Face" }, { num: 1926, model: "Standard - Iveco Urbanway 12 CNG Hybrid New Face" },
    { num: 1301, model: "Articulé - Mercedes-Benz Citaro Facelift G" }, { num: 1861, model: "Articulé - Irisbus Citelis 18" },
    { num: 1862, model: "Articulé - Irisbus Citelis 18" }, { num: 1863, model: "Articulé - Irisbus Citelis 18" },
    { num: 1864, model: "Articulé - Irisbus Citelis 18" }, { num: 1865, model: "Articulé - Irisbus Citelis 18" },
    { num: 1866, model: "Articulé - Irisbus Citelis 18" }, { num: 1867, model: "Articulé - Irisbus Citelis 18" },
    { num: 1868, model: "Articulé - Irisbus Citelis 18" }, { num: 1869, model: "Articulé - Irisbus Citelis 18" },
    { num: 1870, model: "Articulé - Irisbus Citelis 18" }, { num: 1871, model: "Articulé - Mercedes Citaro GC2" },
    { num: 1872, model: "Articulé - Mercedes Citaro GC2" }, { num: 1873, model: "Articulé - Mercedes Citaro GC2" },
    { num: 1874, model: "Articulé - Mercedes Citaro GC2" }, { num: 1875, model: "Articulé - Mercedes Citaro GC2" },
    { num: 1876, model: "Articulé - Mercedes Citaro GC2" }, { num: 1877, model: "Articulé - Mercedes Citaro GC2" },
    { num: 1878, model: "Articulé - Mercedes Citaro GC2" }, { num: 1879, model: "Articulé - Mercedes Citaro GC2" },
    { num: 1880, model: "Articulé - Mercedes Citaro GC2" }, { num: 1881, model: "Articulé - Mercedes Citaro GC2" },
    { num: 1882, model: "Articulé - Mercedes Citaro GC2" }, { num: 1883, model: "Articulé - Mercedes Citaro GC2" },
    { num: 2371, model: "Articulé - Iveco Urbanway 18 CNG Hybrid" }, { num: 2372, model: "Articulé - Iveco Urbanway 18 CNG Hybrid" },
    { num: 2373, model: "Articulé - Iveco Urbanway 18 CNG Hybrid" }, { num: 2374, model: "Articulé - Iveco Urbanway 18 CNG Hybrid" },
    { num: 2375, model: "Articulé - Iveco Urbanway 18 CNG Hybrid" }, { num: 2376, model: "Articulé - Iveco Urbanway 18 CNG Hybrid" },
    { num: 2377, model: "Articulé - Iveco Urbanway 18 CNG Hybrid" }, { num: 2378, model: "Articulé - Iveco Urbanway 18 CNG Hybrid" },
    { num: 2379, model: "Articulé - Iveco Urbanway 18 CNG Hybrid" }, { num: 2401, model: "Articulé - Solaris Urbino 18 Electric" },
    { num: 2402, model: "Articulé - Solaris Urbino 18 Electric" }, { num: 2403, model: "Articulé - Solaris Urbino 18 Electric" },
    { num: 2404, model: "Articulé - Solaris Urbino 18 Electric" }, { num: 2405, model: "Articulé - Solaris Urbino 18 Electric" },
    { num: 2406, model: "Articulé - Solaris Urbino 18 Electric" }, { num: 2407, model: "Articulé - Solaris Urbino 18 Electric" },
    { num: 2408, model: "Articulé - Solaris Urbino 18 Electric" }, { num: 2409, model: "Articulé - Solaris Urbino 18 Electric" },
    { num: 2410, model: "Articulé - Solaris Urbino 18 Electric" }, { num: 2411, model: "Articulé - Solaris Urbino 18 Electric" },
    { num: 2412, model: "Articulé - Solaris Urbino 18 Electric" }, { num: 3231, model: "Autocar - Mercedes Intouro L" },
    { num: 3232, model: "Autocar - Mercedes Intouro L" }, { num: 3233, model: "Autocar - Mercedes Intouro L" },
    { num: 3236, model: "Autocar - Iveco Crossway Line Tector 7" }, { num: 3237, model: "Autocar - Iveco Crossway Line Tector 7" },
    { num: 3238, model: "Autocar - Iveco Crossway Line CNG" }, { num: 3239, model: "Autocar - Iveco Crossway Line CNG" },
    { num: 3240, model: "Autocar - Iveco Crossway Line CNG" }, { num: 3511, model: "Autocar LE - Iveco Crossway LE ELEC" },
    { num: 3512, model: "Autocar LE - Iveco Crossway LE ELEC" }
  ];

  const aucunVehicule = FLEET_RAW.shift();
  FLEET_RAW.sort((a, b) => a.num - b.num);
  FLEET_RAW.unshift(aucunVehicule);
  const VEHICULES = FLEET_RAW.map(v => v.num === "Aucun" ? v.model : `${v.num} - ${v.model}`);

  const USERS = {
    "1805": { name: "VERNES-FLACHEY Naatan", role: "REGULATEUR" },
    "1942": { name: "DESVIGNES Romain", role: "CONDUCTEUR" }
  };

  let state = {
    ligneId: '2',
    bus: '1910 - Standard - Mercedes Citaro C2',
    prise: '06:15',
    fin: '14:30',
    notes: 'Vérifier le matériel embarqué au dépôt.',
    alerte: '',
    loginInfo: 'Module de prise de service optimisé. 🚍⚡',
    loginLines: [],
    splashLogo: '',
    busPhoto: '',
    regulatorPhoto: '',
    driverPhoto: '',
    pdfData: '',
    pdfName: '',
    serviceRequest: null,
    planningRequest: null,
    serviceVersion: 1,
    messages: []
  };

  let currentUser = null;
  let localServiceVersion = 1;
  let isManualFallbackActive = false;
  let isManualPlanningFallbackActive = false;

  let activeService = null;
  let activeServiceTimer = null;

  // ==========================================
  // GESTION DU MODE SOMBRE (DARK MODE)
  // ==========================================
  function initDarkMode() {
    const savedTheme = localStorage.getItem('pdo_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  window.toggleDarkMode = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pdo_theme', newTheme);
  };

  initDarkMode();

  function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('tab-' + tabId).classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.closest('.nav-item').classList.add('active');

    if (tabId === 'history' && currentUser) {
      renderHistory();
    }
    if (tabId === 'chat') {
      renderChat();
    }
  }

  const selectLigne = document.getElementById('select-ligne');
  LIGNES.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.id;
    opt.textContent = l.id === 'AUCUNE' ? l.nom : `Ligne ${l.badge} : ${l.nom}`;
    selectLigne.appendChild(opt);
  });

  const selectBus = document.getElementById('select-bus');
  VEHICULES.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    selectBus.appendChild(opt);
  });

  const checkboxesContainer = document.getElementById('login-lines-checkboxes');
  LIGNES.forEach(l => {
    if (l.id !== 'AUCUNE') {
      const label = document.createElement('label');
      label.className = 'checkbox-item';
      label.innerHTML = `<input type="checkbox" value="${l.id}" class="login-line-chk"> L.${l.badge}`;
      checkboxesContainer.appendChild(label);
    }
  });

  stateRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const oldRequest = state.serviceRequest;
      const oldPlanning = state.planningRequest;
      state = data;
      render();
      renderChat();

      if (currentUser && currentUser.role === 'REGULATEUR') {
        if (state.serviceRequest && state.serviceRequest.status === 'pending') {
          if (!oldRequest || oldRequest.timestamp !== state.serviceRequest.timestamp) {
            new Notification("🚨 Alerte PCC", { body: "Conducteur 1942 vous demande un service !" });
          }
        }
        if (state.planningRequest && state.planningRequest.status === 'pending') {
          if (!oldPlanning || oldPlanning.timestamp !== state.planningRequest.timestamp) {
            new Notification("🗓️ Demande de Planning", { body: "Romain demande une modification de planning !" });
          }
        }
      }

      if (currentUser && currentUser.role === 'CONDUCTEUR') {
        if (oldRequest && oldRequest.status === 'pending' && state.serviceRequest) {
          if (state.serviceRequest.status === 'accepted') {
            new Notification("✅ Prise de service acceptée", { body: `Votre véhicule ${state.serviceRequest.busNum} est validé !` });
            startActiveService({
              ligne: state.serviceRequest.ligne,
              bus: `Bus ${state.serviceRequest.busNum}`,
              lieu: state.serviceRequest.lieu
            });
          } else if (state.serviceRequest.status === 'refused') {
            new Notification("❌ Prise de service refusée", { body: `Votre demande a été refusée par le régulateur.` });
          }
        }

        if (oldPlanning && oldPlanning.status === 'pending' && state.planningRequest) {
          if (state.planningRequest.status === 'accepted') {
            new Notification("✅ Planning accepté", { body: "Votre demande de planning a été validée !" });
          } else if (state.planningRequest.status === 'refused') {
            new Notification("❌ Planning refusé", { body: "Votre demande de planning a été refusée." });
          }
        }

        if (state.serviceVersion > localServiceVersion) {
          localServiceVersion = state.serviceVersion;
          new Notification("📄 Mise à jour de service", { body: "Votre prochaine fiche de service est disponible !" });
        }
      }
    }
  });

  let tempSplashLogo = '';
  let tempBusPhoto = '';
  let tempRegulatorPhoto = '';
  let tempDriverPhoto = '';
  let tempPdfData = '';
  let tempPdfName = '';

  function bindImageImport(elementId, callback) {
    const el = document.getElementById(elementId);
    if (el) {
      el.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(evt) { callback(evt.target.result); };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  bindImageImport('input-splash-logo', val => tempSplashLogo = val);
  bindImageImport('input-bus-photo', val => tempBusPhoto = val);
  bindImageImport('input-regulator-photo', val => tempRegulatorPhoto = val);
  bindImageImport('input-driver-photo', val => tempDriverPhoto = val);

  document.getElementById('input-pdf-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      tempPdfName = file.name;
      const reader = new FileReader();
      reader.onload = function(evt) { tempPdfData = evt.target.result; };
      reader.readAsDataURL(file);
    }
  });

  // ==========================================
  // GESTION DE LA MESSAGERIE (V2)
  // ==========================================
  function renderChat() {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    const messages = state.messages || [];
    if (messages.length === 0) {
      container.innerHTML = `<p style="font-size: 12px; color: #94a3b8; text-align: center; margin: auto;">Aucun message pour le moment. Lancez la discussion !</p>`;
      return;
    }

    container.innerHTML = '';
    messages.forEach(msg => {
      const userCode = Object.keys(USERS).find(k => USERS[k].name === currentUser?.name);
      const isMe = currentUser && msg.senderCode === userCode;
      
      const div = document.createElement('div');
      div.style.cssText = `
        max-width: 80%;
        padding: 8px 12px;
        border-radius: 10px;
        font-size: 13px;
        line-height: 1.4;
        align-self: ${isMe ? 'flex-end' : 'flex-start'};
        background: ${isMe ? 'var(--chat-bubble-me)' : 'var(--chat-bubble-other)'};
        border: 1px solid var(--border);
        color: var(--text);
      `;
      
      div.innerHTML = `
        <div style="font-size: 10px; font-weight: bold; color: var(--primary); margin-bottom: 2px;">${msg.senderName}</div>
        <div>${msg.text}</div>
        <div style="font-size: 9px; color: #94a3b8; text-align: right; margin-top: 2px;">${msg.time}</div>
      `;
      container.appendChild(div);
    });

    container.scrollTop = container.scrollHeight;
  }

  document.getElementById('chat-send-btn').addEventListener('click', envoyerMessageChat);
  document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') envoyerMessageChat();
  });

  function envoyerMessageChat() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || !currentUser) return;

    const userCode = Object.keys(USERS).find(k => USERS[k].name === currentUser.name);
    const timeFormatted = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    const nouveauMessage = {
      senderCode: userCode,
      senderName: currentUser.name,
      text: text,
      time: timeFormatted,
      timestamp: Date.now()
    };

    if (!state.messages) state.messages = [];
    state.messages.push(nouveauMessage);

    if (state.messages.length > 50) {
      state.messages = state.messages.slice(state.messages.length - 50);
    }

    stateRef.set(state).then(() => {
      input.value = '';
      const destinataireId = userCode === "1805" ? DISCORD_IDS["1942"] : DISCORD_IDS["1805"];

      envoyerAlerteDiscord(
        "💬 Nouveau message PDORegul",
        `${destinataireId} **${currentUser.name}** vous a envoyé un message :\n> "${text}"`
      );
    }).catch(err => {
      console.error("Erreur d'envoi de message :", err);
    });
  }

  // ==========================================
  // GESTION DU SERVICE ACTIF & HISTORIQUE (V2)
  // ==========================================
  function startActiveService(details) {
    const startTime = Date.now();
    activeService = {
      ligne: details.ligne,
      bus: details.bus,
      lieu: details.lieu || 'Service PCC / Dépôt',
      startTime: startTime,
      startDateFormatted: new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }),
      startTimeFormatted: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    sessionStorage.setItem('pdo_active_service_' + localStorage.getItem('palme_dor_user'), JSON.stringify(activeService));
    
    runActiveServiceTimer();
    render();
  }

  function runActiveServiceTimer() {
    if (activeServiceTimer) clearInterval(activeServiceTimer);
    const sinceTxt = document.getElementById('active-since-txt');
    if (!sinceTxt) return;

    function updateTimer() {
      if (!activeService) return;
      const diffSec = Math.floor((Date.now() - activeService.startTime) / 1000);
      const hours = Math.floor(diffSec / 3600);
      const minutes = Math.floor((diffSec % 3600) / 60);
      const seconds = diffSec % 60;
      sinceTxt.textContent = `En service depuis ${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s (${activeService.startTimeFormatted})`;
    }
    updateTimer();
    activeServiceTimer = setInterval(updateTimer, 1000);
  }

  function endActiveService() {
    if (!activeService) return;
    if (activeServiceTimer) clearInterval(activeServiceTimer);

    const endTimeFormatted = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const completedService = {
      day: activeService.startDateFormatted,
      ligne: activeService.ligne,
      bus: activeService.bus,
      start: activeService.startTimeFormatted,
      end: endTimeFormatted,
      timestamp: Date.now()
    };

    const userCode = localStorage.getItem('palme_dor_user');
    const storageKey = 'pdo_history_' + userCode;
    let history = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    history.unshift(completedService);
    if (history.length > 10) history = history.slice(0, 10);
    
    localStorage.setItem(storageKey, JSON.stringify(history));

    envoyerAlerteDiscord("🛑 Fin de Service", `${currentUser.name} a terminé son service sur la ligne ${completedService.ligne} (${completedService.bus}).`);

    activeService = null;
    sessionStorage.removeItem('pdo_active_service_' + userCode);
    render();
    alert('Service terminé et enregistré dans votre onglet "Mes derniers services" !');
  }

  function renderHistory() {
    const container = document.getElementById('history-list-container');
    if (!container || !currentUser) return;

    const userCode = localStorage.getItem('palme_dor_user');
    const history = JSON.parse(localStorage.getItem('pdo_history_' + userCode)) || [];

    if (history.length === 0) {
      container.innerHTML = `<p style="font-size: 12px; color: #94a3b8; text-align: center; padding: 20px;">Aucun service enregistré pour le moment.</p>`;
      return;
    }

    container.innerHTML = '';
    history.forEach(item => {
      const ligneObj = LIGNES.find(l => l.id === item.ligne) || { badge: item.ligne, bg: '#64748b', text: '#ffffff' };

      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="badge" style="background-color: ${ligneObj.bg}; color: ${ligneObj.text}; font-size: 14px; padding: 4px 10px; margin-bottom: 0;">${ligneObj.badge}</span>
          <div>
            <strong style="color: var(--primary); text-transform: capitalize;">${item.day}</strong><br>
            <span style="font-size: 11px; opacity: 0.7;">${item.bus}</span>
          </div>
        </div>
        <div style="text-align: right; font-weight: 600; color: #22c55e;">
          ${item.start} ➔ ${item.end}
        </div>
      `;
      container.appendChild(div);
    });
  }

  // ==========================================
  // GESTION DES SIGNALEMENTS RAPIDES (V2)
  // ==========================================
  window.envoyerSignalement = function(messageType) {
    if (!currentUser) return;
    const infoService = activeService ? `(Ligne ${activeService.ligne} - ${activeService.bus})` : '';
    envoyerAlerteDiscord("⚠️ Signalement Incident", `${currentUser.name} ${infoService} :\n👉 **${messageType}**`);
    alert(`Signalement transmis avec succès : "${messageType}"`);
  };

  document.getElementById('send-custom-signal-btn').addEventListener('click', () => {
    const txtArea = document.getElementById('custom-signal-txt');
    const msg = txtArea.value.trim();
    if (!msg) {
      alert("Veuillez saisir un message personnalisé.");
      return;
    }
    if (!currentUser) return;

    const infoService = activeService ? `(Ligne ${activeService.ligne} - ${activeService.bus})` : '';
    envoyerAlerteDiscord("⚠️ Signalement Personnalisé", `${currentUser.name} ${infoService} :\n💬 *${msg}*`);
    txtArea.value = '';
    alert("Alerte personnalisée transmise sur Discord !");
  });

  function render() {
    const ligne = LIGNES.find(l => l.id === state.ligneId) || LIGNES[1];
    
    const defaultLogoPlaceholder = 'https://via.placeholder.com/120?text=Logo';
    document.getElementById('splash-logo-img').src = state.splashLogo || defaultLogoPlaceholder;
    document.getElementById('login-bus-img').src = state.busPhoto || 'https://via.placeholder.com/400x170?text=Bus+Palme+d%27Or';
    document.getElementById('app-logo').src = state.busPhoto || 'https://via.placeholder.com/140x40?text=PDORegul';
    
    document.getElementById('regulator-avatar').src = state.regulatorPhoto || 'https://via.placeholder.com/150?text=Naatan';
    document.getElementById('driver-avatar').src = state.driverPhoto || 'https://via.placeholder.com/150?text=Romain';
    
    const planStatusTxt = document.getElementById('plan-status-txt');
    const planWrapperBox = document.getElementById('plan-wrapper-box');
    const embeddedPdfView = document.getElementById('embedded-pdf-view');
    const fullscreenPdfView = document.getElementById('fullscreen-pdf-view');

    if (state.pdfData) {
      planStatusTxt.textContent = `Plan : ${state.pdfName || 'Plan_Reseau.pdf'} (Cliquez pour agrandir)`;
      embeddedPdfView.src = state.pdfData + "#toolbar=0&navpanes=0&scrollbar=0";
      fullscreenPdfView.src = state.pdfData + "#toolbar=0";
      planWrapperBox.classList.remove('hidden');
    } else {
      planStatusTxt.textContent = 'Aucun plan PDF mis en ligne pour le moment.';
      planWrapperBox.classList.add('hidden');
    }

    document.getElementById('login-info-text').textContent = state.loginInfo || 'Module de prise de service optimisé. 🚍⚡';

    const loginBadgesContainer = document.getElementById('login-badges-container');
    loginBadgesContainer.innerHTML = '';
    if (state.loginLines && state.loginLines.length > 0) {
      state.loginLines.forEach(lineId => {
        const lObj = LIGNES.find(l => l.id === lineId);
        if (lObj) {
          const span = document.createElement('span');
          span.className = 'badge';
          span.textContent = lObj.badge;
          span.style.backgroundColor = lObj.bg;
          span.style.color = lObj.text;
          loginBadgesContainer.appendChild(span);
        }
      });
    }

    const alertBox = document.getElementById('alert-display');
    if (state.alerte) {
      alertBox.classList.remove('hidden');
      document.getElementById('alert-text').textContent = state.alerte;
    } else {
      alertBox.classList.add('hidden');
    }

    const badge = document.getElementById('line-badge');
    badge.textContent = ligne.badge;
    badge.style.backgroundColor = ligne.bg;
    badge.style.color = ligne.text;

    document.getElementById('line-name').textContent = ligne.nom;
    document.getElementById('bus-num').textContent = state.bus;
    document.getElementById('service-hours').textContent = `${state.prise} - ${state.fin}`;
    document.getElementById('pcc-notes').textContent = state.notes || 'Aucune consigne particulière.';

    const activeServiceScreen = document.getElementById('active-service-screen');
    if (activeService) {
      activeServiceScreen.classList.remove('hidden');
      
      const ligneObj = LIGNES.find(l => l.id === activeService.ligne) || { badge: activeService.ligne, bg: '#22c55e', text: '#ffffff' };
      const activeBadge = document.getElementById('active-line-badge');
      activeBadge.textContent = ligneObj.badge;
      activeBadge.style.backgroundColor = ligneObj.bg;
      activeBadge.style.color = ligneObj.text;

      document.getElementById('active-line-name').textContent = `Ligne ${activeService.ligne}`;
      document.getElementById('active-bus-info').textContent = `${activeService.bus} • ${activeService.lieu}`;
      runActiveServiceTimer();
    } else {
      activeServiceScreen.classList.add('hidden');
    }

    const planningAlert = document.getElementById('regulator-planning-alert');
    if (state.planningRequest && state.planningRequest.status === 'pending') {
      planningAlert.classList.remove('hidden');
    } else {
      planningAlert.classList.add('hidden');
    }

    const reqBox = document.getElementById('regulator-request-box');
    if (state.serviceRequest && state.serviceRequest.status === 'pending') {
      reqBox.classList.remove('hidden');
      document.getElementById('req-details').innerHTML = `
        <strong>Conducteur 1942 (Romain)</strong> vous demande un service :<br>
        • Véhicule : <strong>${state.serviceRequest.busNum}</strong><br>
        • Ligne : <strong>${state.serviceRequest.ligne}</strong><br>
        • Lieu : <strong>${state.serviceRequest.lieu}</strong>
      `;
    } else {
      reqBox.classList.add('hidden');
    }

    if (currentUser && currentUser.role === 'CONDUCTEUR') {
      const planningForm = document.getElementById('planning-form-container');
      const planningStatus = document.getElementById('planning-status-display');
      
      const pBoxPending = document.getElementById('planning-box-pending');
      const pBoxFallback = document.getElementById('planning-box-fallback');
      const pBoxAccepted = document.getElementById('planning-box-accepted');
      const pBoxRefused = document.getElementById('planning-box-refused');

      pBoxPending.classList.add('hidden');
      pBoxFallback.classList.add('hidden');
      pBoxAccepted.classList.add('hidden');
      pBoxRefused.classList.add('hidden');

      if (!state.planningRequest) {
        planningForm.classList.remove('hidden');
        planningStatus.classList.add('hidden');
        isManualPlanningFallbackActive = false;
      } else {
        planningForm.classList.add('hidden');
        planningStatus.classList.remove('hidden');

        if (state.planningRequest.status === 'pending') {
          if (isManualPlanningFallbackActive) {
            pBoxFallback.classList.remove('hidden');
          } else {
            pBoxPending.classList.remove('hidden');
          }
        } else if (state.planningRequest.status === 'accepted') {
          pBoxAccepted.classList.remove('hidden');
        } else if (state.planningRequest.status === 'refused') {
          pBoxRefused.classList.remove('hidden');
        }
      }

      const formContainer = document.getElementById('driver-form-container');
      const statusDisplay = document.getElementById('driver-status-display');
      
      const boxPending = document.getElementById('status-box-pending');
      const boxFallback = document.getElementById('status-box-fallback');
      const boxAccepted = document.getElementById('status-box-accepted');
      const boxRefused = document.getElementById('status-box-refused');

      boxPending.classList.add('hidden');
      boxFallback.classList.add('hidden');
      boxAccepted.classList.add('hidden');
      boxRefused.classList.add('hidden');

      if (!state.serviceRequest) {
        formContainer.classList.remove('hidden');
        statusDisplay.classList.add('hidden');
        isManualFallbackActive = false;
      } else {
        formContainer.classList.add('hidden');
        statusDisplay.classList.remove('hidden');

        if (state.serviceRequest.status === 'pending') {
          if (isManualFallbackActive) {
            boxFallback.classList.remove('hidden');
          } else {
            boxPending.classList.remove('hidden');
          }
        } else if (state.serviceRequest.status === 'accepted') {
          boxAccepted.classList.remove('hidden');
        } else if (state.serviceRequest.status === 'refused') {
          boxRefused.classList.remove('hidden');
        }
      }
    }
  }

  document.getElementById('openFullscreenPlan').addEventListener('click', () => {
    document.getElementById('fullscreenModal').classList.remove('hidden');
  });

  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('fullscreenModal').classList.add('hidden');
  });

  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'manual-fallback-btn') {
      isManualFallbackActive = true;
      render();
    }
    if (e.target && e.target.classList.contains('reset-request-btn')) {
      isManualFallbackActive = false;
      state.serviceRequest = null;
      stateRef.set(state);
    }

    if (e.target && e.target.id === 'manual-planning-fallback-btn') {
      isManualPlanningFallbackActive = true;
      render();
    }
    if (e.target && e.target.classList.contains('reset-planning-btn')) {
      isManualPlanningFallbackActive = false;
      state.planningRequest = null;
      stateRef.set(state);
    }

    if (e.target && e.target.id === 'end-service-btn') {
      endActiveService();
    }
  });

  function loginUser(code) {
    if (!USERS[code]) return;
    currentUser = USERS[code];
    localStorage.setItem('palme_dor_user', code);
    document.getElementById('error-txt').style.display = 'none';
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    document.getElementById('main-nav-bar').classList.remove('hidden');

    const savedActive = sessionStorage.getItem('pdo_active_service_' + code);
    if (savedActive) {
      activeService = JSON.parse(savedActive);
    }

    if (currentUser.role === 'REGULATEUR') {
      document.getElementById('regulator-view').classList.remove('hidden');
      document.getElementById('driver-view').classList.add('hidden');
      document.getElementById('regulator-user-name').textContent = currentUser.name;
      
      selectLigne.value = state.ligneId;
      selectBus.value = state.bus;
      document.getElementById('input-prise').value = state.prise;
      document.getElementById('input-fin').value = state.fin;
      document.getElementById('input-notes').value = state.notes;
    } else {
      document.getElementById('driver-view').classList.remove('hidden');
      document.getElementById('regulator-view').classList.add('hidden');
      document.getElementById('driver-user-name').textContent = currentUser.name;
    }

    render();
    renderChat();
  }

  document.getElementById('login-btn').addEventListener('click', () => {
    const matricule = document.getElementById('matricule-input').value.trim();
    const loader = document.getElementById('fake-loader-screen');
    const errorTxt = document.getElementById('error-txt');

    if (USERS[matricule]) {
      errorTxt.style.display = 'none';
      loader.classList.remove('hidden');
      setTimeout(() => {
        loader.classList.add('hidden');
        loginUser(matricule);
      }, 800);
    } else {
      errorTxt.style.display = 'block';
    }
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('palme_dor_user');
    currentUser = null;
    document.getElementById('app-screen').classList.add('hidden');
    document.getElementById('main-nav-bar').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('matricule-input').value = '';
  });

  document.getElementById('save-btn').addEventListener('click', () => {
    if (!currentUser || currentUser.role !== 'REGULATEUR') return;

    state.ligneId = selectLigne.value;
    state.bus = selectBus.value;
    state.prise = document.getElementById('input-prise').value;
    state.fin = document.getElementById('input-fin').value;
    state.notes = document.getElementById('input-notes').value;
    state.alerte = document.getElementById('input-alerte').value;
    state.loginInfo = document.getElementById('input-login-info').value;

    const checkedLines = [];
    document.querySelectorAll('.login-line-chk:checked').forEach(chk => {
      checkedLines.push(chk.value);
    });
    state.loginLines = checkedLines;

    if (tempSplashLogo) state.splashLogo = tempSplashLogo;
    if (tempBusPhoto) state.busPhoto = tempBusPhoto;
    if (tempRegulatorPhoto) state.regulatorPhoto = tempRegulatorPhoto;
    if (tempDriverPhoto) state.driverPhoto = tempDriverPhoto;
    if (tempPdfData) {
      state.pdfData = tempPdfData;
      state.pdfName = tempPdfName;
    }

    state.serviceVersion = (state.serviceVersion || 1) + 1;

    stateRef.set(state).then(() => {
      envoyerAlerteDiscord("📢 Mise à jour Réseau (PCC)", `Le régulateur a mis à jour les directives et affectations du réseau.`);
      alert('Modifications enregistrées et transmises avec succès !');
    }).catch(err => {
      console.error(err);
      alert('Erreur lors de la sauvegarde.');
    });
  });

  document.getElementById('regulator-start-service-btn').addEventListener('click', () => {
    const l = document.getElementById('regulator-self-ligne').value.trim() || '1';
    const b = document.getElementById('regulator-self-bus').value.trim() || '1942';
    startActiveService({
      ligne: l,
      bus: `Véhicule ${b}`,
      lieu: 'PC Central / Régulation'
    });
    alert('Prise de service PCC démarrée !');
  });

  document.getElementById('accept-req-btn').addEventListener('click', () => {
    if (state.serviceRequest) {
      state.serviceRequest.status = 'accepted';
      stateRef.set(state);
    }
  });
  document.getElementById('refuse-req-btn').addEventListener('click', () => {
    if (state.serviceRequest) {
      state.serviceRequest.status = 'refused';
      stateRef.set(state);
    }
  });

  document.getElementById('submit-service-btn').addEventListener('click', () => {
    const busNum = document.getElementById('driver-input-bus').value.trim();
    const ligne = document.getElementById('driver-input-ligne').value.trim();
    const lieu = document.getElementById('driver-input-lieu').value.trim();

    if (!busNum || !ligne || !lieu) {
      alert("Veuillez remplir tous les champs de la demande de service.");
      return;
    }

    state.serviceRequest = {
      busNum: busNum,
      ligne: ligne,
      lieu: lieu,
      status: 'pending',
      timestamp: Date.now()
    };

    stateRef.set(state).then(() => {
      envoyerAlerteDiscord("🚨 Demande de Service", `${DISCORD_IDS["1805"]} Le conducteur Romain demande un service (Ligne ${ligne}, Bus ${busNum}, Lieu: ${lieu}).`);
      render();
    });
  });

  document.getElementById('accept-planning-btn').addEventListener('click', () => {
    if (state.planningRequest) {
      state.planningRequest.status = 'accepted';
      stateRef.set(state);
    }
  });
  document.getElementById('refuse-planning-btn').addEventListener('click', () => {
    if (state.planningRequest) {
      state.planningRequest.status = 'refused';
      stateRef.set(state);
    }
  });

  document.getElementById('planning-request-btn').addEventListener('click', () => {
    state.planningRequest = {
      status: 'pending',
      timestamp: Date.now()
    };

    stateRef.set(state).then(() => {
      envoyerAlerteDiscord("🗓️ Demande de Planning", `${DISCORD_IDS["1805"]} Le conducteur Romain demande une modification de planning.`);
      render();
    });
  });

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const splashScreen = document.getElementById('splash-screen');
      splashScreen.style.opacity = '0';
      setTimeout(() => {
        splashScreen.style.display = 'none';
        
        const savedMatricule = localStorage.getItem('palme_dor_user');
        if (savedMatricule && USERS[savedMatricule]) {
          loginUser(savedMatricule);
        }
      }, 500);
    }, 1500);
  });
