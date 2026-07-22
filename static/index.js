
const portfolioData = {
  name: 'Evaan Chowdhry',
  startYear: 2020,
  bio: 'Apple enthusiast | Building things with code',
  discord: 'phantom8015.',
  email: 'evaanchowdhry@gmail.com',
  linkedin: 'https://www.linkedin.com/in/evaanch',
  profileImage: 'static/pfp.jpeg',

  skills: [
    'NextJS',
    'React.js',
    'Node.js',
    'Tailwind',
    'Python',
    'Electron',
    'MongoDB',
    'Supabase',
    'HTML CSS',
    'Javascript',
    'Typescript',
    'Vite',
    'Flask',
    'Stripe'
  ],

  learning: ['React'],

  achievements: [
    { place: 'Hackathons', event: '<span style="color: #efe296; font-weight: 700;">1st</span> in HackClub Campfire Mississauga<br><span style="color: #C0C0C0; font-weight: 700;">2nd</span> in STRIPE Senior Python Competition' },
    { place: '15k+ Downloads', event: 'across NPM' },
    { place: 'Competitor', event: 'DECA Provincials 2026' }

  ],

  projects: [
    {
      name: 'SQ Auto Detailing',
      domain: 'sqautodetailing.xyz',
      date: new Date('2026-06-20T12:00:00'),
      dateStr: 'Jun 20, 2026',
      description: 'Automotive detailing website built for a real business.',
      stack: 'NextJS / Tailwind',
      url: 'https://sqautodetailing.xyz'
    },
    {
      name: 'Peylo',
      domain: 'peylo.xyz',
      date: new Date('2026-06-11T12:00:00'),
      dateStr: 'June 11, 2026',
      description: 'Learning platform for financial literacy.',
      stack: 'NextJS / Supabase',
      url: 'https://peylo.xyz'
    },
    {
      name: 'DocGress',
      domain: 'docgress.evaanchowdhry.site',
      date: new Date('2026-05-19T12:00:00'),
      dateStr: 'May 19, 2026',
      description: 'Google Docs progress tracking tool.',
      stack: 'React / Node.js',
      url: 'https://docgress.evaanchowdhry.site'
    },
    {
      name: 'JEC Hacks',
      domain: 'jechacks.com',
      date: new Date('2026-03-17T12:00:00'),
      dateStr: 'Mar 17, 2026',
      description: 'Hackathon website for JEC Hacks.',
      stack: 'HTML CSS / Flask',
      url: 'https://jechacks.com'
    }
  ]
};

portfolioData.timeline = [...portfolioData.projects].sort((a, b) => a.date - b.date);

const PROJECT_HEALTH_POLL_MS = 180000;


async function renderClock() {
  const timeElement = document.getElementById('time');
  if (!timeElement) return;
  
  function updateTime() {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/New_York' };
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', options);
    timeElement.textContent = timeString + " for me";
  }
  
  updateTime();
  setInterval(updateTime, 10000);
}

