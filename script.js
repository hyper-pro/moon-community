/**
 * MOON COMMUNITY SMP - SCRIPT
 * Native Vanilla JavaScript - Runs with direct double click (file://) and GitHub Pages
 */

const SERVER_IP = 'mooncommunity.mcsh.io';

// Confirmed Rules Database
const RULES_DATA = [
  {
    id: 1,
    category: 'Community Conduct',
    rule: 'Respect every player; no harassment, bullying, hate speech, or discrimination.',
    detail: 'Treat all members of the Moon Realm with kindness and dignity. Any form of hate speech, toxic harassment, or discriminatory behavior will not be tolerated.',
    severity: 'critical'
  },
  {
    id: 2,
    category: 'Community Conduct',
    rule: 'No NSFW or disturbing content, spam, flooding, or disruptive chat.',
    detail: 'Keep all public and private channels suitable for a gaming community. Avoid caps flooding, repetitive spamming, or sharing graphic/disturbing material.',
    severity: 'high'
  },
  {
    id: 3,
    category: 'Community Conduct',
    rule: 'No unauthorized advertising, suspicious links, or scams.',
    detail: 'Do not promote other servers, external commercial services, or share phishing/malicious URLs under any circumstances.',
    severity: 'critical'
  },
  {
    id: 4,
    category: 'Community Conduct',
    rule: 'Follow staff instructions and do not impersonate staff or players.',
    detail: 'Server staff are here to maintain order and fairness. Follow their guidance promptly and never pretend to be a moderator, admin, or another community member.',
    severity: 'high'
  },
  {
    id: 5,
    category: 'Fair Play & Cheating',
    rule: 'No hacks, hacked clients, cheating, or unfair advantages.',
    detail: 'Unapproved modifications including X-ray, fly, kill aura, baritone, auto-clickers, or cheat clients are strictly forbidden.',
    severity: 'critical'
  },
  {
    id: 6,
    category: 'Fair Play & Cheating',
    rule: 'No exploiting bugs or unintended mechanics.',
    detail: 'If you discover a glitch, duping bug, or unintended mechanic, immediately notify staff via a support ticket. Exploiting bugs will result in immediate penalties.',
    severity: 'critical'
  },
  {
    id: 7,
    category: 'Fair Play & Cheating',
    rule: 'No griefing or stealing without permission.',
    detail: 'Player builds, storage chests, and territories are protected. Damaging structures or looting items without explicit consent is strictly prohibited.',
    severity: 'high'
  },
  {
    id: 8,
    category: 'Game Integrity',
    rule: 'No scamming in trades.',
    detail: 'All in-game exchanges and trade agreements must be conducted honestly. Deceiving players during trades will lead to transaction reversals and penalties.',
    severity: 'high'
  },
  {
    id: 9,
    category: 'Game Integrity',
    rule: 'No unauthorized multi-account abuse or using alternate accounts to bypass restrictions.',
    detail: 'Using alt accounts to evade mutes, cooldowns, claims, or server punishments is forbidden.',
    severity: 'critical'
  },
  {
    id: 10,
    category: 'Game Integrity',
    rule: 'No placing or claiming your own bounty through yourself or an alternate account/another player to exploit the bounty system.',
    detail: 'The bounty mechanics must remain fair and competitive. Colluding with teammates or alt accounts to farm bounty rewards constitutes an exploit.',
    severity: 'high'
  },
  {
    id: 11,
    category: 'Game Integrity',
    rule: 'No intentionally crashing, overloading, lagging, disrupting, or damaging the server.',
    detail: 'Building lag machines, excessive redstone clock loops designed to degrade server tick-rates (TPS), or chunk-overloading exploits is punishable by a permanent ban.',
    severity: 'critical'
  },
  {
    id: 12,
    category: 'Fair Play & Cheating',
    rule: 'No ban or punishment evasion.',
    detail: 'Attempting to circumvent temporary or permanent restrictions via VPNs, proxy networks, or new accounts will extend your ban permanently.',
    severity: 'critical'
  },
  {
    id: 13,
    category: 'Security & Reporting',
    rule: 'Protect account credentials and personal information.',
    detail: 'Never share passwords, personal addresses, or sensitive credentials in chat or Discord. Staff will never ask for your Mojang/Microsoft login passwords.',
    severity: 'standard'
  },
  {
    id: 14,
    category: 'Security & Reporting',
    rule: 'Use support tickets to report rule breakers.',
    detail: 'Do not escalate arguments in public chat. Gather screenshots or video evidence and open a support ticket on our official Discord server for rapid staff review.',
    severity: 'standard'
  },
  {
    id: 15,
    category: 'Security & Reporting',
    rule: 'Punishments may include warnings, mutes, kicks, temporary bans, or permanent bans depending on severity.',
    detail: 'Enforcement actions are taken according to the severity and recurrence of the infraction, at the discretion of the moderation team.',
    severity: 'critical'
  }
];

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initVoxelCanvas();
  initCopyButtons();
  initServerStatus();
  initRules();
  initNavigation();
  initScrollToTop();
});

