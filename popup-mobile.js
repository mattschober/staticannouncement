/* ============================================
   STATIC ANNOUNCEMENT - MOBILE POPUP
   Repo: github.com/mattschober/staticannouncement

   HOW TO USE ON ANY WEBSITE (MOBILE):
   Paste this one line before </body> on each site:

   <script src="https://cdn.jsdelivr.net/gh/mattschober/staticannouncement@main/popup-mobile.js"></script>

   TO UPDATE: Edit this file in your staticannouncement
   repo and ALL sites update automatically.
   ============================================ */

(function () {

  /* ---- SETTINGS — edit here only ---- */
  const CONFIG = {
    videoURL:    "https://www.youtube.com/embed/J8WnYjHqaBs?autoplay=1&mute=1",
    profileImage: "https://cdn.jsdelivr.net/gh/mattschober/staticannouncement@main/mattschober-prof.jpeg",
    delayMS:     1000,
    showOnce:    true,
    heading:     "Welcome! 👋",
    subtext:     "Watch this quick intro before you dive in.",
    visitURL:    "https://mattschober-cloudpm.com",
    emailAddress: "matt.schober@live.com",

    otherSites: [
      { label: "Matt Schober",                  url: "https://matt-schober.com" },
      { label: "Migrating with Matt",           url: "https://migratingwithmatt.com" },
      { label: "Nextbites",                     url: "https://nextbites.ai" },
      { label: "Mortar Property Management",    url: "https://mortarpropertymanagement.com" },
      { label: "Healaguard",                    url: "https://healaguard.com" },
      { label: "Smoke City Richfield",          url: "https://smokecityrichfield.com" },
      { label: "Minot Yard Games",              url: "https://minotyardgames.com" },
      { label: "Barkside Bungalow MN",          url: "https://barksidebungalowmn.com" },
      { label: "Highland Park Rental MN",       url: "https://highlandparkrentalmn.com" },
      { label: "Smart Property Holdings LLC",   url: "https://smartpropertyholdingsllc.com" },
      { label: "Matt Schober Saint Paul",       url: "https://mattschobersaintpaul.com" },
      { label: "Former Instagram Models",       url: "https://formerinstagrammodels.com" },
      { label: "Matt Maya Saint Paul",          url: "https://mattmayasaintpaul.com" },
      { label: "Schober Theater",               url: "https://schobertheater.com" },
      { label: "Matt Schober Podcast",          url: "https://mattschoberpodcast.com" },
      { label: "Schober Investing",             url: "https://schoberinvesting.com" },
      { label: "Tator Tot Rental MN",           url: "https://tatortotrentalmn.com" },
      { label: "Barkside Cafe",                 url: "https://barksidecafe.com" },
      { label: "I Am the Needle",               url: "https://iamtheneedle.com" },
      { label: "Porch Light Twin Cities",       url: "https://porchlighttwincities.com" },
      { label: "Porch Light Services",          url: "https://porchlightservices.com" },
    ],
  };
  /* ---- END SETTINGS ---- */

  if (CONFIG.showOnce && sessionStorage.getItem("sa_popupShown")) return;
  if (CONFIG.showOnce) sessionStorage.setItem("sa_popupShown", "true");

  const style = document.createElement("style");
  style.textContent = `
    #sa-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.85);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      z-index: 99999;
      animation: sa-fadeIn 0.35s ease;
    }
    @keyframes sa-fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    #sa-modal {
      position: relative;
      width: 100%;
      max-width: 600px;
      background: #0f2044;
      border-radius: 20px 20px 0 0;
      overflow: hidden;
      box-shadow: 0 -20px 60px rgba(0,0,0,0.5);
      animation: sa-slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes sa-slideUp {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
    #sa-drag-handle {
      width: 40px;
      height: 4px;
      background: #1e3a6e;
      border-radius: 2px;
      margin: 12px auto 0;
    }
    #sa-header {
      padding: 12px 16px 12px;
      background: #0f2044;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    #sa-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    #sa-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      border: 2px solid #1e3a6e;
    }
    #sa-header-text h2 {
      margin: 0 0 2px;
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    #sa-header-text p {
      margin: 0;
      font-size: 0.8rem;
      color: #93b4d9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    #sa-close {
      flex-shrink: 0;
      background: #1e3a6e;
      border: none;
      color: #93b4d9;
      font-size: 16px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, color 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    #sa-close:active { background: #2a4f8f; color: #ffffff; }
    #sa-video-wrap {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      background: #000;
    }
    #sa-video-wrap iframe {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      border: none;
    }
    #sa-footer {
      padding: 14px 16px;
      background: #0a1a38;
      border-top: 1px solid #1e3a6e;
      padding-bottom: max(14px, env(safe-area-inset-bottom));
    }
    #sa-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    #sa-top-buttons {
      display: flex;
      gap: 8px;
    }
    #sa-visit-btn {
      flex: 1;
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 13px 16px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.15s;
    }
    #sa-visit-btn:active { background: #1d4ed8; }
    #sa-email-btn {
      background: #fff;
      color: #2563eb;
      border: 2px solid #d1d5db;
      border-radius: 10px;
      width: 48px;
      height: 48px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      text-decoration: none;
      flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.15s;
    }
    #sa-email-btn:active { background: #eff6ff; }
    #sa-email-btn svg { width: 20px; height: 20px; }
    #sa-other-btn {
      width: 100%;
      background: #fff;
      color: #111;
      border: 2px solid #d1d5db;
      border-radius: 10px;
      padding: 13px 16px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.15s;
    }
    #sa-other-btn:active { background: #f3f4f6; }
    #sa-dropdown {
      display: none;
      margin-top: 10px;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      max-height: 240px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    #sa-dropdown.open { display: block; animation: sa-fadeIn 0.2s ease; }
    #sa-dropdown a {
      display: flex;
      flex-direction: column;
      padding: 12px 16px;
      font-size: 0.88rem;
      color: #111;
      text-decoration: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      border-bottom: 1px solid #f3f4f6;
      -webkit-tap-highlight-color: transparent;
    }
    #sa-dropdown a:last-child { border-bottom: none; }
    #sa-dropdown a:active { background: #f0f4ff; color: #2563eb; }
    #sa-dropdown .sa-site-label { font-weight: 600; }
    #sa-dropdown .sa-site-url {
      font-size: 0.74rem;
      color: #6b7280;
      margin-top: 1px;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    #sa-dropdown .sa-empty {
      padding: 14px 16px;
      font-size: 0.85rem;
      color: #aaa;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-style: italic;
    }
    #sa-skip {
      display: block;
      text-align: center;
      margin-top: 10px;
      background: none;
      border: none;
      font-size: 0.8rem;
      color: #5a7fa8;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      text-decoration: underline;
      padding: 4px 0;
      -webkit-tap-highlight-color: transparent;
      width: 100%;
    }
    #sa-skip:active { color: #93b4d9; }
  `;
  document.head.appendChild(style);

  let dropdownInner = "";
  if (CONFIG.otherSites.length === 0) {
    dropdownInner = `<div class="sa-empty">More sites coming soon...</div>`;
  } else {
    CONFIG.otherSites.forEach(site => {
      dropdownInner += `<a href="${site.url}" target="_blank" rel="noopener"><span class="sa-site-label">${site.label}</span><span class="sa-site-url">${site.url}</span></a>`;
    });
  }

  const overlay = document.createElement("div");
  overlay.id = "sa-overlay";
  overlay.innerHTML = `
    <div id="sa-modal">
      <div id="sa-drag-handle"></div>
      <div id="sa-header">
        <div id="sa-header-left">
          ${CONFIG.profileImage ? `<img id="sa-avatar" src="${CONFIG.profileImage}" alt="Profile photo">` : ""}
          <div id="sa-header-text">
            <h2>${CONFIG.heading}</h2>
            <p>${CONFIG.subtext}</p>
          </div>
        </div>
        <button id="sa-close" aria-label="Close">&#x2715;</button>
      </div>
      <div id="sa-video-wrap">
        <iframe
          src="${CONFIG.videoURL}"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
      <div id="sa-footer">
        <div id="sa-buttons">
          <div id="sa-top-buttons">
            <a id="sa-visit-btn" href="${CONFIG.visitURL}" target="_blank" rel="noopener">
              🌐 Visit my Website
            </a>
            <a id="sa-email-btn" href="mailto:${CONFIG.emailAddress}" title="Email ${CONFIG.emailAddress}" aria-label="Send email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
            </a>
          </div>
          <button id="sa-other-btn">
            🗂 See my other websites ▾
          </button>
        </div>
        <div id="sa-dropdown">${dropdownInner}</div>
        <button id="sa-skip">Skip intro and go to site &rarr;</button>
      </div>
    </div>
  `;

  setTimeout(() => document.body.appendChild(overlay), CONFIG.delayMS);

  function closePopup() {
    overlay.style.animation = "sa-fadeIn 0.25s ease reverse";
    setTimeout(() => overlay.remove(), 240);
  }

  document.addEventListener("click", function (e) {
    if (e.target.id === "sa-close" || e.target.id === "sa-skip") closePopup();
    if (e.target.id === "sa-overlay") closePopup();
    if (e.target.id === "sa-other-btn") {
      const dropdown = document.getElementById("sa-dropdown");
      dropdown.classList.toggle("open");
      e.target.textContent = dropdown.classList.contains("open")
        ? "🗂 See my other websites ▴"
        : "🗂 See my other websites ▾";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePopup();
  });

})();
