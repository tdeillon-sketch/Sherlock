/* ═══════════════════════════════════════════
   SHERLOCK — Logique principale
   Navigation · Quiz · Profils · Questions IA
═══════════════════════════════════════════ */

/* ── État global du quiz ── */
let quizScores  = {};
let quizCurrent = 0;

/* ────────────────────────────────────────────
   CONNEXION
──────────────────────────────────────────── */
function handleSignIn() {
    document.getElementById('login').classList.remove('active');
    document.getElementById('app').classList.remove('hidden');
    initApp();
}

/* ────────────────────────────────────────────
   INITIALISATION DE L'APP
──────────────────────────────────────────── */
function initApp() {
    renderChapters();
    renderProfiles();
    renderQuiz();
    renderQASuggestions();
}

/* ────────────────────────────────────────────
   NAVIGATION PAR ONGLETS
──────────────────────────────────────────── */
function switchTab(tab) {
    /* Sections */
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(tab);
    if (target) target.classList.add('active');

    /* Boutons */
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (btn) btn.classList.add('active');
}

/* ────────────────────────────────────────────
   ACCUEIL — Chapitres du livre
──────────────────────────────────────────── */
function renderChapters() {
    const container = document.getElementById('chapters-list');
    if (!container || typeof CHAPTERS === 'undefined') return;

    container.innerHTML = CHAPTERS.map(part => `
        <div class="chapter-part">
            <h3 class="chapter-part-title">${part.part}</h3>
            ${part.chapters.map(ch => `
                <div class="chapter-item">
                    <div class="chapter-num">${ch.num}</div>
                    <div class="chapter-info">
                        <h4>${ch.title}</h4>
                        <p>${ch.desc}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

/* ────────────────────────────────────────────
   PROFILS
──────────────────────────────────────────── */
function renderProfiles() {
    const grid = document.getElementById('profiles-grid');
    if (!grid || typeof PROFILES === 'undefined') return;

    grid.innerHTML = PROFILES.map(p => `
        <div class="profile-card" onclick="openProfile(${p.id})">
            <div class="profile-num" style="background:${p.color}">${p.id}</div>
            <h3>${p.name}</h3>
            <p>${p.tagline}</p>
        </div>
    `).join('');
}

function openProfile(id) {
    const p = PROFILES.find(x => x.id === id);
    if (!p) return;

    const content = document.getElementById('profil-content');
    content.innerHTML = `
        <div class="profil-header">
            <div class="profile-num" style="background:${p.color};width:56px;height:56px;font-size:24px;margin-bottom:14px">${p.id}</div>
            <h2>${p.name}</h2>
            <p class="sub">${p.tagline}</p>
        </div>
        <div class="profil-section">
            <h3>Portrait</h3>
            <p>${p.desc}</p>
        </div>
        <div class="profil-section">
            <h3>3 clés d'accompagnement</h3>
            ${p.keys.map(k => `
                <div class="key-card">
                    <strong>${k.title}</strong><br>${k.text}
                </div>
            `).join('')}
        </div>
    `;

    /* Afficher l'écran détail */
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.getElementById('profil-detail').classList.add('active');

    /* Désactiver tous les onglets visuellement */
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.tab-btn[data-tab="profils"]').classList.add('active');
}

/* ────────────────────────────────────────────
   QUIZ
──────────────────────────────────────────── */
function renderQuiz() {
    quizScores  = {};
    quizCurrent = 0;
    showQuestion();
}

function showQuestion() {
    const body = document.getElementById('quiz-body');
    if (!body || typeof QUIZ === 'undefined') return;

    /* Barre de progression */
    const pct = Math.round((quizCurrent / QUIZ.length) * 100);
    const bar = document.getElementById('qpf');
    if (bar) bar.style.width = pct + '%';

    if (quizCurrent >= QUIZ.length) {
        showQuizResult();
        return;
    }

    const q = QUIZ[quizCurrent];
    body.innerHTML = `
        <div class="quiz-question">
            <p class="quiz-category">${q.category}</p>
            <p class="quiz-q-num">Question ${quizCurrent + 1} / ${QUIZ.length}</p>
            <h3>${q.question}</h3>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <button class="quiz-option"
                        onclick='pickOption(${JSON.stringify(opt.types)})'>
                        <span class="letter">${String.fromCharCode(65 + i)}</span>
                        <span>${opt.text}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function pickOption(types) {
    types.forEach(t => { quizScores[t] = (quizScores[t] || 0) + 1; });
    quizCurrent++;
    showQuestion();
}

function showQuizResult() {
    const body = document.getElementById('quiz-body');
    const bar  = document.getElementById('qpf');
    if (bar) bar.style.width = '100%';

    const sorted  = Object.entries(quizScores).sort((a, b) => b[1] - a[1]);
    const topId   = parseInt(sorted[0]?.[0]);
    const profile = PROFILES.find(p => p.id === topId);

    const tags = sorted.map(([t, s]) => {
        const p  = PROFILES.find(x => x.id === parseInt(t));
        const cl = parseInt(t) === topId ? 'top' : '';
        return `<span class="score-tag ${cl}">${p ? p.name : 'Type ' + t} · ${s}</span>`;
    }).join('');

    body.innerHTML = `
        <div class="result-card">
            <div class="result-badge" style="background:${profile?.color || '#4ecfca'}">${topId}</div>
            <h3>${profile?.name || 'Type ' + topId}</h3>
            <p>${profile?.tagline || ''}</p>
            <div class="score-tags">${tags}</div>
            <div class="result-btns">
                <button class="btn btn-primary" onclick="openProfile(${topId})">Voir le profil complet</button>
                <button class="btn btn-secondary" onclick="renderQuiz()">Recommencer</button>
            </div>
        </div>
    `;
}

/* ────────────────────────────────────────────
   QUESTIONS — IA Claude
──────────────────────────────────────────── */
function renderQASuggestions() {
    const wrap = document.getElementById('qa-suggestions');
    if (!wrap || typeof QA_SUGGESTIONS === 'undefined') return;

    wrap.innerHTML = QA_SUGGESTIONS.map(q => `
        <button class="qa-chip" onclick="prefillQuestion(this.dataset.q)" data-q="${q}">${q}</button>
    `).join('');
}

function prefillQuestion(text) {
    const input = document.getElementById('qa-input');
    if (input) {
        input.value = text;
        input.focus();
    }
}

async function askClaude() {
    const input  = document.getElementById('qa-input');
    const sendBtn = document.getElementById('qa-send');
    const results = document.getElementById('qa-results');
    const question = input?.value?.trim();

    if (!question) return;

    /* Désactiver le bouton pendant la requête */
    if (sendBtn) sendBtn.disabled = true;
    input.value = '';

    /* Afficher la question de l'utilisateur */
    const userCard = document.createElement('div');
    userCard.className = 'qa-card user';
    userCard.innerHTML = `
        <p class="qa-card-label">Votre question</p>
        <p>${escapeHtml(question)}</p>
    `;
    results.prepend(userCard);

    /* Afficher l'indicateur de chargement */
    const loadingCard = document.createElement('div');
    loadingCard.className = 'qa-card ai';
    loadingCard.innerHTML = `
        <p class="qa-card-label">Sherlock IA</p>
        <div class="qa-loading">
            <span></span><span></span><span></span>
        </div>
    `;
    results.prepend(loadingCard);

    try {
        const response = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });

        if (!response.ok) throw new Error('Erreur serveur ' + response.status);
        const data = await response.json();

        loadingCard.innerHTML = `
            <p class="qa-card-label">Sherlock IA</p>
            <p>${formatAnswer(data.answer)}</p>
        `;
    } catch (err) {
        loadingCard.innerHTML = `
            <p class="qa-card-label">Sherlock IA</p>
            <p style="color:#e87070">Une erreur est survenue. Vérifiez que le serveur est démarré (<code>npm start</code>).</p>
        `;
        console.error('askClaude error:', err);
    } finally {
        if (sendBtn) sendBtn.disabled = false;
    }
}

/* ── Helpers ── */
function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function formatAnswer(text) {
    /* Convertit les retours à la ligne en paragraphes */
    return text
        .split(/\n\n+/)
        .map(p => `<p>${escapeHtml(p.trim()).replace(/\n/g, '<br>')}</p>`)
        .join('');
}