/* -------------------------------------------------------------
   1. Interactive Voxel & Cosmic Stardust Canvas
   ------------------------------------------------------------- */
function initVoxelCanvas() {
  const canvas = document.getElementById('voxel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const colors = ['#9333ea', '#a855f7', '#c084fc', '#e879f9', '#38bdf8', '#818cf8'];

  const numStars = Math.min(110, Math.floor(width / 15));
  const numShards = Math.min(30, Math.floor(width / 40));

  const particles = [];

  for (let i = 0; i < numStars; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.85,
      size: Math.random() * 2 + 0.8,
      speedY: (Math.random() - 0.5) * 0.1,
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.8 + 0.2,
      maxOpacity: Math.random() * 0.6 + 0.4,
      fadeSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.8 ? '#c084fc' : '#ffffff',
      rotation: 0,
      rotSpeed: 0,
      isShard: false
    });
  }

  for (let i = 0; i < numShards; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 5 + 3,
      speedY: -(Math.random() * 0.35 + 0.15),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.3,
      maxOpacity: 0.85,
      fadeSpeed: Math.random() * 0.01 + 0.005,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      isShard: true
    });
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Deep cosmic space gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#05040a');
    bgGrad.addColorStop(0.4, '#090818');
    bgGrad.addColorStop(0.8, '#100c28');
    bgGrad.addColorStop(1, '#080614');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Glowing Moon Orb
    const moonX = width * 0.82;
    const moonY = Math.min(height * 0.2, 170);
    const moonGlow = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, 240);
    moonGlow.addColorStop(0, 'rgba(192, 132, 252, 0.25)');
    moonGlow.addColorStop(0.3, 'rgba(147, 51, 234, 0.12)');
    moonGlow.addColorStop(0.7, 'rgba(56, 189, 248, 0.04)');
    moonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = moonGlow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 240, 0, Math.PI * 2);
    ctx.fill();

    const moonCore = ctx.createRadialGradient(moonX, moonY, 5, moonX, moonY, 44);
    moonCore.addColorStop(0, '#f5e8ff');
    moonCore.addColorStop(0.5, '#d8b4fe');
    moonCore.addColorStop(0.85, '#9333ea');
    moonCore.addColorStop(1, 'rgba(107, 33, 168, 0.4)');
    ctx.fillStyle = moonCore;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 44, 0, Math.PI * 2);
    ctx.fill();

    // Render Particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!prefersReduced) {
        p.opacity += p.fadeSpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
      if (p.isShard) {
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.6, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.6, 0);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size > 2 ? 6 : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Voxel Stepped Mountains Silhouette
    const stepSize = Math.max(16, Math.floor(width / 60));
    ctx.fillStyle = '#05040a';
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += stepSize) {
      const rawY =
        Math.sin(x * 0.003) * 35 +
        Math.cos(x * 0.007) * 20 +
        Math.sin(x * 0.012) * 10;
      const steppedY = height - 65 + Math.floor(rawY / 10) * 10;
      ctx.lineTo(x, steppedY);
      ctx.lineTo(x + stepSize, steppedY);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(168, 85, 247, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (!prefersReduced) {
      requestAnimationFrame(render);
    }
  }

  render();
}

/* -------------------------------------------------------------
   2. Copy Server IP with Reliable Fallback
   ------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy, .btn-copy-action');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const success = await copyText(SERVER_IP);
      if (success) {
        const originalHtml = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = `✓ IP COPIED!`;

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHtml;
        }, 2500);
      }
    });
  });
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textArea);
    return ok;
  } catch (e) {
    console.error('Copy fallback failed:', e);
    return false;
  }
}

/* -------------------------------------------------------------
   3. Real Server Status (mcsrvstat.us API)
   ------------------------------------------------------------- */
let statusCache = null;
let lastCheckTime = 0;

async function initServerStatus() {
  const badgeEl = document.getElementById('server-status-badge');
  if (!badgeEl) return;

  async function check() {
    const now = Date.now();
    if (statusCache && now - lastCheckTime < 60000) {
      updateStatusUI(badgeEl, statusCache);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(SERVER_IP)}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error('Status query failed');
      const data = await res.json();
      statusCache = {
        online: Boolean(data.online),
        players: data.online && data.players ? data.players : null,
        version: data.version || 'Java Edition'
      };
      lastCheckTime = now;
      updateStatusUI(badgeEl, statusCache);
    } catch (e) {
      statusCache = { online: false, error: true };
      lastCheckTime = now;
      updateStatusUI(badgeEl, statusCache);
    }
  }

  check();
  // Refresh every 90 seconds
  setInterval(check, 90000);
}

