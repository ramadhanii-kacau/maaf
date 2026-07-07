// --- Inisialisasi Elemen ---
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const floatingText = document.getElementById('floating-text');
const landingPage = document.getElementById('landing-page');
const letterPage = document.getElementById('letter-page');
const transitionScreen = document.getElementById('cinematic-transition');
const flash = transitionScreen.querySelector('.flash');
const typewriterContainer = document.getElementById('typewriter-text');
const btnHug = document.getElementById('btn-hug');
const successOverlay = document.getElementById('success-overlay');
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const particlesContainer = document.getElementById('particles-container');

let noClickCount = 0;
let scaleNo = 1;

const sadTexts = [
    "Yakin nih? 🥺",
    "Masa tega... 😔",
    "Kasih kesempatan sekali aja ❤️",
    "I janji berubah.",
    "Klik yang satunya aja ya...",
    "Please...",
    "Jangan gitu dong 😭"
];

const letterLines = 
`haiiiiii sayangggg...
ututuuuuuuu cayankkk kenapaaa iaafff.
pastiii lagii nahann nafsu iaaff🤭.
tidaaa apaaa apaaa perinnnseeeesssssssssssssss.

semogaaaa setelah bacaaa imniyyy perinnnseeeesssssssssssssss tidaaa ngambekk iaaa
dannn bisaaa boboooo malam iniii jugaa 
sekarang harussss bobooo iaaa perinsessss.

i sayangggg bangetttt samaaa u 🤍🤍🤍🤍🤍🤍`;

// --- Fungsi Autoplay (Memicu musik pada interaksi pertama) ---
function startAudio() {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicToggle.innerHTML = `<span class="music-icon rotating">🎵</span> Matikan Musik`;
        }).catch(err => {
            console.log("Autoplay diblokir browser, menunggu interaksi pengguna.");
        });
    }
}

// Memicu musik otomatis saat layar disentuh, di-klik, atau di-scroll pertama kali
document.addEventListener('click', startAudio, { once: true });
document.addEventListener('touchstart', startAudio, { once: true });
document.addEventListener('keydown', startAudio, { once: true });

// --- Efek Mouse Glow ---
document.addEventListener('mousemove', (e) => {
    const glow = document.getElementById('cursor-glow');
    if(glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    }
});

// --- Pengaturan Musik Manual (Tombol Pojok) ---
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Mencegah bentrok dengan trigger document
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.innerHTML = `<span class="music-icon rotating">🎵</span> Matikan Musik`;
    } else {
        bgMusic.pause();
        musicToggle.innerHTML = `<span class="music-icon">🎵</span> Putar Musik`;
    }
});

// --- Fungsi Membuat Partikel Bintang / Hujan Love Merah ---
function createParticle(type = 'star') {
    const particle = document.createElement('div');
    const isHeart = type === 'heart';
    
    particle.className = isHeart ? 'heart-particle' : 'particle';
    if (isHeart) particle.innerHTML = '❤️';
    
    particle.style.left = Math.random() * 100 + 'vw';
    const size = isHeart ? (Math.random() * 10 + 15) : (Math.random() * 4 + 2);
    const duration = Math.random() * 3 + (isHeart ? 2 : 4);
    
    if (!isHeart) {
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
    } else {
        particle.style.fontSize = size + 'px';
    }
    
    particle.style.animationDuration = duration + 's';
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// --- Fungsi Membuat Love Biru dari Bawah ke Atas ---
function createBlueHeart() {
    const blueHeart = document.createElement('div');
    blueHeart.className = 'blue-heart-particle';
    blueHeart.innerHTML = '💙';
    
    blueHeart.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 15 + 15;
    blueHeart.style.fontSize = size + 'px';
    
    const duration = Math.random() * 3 + 3;
    blueHeart.style.animationDuration = duration + 's';
    
    particlesContainer.appendChild(blueHeart);
    
    setTimeout(() => {
        blueHeart.remove();
    }, duration * 1000);
}

// Loop Pembuat Partikel Otomatis
setInterval(() => createParticle('star'), 200);
setInterval(createBlueHeart, 300);

// --- Logika Tombol "Ga Dimaafin" (Bergeser Dekat & Mengecil) ---
function moveButtonNo() {
    noClickCount++;
    
    const maxOffset = 90; 
    const randomX = (Math.random() * (maxOffset * 2)) - maxOffset;
    const randomY = (Math.random() * (maxOffset * 2)) - maxOffset;
    
    if (scaleNo > 0.45) {
        scaleNo -= 0.06;
    }
    
    const randomRotate = (Math.random() * 20) - 10;
    const temporaryScale = scaleNo * 1.15;

    btnNo.style.position = 'relative';
    btnNo.style.zIndex = '99';
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px) scale(${temporaryScale}) rotate(${randomRotate}deg)`;
    
    const randomText = sadTexts[Math.floor(Math.random() * sadTexts.length)];
    floatingText.innerText = randomText;
    
    setTimeout(() => {
        btnNo.style.transform = `translate(${randomX}px, ${randomY}px) scale(${scaleNo}) rotate(${randomRotate}deg)`;
    }, 100);
}

btnNo.addEventListener('mouseenter', moveButtonNo);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButtonNo();
});
btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    moveButtonNo();
});

// --- Logika Tombol "Dimaafin" ---
btnYes.addEventListener('click', () => {
    landingPage.classList.add('blur-bg');
    transitionScreen.classList.remove('hidden');
    flash.classList.add('animate-flash');
    
    setTimeout(() => {
        document.body.style.background = 'radial-gradient(circle at center, #1e1b4b 0%, #030712 100%)';
        landingPage.classList.add('hidden');
        letterPage.classList.remove('hidden');
    }, 1000);

    setTimeout(() => {
        transitionScreen.classList.add('hidden');
        startTypewriter();
    }, 2500);
});

// --- Efek Mengetik (Typewriter) ---
function startTypewriter() {
    let i = 0;
    typewriterContainer.innerHTML = '';
    
    function type() {
        if (i < letterLines.length) {
            typewriterContainer.innerHTML += letterLines.charAt(i);
            i++;
            typewriterContainer.scrollTop = typewriterContainer.scrollHeight;
            setTimeout(type, 45);
        } else {
            btnHug.classList.remove('hidden-btn');
        }
    }
    type();
}

// --- Logika Tombol Peluk Virtual ---
btnHug.addEventListener('click', () => {
    const rainInterval = setInterval(() => createParticle('heart'), 50);
    successOverlay.classList.remove('hidden');
    successOverlay.classList.add('scale-up');
    
    setTimeout(() => {
        clearInterval(rainInterval);
    }, 4000);
});