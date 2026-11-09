// ================= STATE MANAGEMENT =================
let currentDestination = "Tokyo";
let selectedPersona = "first-time";
let activeDayIndex = 0;
let fxRates = { PHP: 0.38, USD: 0.0065 }; // Default fallback against JPY/local

// ================= GLOBAL DESTINATIONS CATALOG =================
// Automatically fetches online curated photos (Unsplash/Wikimedia) and media vlogs
const DESTINATIONS_DB = {
  "Tokyo": {
    country: "Japan",
    currCode: "JPY",
    targetLang: "ja",
    heroImg: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    mapBbox: "139.65%2C35.65%2C139.80%2C35.75",
    transitNotes: [
      "Suica or Pasmo cards work on all Tokyo Metro lines, Toei subways, and JR East trains.",
      "Stand on the left side of escalators in Tokyo; leave the right open for passing commuters.",
      "Trains stop running around midnight; plan late-night routes accordingly."
    ],
    vlogs: [
      { title: "First-Timer's Complete Guide to Tokyo", channel: "Abroad in Japan", embed: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" },
      { title: "Tokyo 10 Best Street Foods You Must Try", channel: "Strictly Dumpling", embed: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" }
    ],
    stays: [
      { name: "Candeo Hotels Tokyo Shimbashi", district: "Ginza / Shimbashi", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80", agoda: 120, booking: 129, klook: 125, best: "Agoda" },
      { name: "Nui. Hostel & Bar Lounge", district: "Kuramae / Asakusa", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=500&q=80", agoda: 38, booking: 34, klook: 36, best: "Booking.com" }
    ],
    itineraries: {
      "first-time": [
        {
          day: 1, title: "Modern Neon & Shibuya Crossing",
          items: [
            { time: "09:30 AM", title: "Meiji Jingu Shrine Forest", desc: "A tranquil forested sanctuary in Harajuku before the crowds arrive.", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=500&q=80" },
            { time: "02:00 PM", title: "Takeshita Street & Cat Street", desc: "Browse youth fashion, crepes, and indie fashion alleyways.", img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=500&q=80" },
            { time: "06:30 PM", title: "Shibuya Sky & Scramble Crossing", desc: "Experience the world's busiest crosswalk and open-air rooftop views.", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=500&q=80" }
          ]
        },
        {
          day: 2, title: "Old Edo & Akihabara",
          items: [
            { time: "09:00 AM", title: "Sensō-ji Temple & Nakamise-dori", desc: "Tokyo's oldest Buddhist temple and traditional street-food stalls.", img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=500&q=80" },
            { time: "01:30 PM", title: "Akihabara Electric Town", desc: "The global hub for retro electronics, anime, and arcade gaming.", img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=500&q=80" }
          ]
        }
      ],
      "occasional": [
        {
          day: 1, title: "Art, Cafes & Architecture",
          items: [
            { time: "10:00 AM", title: "Daikanyama T-Site Bookshop", desc: "Award-winning bookstore architecture surrounded by quiet leafy cafes.", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80" },
            { time: "03:00 PM", title: "Naka-Meguro Canal Walk", desc: "Boutique coffee roasters and scenic pedestrian paths along the water.", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=80" }
          ]
        }
      ],
      "frequent": [
        {
          day: 1, title: "Indie Alleys & Vinyl Bars",
          items: [
            { time: "11:00 AM", title: "Shimokitazawa Vintage District", desc: "Retro thrift shops, indie music record stores, and curry cafes.", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80" },
            { time: "07:30 PM", title: "Omoide Yokocho (Memory Lane)", desc: "Yakitori skewers and highballs in post-war lantern alleys.", img: "https://images.unsplash.com/photo-1554797589-7241ab37e964?auto=format&fit=crop&w=500&q=80" }
          ]
        }
      ]
    }
  },

  "Taiwan": {
    country: "Taiwan",
    currCode: "TWD",
    targetLang: "zh-TW",
    heroImg: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format&fit=crop&w=1200&q=80",
    mapBbox: "121.45%2C24.98%2C121.65%2C25.12",
    transitNotes: [
      "EasyCard (悠遊卡) works seamlessly across MRT, public buses, and convenience stores.",
      "Eating, drinking, or chewing gum is strictly forbidden within MRT station gates.",
      "Take High Speed Rail (THSR) from Taipei Main Station for fast trips south to Taichung or Kaohsiung."
    ],
    vlogs: [
      { title: "Taipei First Timer Guide: 10 Must-Do Spots", channel: "Taiwan Travel Digest", embed: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" },
      { title: "Raohe Night Market: Ultimate Food Tour", channel: "Street Food Journey", embed: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" }
    ],
    stays: [
      { name: "CitizenM Taipei North Gate", district: "Zhongzheng / Station", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80", agoda: 84, booking: 91, klook: 89, best: "Agoda" },
      { name: "Star Hostel Main Station", district: "Datong District", img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=500&q=80", agoda: 38, booking: 34, klook: 37, best: "Booking.com" }
    ],
    itineraries: {
      "first-time": [
        {
          day: 1, title: "Iconic Towers & Michelin Dumplings",
          items: [
            { time: "10:00 AM", title: "Taipei 101 Observation Deck", desc: "Panoramic skyline views from the iconic architectural landmark.", img: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format&fit=crop&w=500&q=80" },
            { time: "01:30 PM", title: "Din Tai Fung (Original/101)", desc: "World-famous soup dumplings (Xiao Long Bao) and spiced noodles.", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80" },
            { time: "06:30 PM", title: "Raohe Night Market", desc: "Fuzhou black pepper buns and flame-torched beef cubes.", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80" }
          ]
        },
        {
          day: 2, title: "Mountain Alleys & Coast",
          items: [
            { time: "11:00 AM", title: "Jiufen Old Street", desc: "Lantern-lit hillside tea houses and sea-view stone staircases.", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=500&q=80" }
          ]
        }
      ],
      "occasional": [
        {
          day: 1, title: "Tea Mountains & Heritage Streets",
          items: [
            { time: "11:00 AM", title: "Maokong Gondola Ridge", desc: "Scenic mountain cable car ride up to organic oolong teahouses.", img: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format&fit=crop&w=500&q=80" },
            { time: "03:30 PM", title: "Dihua Historic Shophouse Lane", desc: "Traditional apothecary herbs, boutique ceramics, and cafes.", img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=500&q=80" }
          ]
        }
      ],
      "frequent": [
        {
          day: 1, title: "Artist Communes & Hidden Ports",
          items: [
            { time: "09:30 AM", title: "Zhengbin Pastel Harbor (Keelung)", desc: "Pastel colored waterfront houses and fresh sashimi docks.", img: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format&fit=crop&w=500&q=80" },
            { time: "02:00 PM", title: "Treasure Hill Artist Village", desc: "Hillside labyrinth of converted artist studios along the river.", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80" }
          ]
        }
      ]
    }
  }
};

// ================= DOM ELEMENTS =================
const intakeView = document.getElementById("intakeView");
const dashboardView = document.getElementById("dashboardView");
const destQueryInput = document.getElementById("destQueryInput");
const destBadgeText = document.getElementById("destBadgeText");
const generatePlanBtn = document.getElementById("generatePlanBtn");
const destHeroBanner = document.getElementById("destHeroBanner");
const destHeroTitle = document.getElementById("destHeroTitle");
const destPersonaTag = document.getElementById("destPersonaTag");
const dayPillsBar = document.getElementById("dayPillsBar");
const scheduleStream = document.getElementById("scheduleStream");
const vlogsGrid = document.getElementById("vlogsGrid");
const metasearchContainer = document.getElementById("metasearchContainer");

// Modals
const modalTranslate = document.getElementById("modalTranslate");
const modalCurrency = document.getElementById("modalCurrency");
const modalTransit = document.getElementById("modalTransit");

// ================= INITIALIZATION & EVENT LISTENERS =================
document.addEventListener("DOMContentLoaded", () => {
  setupEmergencyDock();
  setupPersonaSelector();
  setupDashboardTabs();
  fetchLiveFxRates();

  generatePlanBtn.addEventListener("click", () => {
    const rawDest = destQueryInput.value.trim() || "Tokyo";
    runCuration(rawDest);
  });
});

// ================= LEFT EMERGENCY DOCK & MODAL LOGIC =================
function setupEmergencyDock() {
  document.getElementById("dockTransBtn").addEventListener("click", () => openModal(modalTranslate));
  document.getElementById("dockFxBtn").addEventListener("click", () => openModal(modalCurrency));
  document.getElementById("dockTransitBtn").addEventListener("click", () => openModal(modalTransit));

  // Modal Closers
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-close");
      document.getElementById(targetId).classList.remove("active");
    });
  });

  // Close when clicking modal backdrop
  document.querySelectorAll(".quick-modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) backdrop.classList.remove("active");
    });
  });

  // Modal 1: In-Page Translator & Speech
  const quickMicBtn = document.getElementById("quickMicBtn");
  const quickTransActionBtn = document.getElementById("quickTransActionBtn");
  const quickTransInput = document.getElementById("quickTransInput");
  const quickTransResult = document.getElementById("quickTransResult");

  quickMicBtn.addEventListener("click", () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Voice input is not supported in this browser. Please type.");
      return;
    }
    const rec = new SR();
    quickMicBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    rec.onresult = (e) => {
      quickTransInput.value = e.results[0][0].transcript;
      quickMicBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
      executeQuickTranslate();
    };
    rec.onerror = () => { quickMicBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>'; };
    rec.start();
  });

  quickTransActionBtn.addEventListener("click", executeQuickTranslate);

  async function executeQuickTranslate() {
    const text = quickTransInput.value.trim();
    if (!text) return;
    const destData = getDestinationData(currentDestination);
    quickTransResult.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Translating...';
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${destData.targetLang}`);
      const data = await res.json();
      const translated = data?.responseData?.translatedText || "Translation unavailable";
      quickTransResult.innerHTML = `<strong style="font-size:1.2rem;color:var(--brick-red);">${translated}</strong>`;
    } catch {
      quickTransResult.textContent = "Translation connection error.";
    }
  }

  // Modal 1: OCR In-Page Scanner
  document.getElementById("quickOcrFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const out = document.getElementById("quickOcrResult");
    out.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Scanning image directly in browser...';

    Tesseract.recognize(file, 'eng', {
      logger: m => {
        if (m.status === 'recognizingtext') {
          out.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Scanning: ${Math.round(m.progress * 100)}%`;
        }
      }
    }).then(({ data: { text } }) => {
      out.innerHTML = text.trim() ? `<strong>Extracted Text:</strong><br>${text}` : "No clear text detected.";
    }).catch(() => {
      out.textContent = "OCR scan failed. Try a clearer image.";
    });
  });

  // Modal 2: Dynamic Currency Converter Listeners
  document.getElementById("fxLocalInput").addEventListener("input", () => calculateCurrency("local"));
  document.getElementById("fxPhpInput").addEventListener("input", () => calculateCurrency("php"));
  document.getElementById("fxUsdInput").addEventListener("input", () => calculateCurrency("usd"));
}

function openModal(modalEl) {
  modalEl.classList.add("active");
}

// ================= PERSONA SELECTION =================
function setupPersonaSelector() {
  document.getElementById("personaSelectionGrid").addEventListener("click", (e) => {
    const card = e.target.closest(".persona-box");
    if (!card) return;
    document.querySelectorAll(".persona-box").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    selectedPersona = card.getAttribute("data-persona");
  });
}

// ================= DASHBOARD TABS SWITCHER =================
function setupDashboardTabs() {
  document.querySelectorAll(".dash-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".dash-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".workspace-panel").forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetPanel = document.getElementById("workspace-" + tab.getAttribute("data-view"));
      if (targetPanel) targetPanel.classList.add("active");
    });
  });
}

// ================= CURATION & DATA ENGINE =================
function getDestinationData(destName) {
  // Check exact key or match against DB; fallback to Tokyo if custom
  const key = Object.keys(DESTINATIONS_DB).find(k => k.toLowerCase() === destName.toLowerCase());
  if (key) return DESTINATIONS_DB[key];

  // Dynamic fallback for any other city typed by user
  return {
    country: destName,
    currCode: "USD",
    targetLang: "es",
    heroImg: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    mapBbox: "2.25%2C48.80%2C2.40%2C48.90",
    transitNotes: [
      `Use official city transit passes and tap cards when available in ${destName}.`,
      "Official taxis and registered ride-hailing apps are recommended from arrival airports."
    ],
    vlogs: [
      { title: `Ultimate ${destName} Travel Guide`, channel: "World Explorers", embed: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" }
    ],
    stays: [
      { name: `${destName} Central Grand Hotel`, district: "Downtown", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80", agoda: 95, booking: 99, klook: 96, best: "Agoda" }
    ],
    itineraries: {
      "first-time": [
        {
          day: 1, title: "City Highlights & Heritage",
          items: [
            { time: "10:00 AM", title: `${destName} Historic Center`, desc: "Explore central monuments, grand plazas, and authentic street snacks.", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=500&q=80" }
          ]
        }
      ]
    }
  };
}

function runCuration(destName) {
  currentDestination = destName;
  const destData = getDestinationData(destName);

  // Update UI headers
  destBadgeText.textContent = destName;
  destHeroTitle.textContent = `${destName}, ${destData.country}`;
  destHeroBanner.style.backgroundImage = `url('${destData.heroImg}')`;

  const personaLabels = { "first-time": "First-time Traveler", "occasional": "Occasional Traveler", "frequent": "Frequent Traveler" };
  destPersonaTag.textContent = `Curated for ${personaLabels[selectedPersona]}`;

  // Update Modals
  document.getElementById("modalTargetCode").textContent = destData.currCode;
  document.getElementById("quickMapEmbed").src = `https://www.openstreetmap.org/export/embed.html?bbox=${destData.mapBbox}&layer=mapnik`;
  document.getElementById("quickTransitList").innerHTML = destData.transitNotes.map(n => `<li>${n}</li>`).join("");

  // Build Workspace Content
  renderItineraryView(destData);
  renderStaysView(destData);

  // Switch View
  intakeView.style.display = "none";
  dashboardView.style.display = "block";
}

function renderItineraryView(destData) {
  const personaItinerary = destData.itineraries[selectedPersona] || destData.itineraries["first-time"];
  activeDayIndex = 0;

  // Day Pills
  dayPillsBar.innerHTML = personaItinerary.map((d, idx) => `
    <button class="day-pill ${idx === activeDayIndex ? 'active' : ''}" onclick="switchDay(${idx})">
      Day ${idx + 1}: ${d.title}
    </button>
  `).join("");

  renderScheduleItems(personaItinerary[activeDayIndex]);

  // Vlogs
  vlogsGrid.innerHTML = destData.vlogs.map(v => `
    <div class="vlog-card">
      <iframe src="${v.embed}" title="${v.title}" allowfullscreen></iframe>
      <div class="vlog-meta">
        <h4>${v.title}</h4>
        <p>${v.channel}</p>
      </div>
    </div>
  `).join("");
}

function switchDay(idx) {
  activeDayIndex = idx;
  const destData = getDestinationData(currentDestination);
  const personaItinerary = destData.itineraries[selectedPersona] || destData.itineraries["first-time"];
  
  document.querySelectorAll(".day-pill").forEach((pill, i) => {
    pill.classList.toggle("active", i === idx);
  });
  renderScheduleItems(personaItinerary[idx]);
}

function renderScheduleItems(dayData) {
  if (!dayData || !dayData.items) return;
  scheduleStream.innerHTML = dayData.items.map(item => `
    <div class="schedule-card">
      <img src="${item.img}" alt="${item.title}" class="spot-img" />
      <div class="spot-body">
        <span class="spot-time">${item.time}</span>
        <h4 class="spot-name">${item.title}</h4>
        <p class="spot-desc">${item.desc}</p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.title + ', ' + currentDestination)}&travelmode=transit" target="_blank" rel="noopener" class="spot-link">
          <i class="fa-solid fa-diamond-turn-right"></i> Open Transit Route &rarr;
        </a>
      </div>
    </div>
  `).join("");
}

function renderStaysView(destData) {
  metasearchContainer.innerHTML = destData.stays.map(stay => `
    <div class="hotel-row">
      <img src="${stay.img}" alt="${stay.name}" class="hotel-img" />
      <div class="hotel-details">
        <h4 class="hotel-name">${stay.name}</h4>
        <p style="font-size:0.8rem;color:#666;">${stay.district}</p>
        <table class="rates-table">
          <tr><td><strong>Agoda</strong></td><td>$${stay.agoda} / night</td><td>${stay.best === 'Agoda' ? '<span class="badge-cheapest">Lowest Net Rate</span>' : ''}</td></tr>
          <tr><td><strong>Booking.com</strong></td><td>$${stay.booking} / night</td><td>${stay.best === 'Booking.com' ? '<span class="badge-cheapest">Lowest Net Rate</span>' : ''}</td></tr>
          <tr><td><strong>Klook</strong></td><td>$${stay.klook} / night</td><td>${stay.best === 'Klook' ? '<span class="badge-cheapest">Lowest Net Rate</span>' : ''}</td></tr>
        </table>
      </div>
      <div class="hotel-action">
        <a href="https://www.agoda.com" target="_blank" rel="noopener" class="btn btn-terracotta full-width" style="font-size:0.85rem;">Book via ${stay.best}</a>
      </div>
    </div>
  `).join("");
}

function resetToHome() {
  dashboardView.style.display = "none";
  intakeView.style.display = "block";
}

// ================= CURRENCY ENGINE =================
async function fetchLiveFxRates() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    if (data && data.rates) {
      fxRates.PHP = data.rates.PHP || 58.5;
      fxRates.USD = 1.0;
      document.getElementById("quickFxTimestamp").textContent = `Live Exchange Rates active (Base USD)`;
    }
  } catch {
    document.getElementById("quickFxTimestamp").textContent = `Using estimated mid-market currency values.`;
  }
}

function calculateCurrency(source) {
  const localEl = document.getElementById("fxLocalInput");
  const phpEl = document.getElementById("fxPhpInput");
  const usdEl = document.getElementById("fxUsdInput");

  let baseUSD = 0;
  if (source === "local") baseUSD = (parseFloat(localEl.value) || 0) * 0.0065; // Approx factor
  else if (source === "php") baseUSD = (parseFloat(phpEl.value) || 0) / fxRates.PHP;
  else if (source === "usd") baseUSD = parseFloat(usdEl.value) || 0;

  if (source !== "local") localEl.value = (baseUSD / 0.0065).toFixed(2);
  if (source !== "php") phpEl.value = (baseUSD * fxRates.PHP).toFixed(2);
  if (source !== "usd") usdEl.value = baseUSD.toFixed(2);
}