function updateStatusUI(el, status) {
  if (status.online) {
    const playersTxt = status.players
      ? ` • <strong style="color:#ffffff;">${status.players.online} / ${status.players.max} Players</strong>`
      : '';
    el.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <span class="status-dot"></span>
        <span style="font-weight:700; color:#10b981;">SERVER ONLINE</span>
        <span style="opacity:0.7;">(${status.version})</span>
        ${playersTxt}
      </div>
      <div style="font-size:0.75rem; color:#cbd5e1;">Live Ping Verified</div>
    `;
  } else {
    el.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <span class="status-dot standby"></span>
        <span style="font-weight:700; color:#f59e0b;">SERVER STANDBY</span>
        <span style="opacity:0.7;">(Java 1.21.x)</span>
      </div>
      <div style="font-size:0.75rem; color:#cbd5e1;">Address: ${SERVER_IP}</div>
    `;
  }
}

/* -------------------------------------------------------------
   4. SMP Rules Filtering & Collapsible Accordion
   ------------------------------------------------------------- */
function initRules() {
  const container = document.getElementById('rules-list-container');
  const tabs = document.querySelectorAll('.rules-tab-btn');
  const searchInput = document.getElementById('rules-search-input');
  if (!container) return;

  let activeCategory = 'All';
  let searchTerm = '';

  function renderRules() {
    const filtered = RULES_DATA.filter((r) => {
      const matchCat = activeCategory === 'All' || r.category === activeCategory;
      const matchSearch =
        r.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:2.5rem; background:rgba(20,16,43,0.5); border-radius:1rem; border:1px solid rgba(168,85,247,0.2); font-family:var(--font-mono); font-size:0.9rem; color:#c084fc;">
          No matching rules found for "${searchTerm}".
        </div>
      `;
      return;
    }

    container.innerHTML = filtered
      .map(
        (r) => `
      <div class="rule-accordion" data-id="${r.id}">
        <button type="button" class="rule-header" aria-expanded="false">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span class="rule-num">#${r.id < 10 ? '0' + r.id : r.id}</span>
            <div class="rule-title-group">
              <div class="rule-title">${r.rule}</div>
              <div class="rule-category">${r.category}</div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.65rem;">
            <span class="rule-badge ${r.severity}">${r.severity}</span>
            <span class="rule-chevron" style="color:#c084fc; font-size:0.8rem;">▼</span>
          </div>
        </button>
        <div class="rule-body">
          <p>${r.detail}</p>
          <div style="margin-top:0.75rem; text-align:right;">
            <a href="https://discord.gg/WbygPDuFqm" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:0.35rem; font-family:var(--font-mono); font-size:0.75rem; color:#e9d5ff; background:rgba(88,28,135,0.4); padding:0.35rem 0.65rem; border-radius:0.4rem; text-decoration:none; border:1px solid rgba(168,85,247,0.3);">
              🎫 Report Violation on Discord
            </a>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    // Attach click listener to headers
    container.querySelectorAll('.rule-header').forEach((hdr) => {
      hdr.addEventListener('click', () => {
        const parent = hdr.closest('.rule-accordion');
        const wasActive = parent.classList.contains('active');
        container.querySelectorAll('.rule-accordion').forEach((a) => {
          a.classList.remove('active');
          const h = a.querySelector('.rule-header');
          if (h) h.setAttribute('aria-expanded', 'false');
          const c = a.querySelector('.rule-chevron');
          if (c) c.textContent = '▼';
        });

        if (!wasActive) {
          parent.classList.add('active');
          hdr.setAttribute('aria-expanded', 'true');
          const chevron = hdr.querySelector('.rule-chevron');
          if (chevron) chevron.textContent = '▲';
        }
      });
    });
  }

  // Initial render
  renderRules();

  // Tab click
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-cat') || 'All';
      renderRules();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim();
      renderRules();
    });
  }
}

/* -------------------------------------------------------------
   5. Mobile Navigation & Navbar Scroll
   ------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const links = document.querySelectorAll('.mobile-nav-links a');

  // Scroll blur
  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 30) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    },
    { passive: true }
  );

  // Toggle mobile drawer
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        toggleBtn.innerHTML = '☰';
        document.body.style.overflow = '';
      } else {
        drawer.classList.add('open');
        toggleBtn.innerHTML = '✕';
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on link click
    links.forEach((l) => {
      l.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.innerHTML = '☰';
        document.body.style.overflow = '';
      });
    });

    // Close on ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggleBtn.innerHTML = '☰';
        document.body.style.overflow = '';
      }
    });
  }
}

/* -------------------------------------------------------------
   6. Floating Scroll to Top
   ------------------------------------------------------------- */
function initScrollToTop() {
  const btn = document.getElementById('scroll-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 400) {
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
      }
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

