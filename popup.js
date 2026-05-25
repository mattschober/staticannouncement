/* ============================================
   STATIC ANNOUNCEMENT - CENTRAL POPUP
   Repo: github.com/YOUR_GITHUB_USERNAME/staticannouncement

   HOW TO USE ON ANY WEBSITE:
   Paste this one line before </body> on each site:

   <script src="https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/staticannouncement@main/popup.js"></script>

   TO UPDATE: Edit this file in your staticannouncement
   repo and ALL sites update automatically.
   ============================================ */

(function () {

  /* ---- SETTINGS — edit here only ---- */
  const CONFIG = {
    videoURL:    "https://www.youtube.com/embed/J8WnYjHqaBs?autoplay=1",
    profileImage: "https://cdn.jsdelivr.net/gh/mattschober/staticannouncement@main/mattschober-prof.jpeg",
    delayMS:     1000,
    showOnce:    true,
    heading:     "Welcome! 👋",
    subtext:     "Watch this quick intro before you dive in.",
    visitURL:    "https://mattschober-cloudpm.com",
    emailAddress: "matt.schober@live.com",

    // Add your websites here when ready:
    // { label: "Site Name", url: "https://example.com" }
    otherSites: [
      // { label: "Example Site", url: "https://example.com" },
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
      background: rgba(0,0,0,0.78);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      padding: 16px;
      animation: sa-fadeIn 0.4s ease;
    }
    @keyframes sa-fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    #sa-modal {
      position: relative;
      width: 100%;
      max-width: 800px;
      background: #0f2044;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 40px 100px rgba(0,0,0,0.5);
      animation: sa-slideUp 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes sa-slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    #sa-header {
      padding: 20px 24px 16px;
      background: #0f2044;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    #sa-header-left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    #sa-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      border: 2px solid #1e3a6e;
    }
    #sa-header-text h2 {
      margin: 0 0 4px;
      font-size: 1.2rem;
      font-weight: 700;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    #sa-header-text p {
      margin: 0;
      font-size: 0.9rem;
      color: #93b4d9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    #sa-close {
      flex-shrink: 0;
      background: #1e3a6e;
      border: none;
      color: #93b4d9;
      font-size: 18px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, color 0.2s;
      margin-top: 2px;
    }
    #sa-close:hover { background: #2a4f8f; color: #ffffff; }
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
      padding: 16px 24px;
      background: #0a1a38;
      border-top: 1px solid #1e3a6e;
    }
    #sa-buttons {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;
    }
    #sa-visit-btn {
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 11px 22px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s, transform 0.15s;
    }
    #sa-visit-btn:hover { background: #1d4ed8; transform: translateY(-1px); }
    #sa-other-btn {
      background: #fff;
      color: #111;
      border: 2px solid #d1d5db;
      border-radius: 8px;
      padding: 11px 22px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: border-color 0.2s, transform 0.15s;
    }
    #sa-other-btn:hover { border-color: #9ca3af; transform: translateY(-1px); }
    #sa-email-btn {
      background: #fff;
      color: #2563eb;
      border: 2px solid #d1d5db;
      border-radius: 8px;
      width: 44px;
      height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      text-decoration: none;
      flex-shrink: 0;
      transition: border-color 0.2s, background 0.2s, transform 0.15s;
      title: "Email Matt";
    }
    #sa-email-btn:hover {
      background: #eff6ff;
      border-color: #2563eb;
      transform: translateY(-1px);
    }
    #sa-email-btn svg {
      width: 20px;
      height: 20px;
    }
    #sa-dropdown {
      display: none;
      margin-top: 12px;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }
    #sa-dropdown.open { display: block; animation: sa-fadeIn 0.2s ease; }
    #sa-dropdown a {
      display: block;
      padding: 11px 18px;
      font-size: 0.9rem;
      color: #111;
      text-decoration: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      border-bottom: 1px solid #f3f4f6;
      transition: background 0.15s;
    }
    #sa-dropdown a:last-child { border-bottom: none; }
    #sa-dropdown a:hover { background: #f0f4ff; color: #2563eb; }
    #sa-dropdown .sa-empty {
      padding: 14px 18px;
      font-size: 0.88rem;
      color: #aaa;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-style: italic;
    }
    #sa-skip {
      display: block;
      text-align: center;
      margin-top: 12px;
      background: none;
      border: none;
      font-size: 0.82rem;
      color: #5a7fa8;
      cursor: pointer;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      text-decoration: underline;
      padding: 0;
    }
    #sa-skip:hover { color: #93b4d9; }
    @media (max-width: 480px) {
      #sa-header { padding: 14px 16px 12px; }
      #sa-footer { padding: 14px 16px; }
      #sa-buttons { flex-direction: row; flex-wrap: wrap; justify-content: center; }
      #sa-visit-btn, #sa-other-btn { flex: 1; justify-content: center; min-width: 140px; }
    }
  `;
  document.head.appendChild(style);

  // Build dropdown links
  let dropdownInner = "";
  if (CONFIG.otherSites.length === 0) {
    dropdownInner = `<div class="sa-empty">More sites coming soon...</div>`;
  } else {
    CONFIG.otherSites.forEach(site => {
      dropdownInner += `<a href="${site.url}" target="_blank" rel="noopener">${site.label}</a>`;
    });
  }

  const overlay = document.createElement("div");
  overlay.id = "sa-overlay";
  overlay.innerHTML = `
    <div id="sa-modal">
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
          <a id="sa-visit-btn" href="${CONFIG.visitURL}" target="_blank" rel="noopener">
            🌐 Visit my Website
          </a>
          <button id="sa-other-btn">
            🗂 See my other websites ▾
          </button>
          <a id="sa-email-btn" href="mailto:${CONFIG.emailAddress}" title="Email ${CONFIG.emailAddress}" aria-label="Send email">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <polyline points="2,4 12,13 22,4"/>
            </svg>
          </a>
        </div>
        <div id="sa-dropdown">${dropdownInner}</div>
        <button id="sa-skip">Skip intro and go to site &rarr;</button>
      </div>
    </div>
  `;

  setTimeout(() => document.body.appendChild(overlay), CONFIG.delayMS);

  function closePopup() {
    overlay.style.animation = "sa-fadeIn 0.3s ease reverse";
    setTimeout(() => overlay.remove(), 280);
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