async function renderPortfolio() {
  const modulesContainer = document.getElementById('portfolioModules');
  if (!modulesContainer) return;

  const timelineHTML = portfolioData.timeline.map((project, index) => `
    <div class="timeline-horizontal-node" style="animation-delay: ${2.1 + (index * 0.05)}s" data-index="${index}">
      <!--
      <div class="timeline-date-label ${index % 2 === 0 ? 'above' : 'below'}">
        ${project.dateStr}
      </div>
      -->
      <div class="timeline-dot" style="--node-position: ${(index + 1) / (portfolioData.timeline.length + 1)}" onclick="window.open('${project.url}', '_blank')"></div>
      <div class="timeline-node-detail ${index % 2 === 0 ? 'above' : 'below'}">
        <div class="timeline-detail-type">${project.name}</div>
        <div class="timeline-detail-desc">${project.description}</div>
        <div class="timeline-detail-domain">${project.domain}</div>
        <div class="timeline-detail-meta">
          <div class="timeline-detail-language">${project.stack}</div>
          ${getProjectStatusMarkup(project)}
        </div>
      </div>
    </div>
  `).join('');

  const skillsHTML = portfolioData.skills.map(skill => `<span class="skill-chip">${skill}</span>`).join('');

  const modules = [
    {
      class: 'module-about',
      title: "Hi, I'm Evaan Chowdhry",
      content: `
        <div class="about-stack">
          <div class="about-profile">
            <a href="${portfolioData.linkedin}" target="_blank" title="LinkedIn" class="about-profile-link">
              <img src="${portfolioData.profileImage}" alt="Evaan Chowdhry" class="about-profile-pic">
            </a>
            <div class="about-info">
              <p class="about-bio">- I'm a freshman in highschool doing the IB program and I've been programming since 2020.</p>
              <p class="about-bio">- This portfolio is custom made. On this site, you get to see my achievements, skills, and yearly project timeline.</p>
              <p class="about-bio">- If you notice a song player somewhere, that's what I'm currently listening to right now!</p>
              <p class="about-bio">- You can view my projects on the timeline below, clicking them will take you to the live domain.</p>
            </div>
          </div>
          <div class="about-pills">
            <div id="clockPill" class="about-pill about-time">
              <i class="far fa-clock"></i>
              <span id="time"></span>
            </div>
            <div id="spotifyPill" class="about-pill about-spotify" style="display: none;">
              <a id="spotifyLink" href="#" target="_blank" title="Open on Spotify" class="contact-icon">
                <i class="fa-brands fa-spotify"></i>
              </a>
              <img id="spotifyAlbumArt" src="" alt="" class="spotify-album-art" />
              <div id="spotifyTrackInfo" class="spotify-track-info">
                <div id="spotifyMarquee" class="spotify-marquee">
                  <span id="spotifyTrackText"></span>
                </div>
              </div>
              <div id="spotifyProgress"></div>
            </div>
            <div id="contactPill" class="about-pill about-contact">
              <a href="mailto:evaanchowdhry@gmail.com" title="Email" class="contact-icon">
                <i class="fas fa-envelope"></i>
              </a>
              <a href="${portfolioData.linkedin}" target="_blank" title="LinkedIn" class="contact-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="static/cv.pdf" target="_blank" title="Resume" class="contact-icon">
                <i class="fas fa-file-lines"></i>
              </a>
              <a href="https://github.com/matonhp5108" target="_blank" title="GitHub" class="contact-icon">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      `
    },

    {
      class: 'module-achievements',
      title: 'Achievements',
      content: `
        <div>
          ${portfolioData.achievements.map(a => `
            <div class="achievement-item">
              <div class="achievement-place">${a.place}</div>
              <div class="achievement-event">${a.event}</div>
            </div>
          `).join('')}
        </div>
      `
    },

    {
      class: 'module-skills',
      title: 'Tech Stack',
      content: `
        <div class="skills-streak">
          ${skillsHTML}
        </div>
      `
    },

    {
      class: 'module-timeline-preview',
      title: 'Projects',
      subtitle: 'also shows project status',
      content: `
        <div class="timeline-preview-container">
          <div class="timeline-horizontal-line">
            ${timelineHTML}
            <div class="timeline-end-arrow"></div>
          </div>
        </div>
      `
    }
  ];

  modulesContainer.innerHTML = modules.map(module => `
    <div class="portfolio-module ${module.class}">
      ${module.title ? `<div class="module-header">
        <div class="module-heading">
          <h3 class="module-title">${module.title}</h3>
          ${module.subtitle ? `<p class="module-subtitle">${module.subtitle}</p>` : ''}
        </div>
      </div>` : ''}
      <div class="module-content">
        ${module.content}
      </div>
    </div>
  `).join('');

  setupBorderSpotlight();
}

function getProjectStatusMeta(project) {
  const status = project.health?.status;
  if (status === 'up') {
    return { icon: 'fa-check-circle', label: 'Up', className: 'is-up' };
  }
  if (status === 'degraded') {
    return { icon: 'fa-clock', label: 'Slow', className: 'is-degraded' };
  }
  if (status === 'down') {
    return { icon: 'fa-times-circle', label: 'Down', className: 'is-down' };
  }

  return { icon: 'fa-clock', label: 'Checking', className: 'is-checking' };
}

function getProjectStatusMarkup(project) {
  const meta = getProjectStatusMeta(project);
  return `
    <div class="timeline-detail-status ${meta.className}" data-project-status="${project.url}">
      <i class="fas ${meta.icon}" aria-hidden="true"></i>
      <span>${meta.label}</span>
    </div>
  `;
}

function updateProjectStatusInDom() {
  portfolioData.timeline.forEach(project => {
    const statusElement = document.querySelector(`[data-project-status="${CSS.escape(project.url)}"]`);
    if (!statusElement) return;

    const meta = getProjectStatusMeta(project);
    statusElement.className = `timeline-detail-status ${meta.className}`;
    statusElement.innerHTML = `
      <i class="fas ${meta.icon}" aria-hidden="true"></i>
      <span>${meta.label}</span>
    `;
  });
}

async function refreshProjectHealth() {
  try {
    const response = await fetch('/api/project-health');
    if (!response.ok) {
      throw new Error(`Project health request failed with ${response.status}`);
    }

    const payload = await response.json();
    const healthByUrl = new Map((payload.projects || []).map(project => [project.url, project]));

    portfolioData.timeline.forEach(project => {
      project.health = healthByUrl.get(project.url) || null;
    });

    updateProjectStatusInDom();
  } catch (error) {
    console.error('Project health fetch error:', error);
    portfolioData.timeline.forEach(project => {
      project.health = { status: 'degraded' };
    });
    updateProjectStatusInDom();
  }
}

