// matrix rain effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);
const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEF';

function heavyCompute() {
    // simple CPU hog: lots of math
    let x = 0;
    for (let i = 0; i < 200000; i++) {
        x += Math.sqrt(i) * Math.sin(i);
    }
    return x;
}

let panicLoadActive = false;
let panicLoadEnd = 0;

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    const panicMode = document.body.classList.contains('panic-mode');
    ctx.fillStyle = panicMode ? '#F00' : '#0F0';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > (panicMode ? 0.85 : 0.975)) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    // GPU load: draw random rectangles
    const rects = panicLoadActive ? 300000 : 50;
    for (let j = 0; j < rects; j++) {
        ctx.fillStyle = `rgba(${Math.floor(Math.random()*255)},0,0,0.1)`;
        ctx.fillRect(Math.random() * width, Math.random() * height, 20, 20);
    }
    // CPU load
    const loops = panicLoadActive ? 20 : 1;
    for (let k = 0; k < loops; k++) heavyCompute();

    // turn off panicLoad when time passes
    if (panicLoadActive && Date.now() > panicLoadEnd) {
        panicLoadActive = false;
    }

    requestAnimationFrame(drawMatrix);
}
drawMatrix();

// protocol simulation
const startBtn = document.getElementById('start-btn');
const protocolScreen = document.getElementById('protocol-screen');
const startScreen = document.getElementById('start-screen');
const unlockBtn = document.getElementById('unlock-btn');
const timerEl = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const logEl = document.getElementById('log');
const finalScreen = document.getElementById('final-screen');

let simInterval;
let countdown = 300; // 5 minutes
let progress = 0;
const techPhrases = [
    'breaching firewall...',
    'injecting payload...',
    'hashing credentials...',
    'compressing data pack...',
    'verifying checksum...',
    'securing channel...',
    'allocating buffer...',
    'pinging mainframe...',
    'cracking keys...',
    'overwrite sectors...',
];

function randomHex(len = 4) {
    let s = '';
    for (let i = 0; i < len; i++) {
        s += Math.floor(Math.random() * 16).toString(16).toUpperCase();
    }
    return s;
}

function logLine() {
    const phrase = techPhrases[Math.floor(Math.random() * techPhrases.length)];
    const line = `0x${randomHex(4)}… ${phrase}`;
    const div = document.createElement('div');
    div.textContent = line;
    logEl.appendChild(div);
    logEl.scrollTop = logEl.scrollHeight;
}

function triggerPanic() {
    const panic = document.getElementById('panic');
    if (!panic) return;
    document.body.classList.add('panic-mode');
    panic.classList.remove('hidden');
    panicLoadActive = true;
    panicLoadEnd = Date.now() + 8000; // 8 seconds heavy load
    let count = 0;
    const blink = setInterval(() => {
        panic.classList.toggle('visible');
        count++;
        if (count > 20) {
            clearInterval(blink);
            panic.classList.add('hidden');
            panic.classList.remove('visible');
            document.body.classList.remove('panic-mode');
        }
    }, 80);
}


function startSimulation() {
    // fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
    }
    // enforce fullscreen remaining
    document.addEventListener('fullscreenchange', () => {
        if (countdown > 0 && !document.fullscreenElement) {
            // will try to re-enter each tick
        }
    });
    startScreen.classList.add('hidden');
    protocolScreen.classList.remove('hidden');
    applyDeterrents();
    // prevent closing/navigating away
    function beforeUnloadHandler(e) {
        e.preventDefault();
        e.returnValue = '';
    }
    window.addEventListener('beforeunload', beforeUnloadHandler);
    // block touch swipes on mobile
    function touchMoveHandler(e) {
        e.preventDefault();
    }
    document.addEventListener('touchmove', touchMoveHandler, {passive:false});
    // save to remove later
    startSimulation._touchHandler = touchMoveHandler;
    simInterval = setInterval(() => {
        if (countdown <= 0) {
            clearInterval(simInterval);
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            document.removeEventListener('touchmove', startSimulation._touchHandler);
            unlockBtn.classList.remove('hidden');
            return;
        }
        countdown--;
        progress += 100/300;
        timerEl.textContent = countdown;
        progressBar.style.width = progress + '%';
        logLine();
        // enforce fullscreen continuously, but user gesture required if escaped
        if (!document.fullscreenElement) {
            // attempt silent re-entry
            document.documentElement.requestFullscreen().catch(() => {});
        }
    }, 1000);
    // initial log
    logLine();
}

function unlock() {
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }
    protocolScreen.classList.add('hidden');
    finalScreen.classList.remove('hidden');
}

startBtn.addEventListener('click', startSimulation);
unlockBtn.addEventListener('click', unlock);

// deterrents
function applyDeterrents() {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', () => {
        history.pushState(null, '', location.href);
    });
    document.addEventListener('keydown', interceptKeys);
}

function interceptKeys(e) {
    const key = e.key;
    if (countdown > 0) {
        if (key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            triggerPanic();
            return; // disable
        }
        if (key === 'Delete') {
            e.preventDefault();
            e.stopPropagation();
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }
            return;
        }
    }
    // still block other shortcuts
    if (key === 'F11' ||
        ((e.ctrlKey || e.metaKey) && (key === 'w' || key === 'W' || key === 'r' || key === 'R'))) {
        e.preventDefault();
        e.stopPropagation();
    }
}

// resize handling
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
