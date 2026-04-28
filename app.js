/* ===========================
   CPLS ELECTION 2026 — APP.JS
   =========================== */

// ---- CANDIDATE DATA ----
const candidates = [
  { name: 'Ahmed Raza Khan',     pos: 'President',         bio: 'Final year pharmacy student with 2 years of CPLS experience. Passionate about capacity building and community outreach.', initials: 'AR' },
  { name: 'Fatima Noor Shah',    pos: 'President',         bio: 'Academic achiever and event organizer committed to elevating CPLS through strategic partnerships and student welfare.', initials: 'FN' },
  { name: 'Bilal Hussain Afridi',pos: 'Vice President',    bio: 'CPLS member with a strong leadership track record in inter-departmental collaboration and project execution.', initials: 'BH' },
  { name: 'Sana Gul Wazir',      pos: 'Vice President',    bio: 'Pharmacy student with expertise in project management, dedicated to supporting student initiatives and welfare.', initials: 'SG' },
  { name: 'Umar Farooq Khattak', pos: 'General Secretary', bio: 'Detail-oriented and organized, with direct experience managing CPLS documentation and official communications.', initials: 'UF' },
  { name: 'Maryam Zafar Awan',   pos: 'General Secretary', bio: 'Student representative with excellent communication skills and a commitment to transparent, fair governance.', initials: 'MZ' },
  { name: 'Tariq Mehmood Swati', pos: 'Treasurer',         bio: 'Finance-savvy pharmacy student with hands-on experience managing student event budgets and funds responsibly.', initials: 'TM' },
  { name: 'Hina Bibi Akhunzada', pos: 'Treasurer',         bio: 'Commerce background combined with pharmacy studies, bringing financial discipline and accountability to CPLS.', initials: 'HB' },
];

// ---- RESULTS DATA ----
const resultsData = [
  { name: 'Ahmed Raza Khan',     pos: 'President',         pct: 54 },
  { name: 'Fatima Noor Shah',    pos: 'President',         pct: 46 },
  { name: 'Bilal Hussain Afridi',pos: 'Vice President',    pct: 62 },
  { name: 'Sana Gul Wazir',      pos: 'Vice President',    pct: 38 },
  { name: 'Umar Farooq Khattak', pos: 'General Secretary', pct: 47 },
  { name: 'Maryam Zafar Awan',   pos: 'General Secretary', pct: 53 },
];

// Track votes per position
const voted = {};

// ---- RENDER CANDIDATES ----
function renderCandidates(filter) {
  const grid = document.getElementById('candidatesGrid');
  const list = filter === 'all'
    ? candidates
    : candidates.filter(c => c.pos === filter);

  grid.innerHTML = list.map(c => {
    const isVoted = voted[c.pos] === c.name;
    return `
      <div class="cand-card">
        <div class="cand-banner">
          <div class="cand-avatar">${c.initials}</div>
        </div>
        <div class="cand-body">
          <div class="cand-name">${c.name}</div>
          <div class="cand-pos">${c.pos}</div>
          <div class="cand-bio">${c.bio}</div>
          <button
            class="vote-card-btn ${isVoted ? 'voted' : ''}"
            onclick="quickVote('${c.pos}', '${c.name}', this)"
            ${isVoted ? 'disabled' : ''}
          >
            ${isVoted ? '✓ Voted' : 'Vote for ' + c.name.split(' ')[0]}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ---- FILTER BUTTONS ----
document.getElementById('filterBar').addEventListener('click', function(e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCandidates(btn.dataset.filter);
});

// ---- QUICK VOTE FROM CARD ----
function quickVote(pos, name, btn) {
  if (voted[pos]) return;
  voted[pos] = name;
  btn.textContent = '✓ Voted';
  btn.classList.add('voted');
  btn.disabled = true;
  showToast('✓ Vote cast for ' + name);
  updateResults();
}

// ---- SUBMIT VOTE FROM FORM ----
function submitVote() {
  const sid  = document.getElementById('studentId').value.trim();
  const sname = document.getElementById('voterName').value.trim();
  const pos  = document.getElementById('votePosition').value;
  const cand = document.getElementById('voteCandidate').value;

  if (!sid || !sname || !pos || !cand) {
    showToast('⚠ Please fill in all fields.', true);
    return;
  }

  if (voted[pos]) {
    showToast('⚠ You already voted for ' + pos + '.', true);
    return;
  }

  voted[pos] = cand;
  showToast('✓ Vote submitted for ' + cand + ' (' + pos + ')');
  updateResults();
  renderCandidates(
    document.querySelector('.filter-btn.active')?.dataset.filter || 'all'
  );

  // Reset form fields
  document.getElementById('votePosition').value  = '';
  document.getElementById('voteCandidate').value = '';
}

// ---- RENDER RESULTS ----
function renderResults() {
  const wrap = document.getElementById('resultsWrap');
  wrap.innerHTML = resultsData.map(r => `
    <div class="result-row">
      <div class="result-meta">
        <div class="result-left">
          <span class="result-name">${r.name}</span>
          <span class="result-badge">${r.pos}</span>
        </div>
        <span class="result-pct">${r.pct}%</span>
      </div>
      <div class="result-bar-bg">
        <div class="result-bar ${r.pct >= 50 ? 'leading' : ''}" style="width: ${r.pct}%"></div>
      </div>
    </div>
  `).join('');
}

function updateResults() {
  // Slight animation re-trigger on update
  renderResults();
}

// ---- TOAST ----
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = isError ? '#a32d2d' : '#1a6b3c';
  t.classList.add('show');
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => t.classList.remove('show'), 3500);
}

// ---- COUNTDOWN ----
const electionDate = new Date('2026-05-10T09:00:00');

function updateCountdown() {
  const diff = electionDate - new Date();
  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hrs').textContent  = '00';
    document.getElementById('cd-min').textContent  = '00';
    document.getElementById('cd-sec').textContent  = '00';
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hrs  = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hrs').textContent  = String(hrs).padStart(2, '0');
  document.getElementById('cd-min').textContent  = String(mins).padStart(2, '0');
  document.getElementById('cd-sec').textContent  = String(secs).padStart(2, '0');
}

// ---- NAVBAR SCROLL EFFECT ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 20px rgba(13,33,83,0.35)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ---- HAMBURGER MENU ----
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ---- INIT ----
renderCandidates('all');
renderResults();
setInterval(updateCountdown, 1000);
updateCountdown();