function setupBorderSpotlight() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (setupBorderSpotlight.initialized) return;
  setupBorderSpotlight.initialized = true;

  const selector = [
    '.portfolio-module',
    '.about-pill',
    '.about-profile-link',
    '.skill-chip',
    '.timeline-node-detail',
    '.linkedin-cta-btn',
    '.project-item',
    '.toast'
  ].join(',');

  let pointerX = 0;
  let pointerY = 0;
  let frame = null;
  let targets = [];

  function refreshTargets() {
    targets = Array.from(document.querySelectorAll(selector)).map(element => ({
      element,
      rect: element.getBoundingClientRect()
    }));
  }

  function updateSpotlights() {
    frame = null;

    targets.forEach(({ element, rect }) => {
      const dx = Math.max(rect.left - pointerX, 0, pointerX - rect.right);
      const dy = Math.max(rect.top - pointerY, 0, pointerY - rect.bottom);
      const distance = Math.hypot(dx, dy);
      const opacity = Math.max(0, 1 - distance / 230);

      element.style.setProperty('--spotlight-x', `${pointerX - rect.left}px`);
      element.style.setProperty('--spotlight-y', `${pointerY - rect.top}px`);
      element.style.setProperty('--spotlight-opacity', opacity.toFixed(3));
    });
  }

  refreshTargets();
  window.addEventListener('resize', refreshTargets, { passive: true });
  window.addEventListener('scroll', refreshTargets, { passive: true });

  window.addEventListener('pointermove', event => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    if (!frame) {
      frame = requestAnimationFrame(updateSpotlights);
    }
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    targets.forEach(({ element }) => {
      element.style.setProperty('--spotlight-opacity', '0');
    });
  });
}


async function renderSpotify() {
  const spotifyPill = document.getElementById('spotifyPill');
  const albumArt = document.getElementById('spotifyAlbumArt');
  const trackText = document.getElementById('spotifyTrackText');
  const marquee = document.getElementById('spotifyMarquee');
  const progressBar = document.getElementById('spotifyProgress');
  const spotifyLink = document.getElementById('spotifyLink');

  if (!spotifyPill) return;

  let currentTrack = null;
  let progressTimer = null;
  let lastProgress = 0;
  let lastDuration = 0;
  let lastFetchTime = 0;

  function updateProgress() {
    if (!lastDuration) return;
    const elapsed = Date.now() - lastFetchTime;
    const currentProgress = Math.min(lastProgress + elapsed, lastDuration);
    progressBar.style.width = `${(currentProgress / lastDuration) * 100}%`;
  }

  function startProgressTimer() {
    if (progressTimer) clearInterval(progressTimer);
    progressTimer = setInterval(updateProgress, 1000);
  }

  function setupMarquee(text) {
    requestAnimationFrame(() => {
      const containerWidth = document.getElementById('spotifyTrackInfo').clientWidth;
      const tempSpan = document.createElement('span');
      tempSpan.style.cssText = 'visibility:hidden;position:absolute;white-space:nowrap;font-size:inherit;';
      tempSpan.textContent = text;
      document.body.appendChild(tempSpan);
      const textWidth = tempSpan.offsetWidth;
      document.body.removeChild(tempSpan);

      if (textWidth > containerWidth) {
        marquee.innerHTML = `<span>${text}</span><span>${text}</span>`;
        const duration = Math.max(5, textWidth / 30);
        marquee.style.setProperty('--scroll-duration', `${duration}s`);
        marquee.classList.add('scrolling');
      } else {
        marquee.innerHTML = `<span>${text}</span>`;
        marquee.classList.remove('scrolling');
      }
    });
  }

  async function fetchNowPlaying() {
    try {
      const res = await fetch('/api/now-playing');
      if (!res.ok) return;
      const data = await res.json();

      if (data.isPlaying) {
        spotifyPill.style.display = 'flex';

        const trackId = `${data.title}-${data.artist}`;
        if (trackId !== currentTrack) {
          albumArt.src = data.albumArt;
          albumArt.alt = data.title;
          const text = `${data.title} \u2022 ${data.artist}`;
          setupMarquee(text);
          currentTrack = trackId;
          if (data.songUrl) spotifyLink.href = data.songUrl;
        }

        lastProgress = data.progressMs || 0;
        lastDuration = data.durationMs || 0;
        lastFetchTime = Date.now();
        updateProgress();
        startProgressTimer();
      } else {
        spotifyPill.style.display = 'none';
        currentTrack = null;
        if (progressTimer) clearInterval(progressTimer);
        progressBar.style.width = '0%';
      }
    } catch (e) {
      console.error('Spotify fetch error:', e);
    }
  }

  await fetchNowPlaying();
  setInterval(fetchNowPlaying, 10000);
}


document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio();
  renderClock();
  renderSpotify();
  refreshProjectHealth();
  setInterval(refreshProjectHealth, PROJECT_HEALTH_POLL_MS);
});
