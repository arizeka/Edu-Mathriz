// Ambil elemen-elemen halaman
const pageHome = document.getElementById("page-home");
const pageMenu = document.getElementById("page-menu");

// Ambil elemen tambahan untuk loading
const startBtn = document.getElementById("startBtn");
const loadingWrapper = document.getElementById("loadingWrapper");
const progressBar = document.getElementById("progressBar");

const btnBack = document.getElementById("btn-back");

// LOGIKA 1: Klik "Mulai" -> Loading -> Pindah ke Menu Utama
startBtn.addEventListener("click", function () {
  // 1. Sembunyikan tombol Mulai & Munculkan loading bar
  startBtn.style.display = "none";
  loadingWrapper.style.display = "flex";

  // 2. Jalankan animasi loading
  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);

      // 3. Setelah loading 100%, baru pindah halaman
      setTimeout(() => {
        pageHome.style.display = "none";
        pageMenu.style.display = "flex";

        // Reset tampilan untuk nanti jika user kembali ke home
        resetHome();
      }, 300); // Jeda halus 0.3 detik sebelum pindah
    }
  }, 30); // Kecepatan loading (total sekitar 3 detik)
});

// Ambil elemen Modal dan Tombol
const modalSetting = document.getElementById("modal-setting");
const modalPerson = document.getElementById("modal-person");

// --- TAMBAHKAN VARIABEL BARU DI SINI ---
const btnMateri = document.getElementById("btn-materi"); // Pastikan ID di HTML adalah "btn-materi"
const materiContainer = document.getElementById("materi-container"); // ID container transparan tadi

// ... (Logika Setting & Person kamu tetap sama)

// ==========================================
// --- LOGIKA MATERI (BAGIAN BARU) ---
// ==========================================
btnMateri.addEventListener("click", () => {
  // 1. Cek status sebelum disembunyikan semua
  const isHidden =
    materiContainer.style.display === "none" ||
    materiContainer.style.display === "";
  // 2. Sembunyikan SEMUA container terlebih dahulu agar tidak tumpang tindih
  hideAllContainers();
  // Mengecek apakah container sedang sembunyi atau muncul
  if (isHidden) {
    materiContainer.style.display = "block";
    // Scroll otomatis ke container materi agar user tahu ada konten muncul di bawah
    materiContainer.scrollIntoView({ behavior: "smooth" });
  }
});

// Ambil elemen konten materi yang memiliki scroll
const scrollContainer = document.querySelector(".content-materi-scroll");
let isScrolling;

// Pastikan elemen ada sebelum menjalankan fungsi
if (scrollContainer) {
  scrollContainer.addEventListener("scroll", () => {
    // 1. Tambahkan class 'scrolling' agar scrollbar muncul (diatur di CSS)
    scrollContainer.classList.add("scrolling");

    // 2. Hapus timer sebelumnya agar tidak bentrok
    window.clearTimeout(isScrolling);

    // 3. Set timer: scrollbar hilang setelah 1 detik (1000ms) tidak ada gerakan
    isScrolling = setTimeout(() => {
      scrollContainer.classList.remove("scrolling");
    }, 1000);
  });
}

// Tambahkan ini di dalam window click listener agar materi tertutup saat klik luar (opsional)
window.addEventListener("click", (event) => {
  if (event.target == modalSetting) {
    modalSetting.style.display = "none";
  }
  if (event.target == modalPerson) {
    modalPerson.style.display = "none";
  }
});

// --- UPDATE LOGIKA KEMBALI ---
// Pastikan saat klik "Kembali", container materi juga ikut sembunyi
btnBack.addEventListener("click", function () {
  pageMenu.style.display = "none";
  pageHome.style.display = "flex";
  materiContainer.style.display = "none"; // Tambahkan baris ini
});

const btnSetting = document.getElementById("btn-setting");
const btnPerson = document.getElementById("btn-person");

const closeSetting = document.getElementById("close-setting");
const closePerson = document.getElementById("close-person");

// VARIABEL DOM
const btnPermainan = document.getElementById("btn-game"); // Pastikan ID ini ada di HTML Anda
const btnQuiz = document.getElementById("btn-quiz"); // Pastikan ID ini ada di HTML Anda
const gameContainer = document.getElementById("game-container");
const quizContainer = document.getElementById("quiz-container");

// Toggling Container (Seperti Materi)
btnPermainan.addEventListener("click", () => {
  const isHidden =
    gameContainer.style.display === "none" ||
    gameContainer.style.display === "";
  hideAllContainers();

  if (isHidden) {
    gameContainer.style.display = "block";
  }
});

btnQuiz.addEventListener("click", () => {
  const isHidden =
    quizContainer.style.display === "none" ||
    quizContainer.style.display === "";
  hideAllContainers();

  if (isHidden) {
    quizContainer.style.display = "block";
  }
});

function hideAllContainers() {
  materiContainer.style.display = "none";
  gameContainer.style.display = "none";
  quizContainer.style.display = "none";
}

// --- LOGIKA GAME ---
function gameToSelection() {
  document.getElementById("game-guide").style.display = "none";
  document.getElementById("game-selection").style.display = "block";
}

function startCountdown() {
  document.getElementById("game-selection").style.display = "none";
  document.getElementById("game-arena").style.display = "block";
  let count = 3;
  const cdDiv = document.getElementById("countdown-display");

  const interval = setInterval(() => {
    if (count > 0) {
      cdDiv.innerText = count;
    } else if (count === 0) {
      cdDiv.innerText = "MULAI!";
    } else {
      clearInterval(interval);
      cdDiv.style.display = "none";
      renderGameArena(); // Panggil fungsi pengerjaan soal game
    }
    count--;
  }, 1000);
}

// --- LOGIKA QUIZ ---
let currentQuestionIndex = 0;
const quizQuestions = [
  { q: "1/4 + 2/4 = ...", a: ["3/4", "1/4", "3/8", "1/2"], correct: 0 },
  // Tambahkan 10 soal di sini secara acak
];

function quizToIdentity() {
  document.getElementById("quiz-guide").style.display = "none";
  document.getElementById("quiz-identity").style.display = "block";
}

function startQuiz() {
  const name = document.getElementById("student-name").value;
  if (!name) return alert("Isi nama dulu ya!");

  document.getElementById("quiz-identity").style.display = "none";
  document.getElementById("quiz-play").style.display = "block";
  showQuestion(0);
  startQuizTimer();
}

function showQuestion(index) {
  const qContainer = document.getElementById("question-container");
  const q = quizQuestions[index];
  qContainer.innerHTML = `
        <p>Soal ${index + 1}:</p>
        <h4>${q.q}</h4>
        <div class="options">
            ${q.a.map((opt, i) => `<button onclick="selectAnswer(${i})">${opt}</button>`).join("")}
        </div>
    `;
}

// Update fungsi btnBack untuk menyembunyikan semuanya
btnBack.addEventListener("click", function () {
  pageMenu.style.display = "none";
  pageHome.style.display = "flex";
  hideAllContainers();
});

// --- LOGIKA SETTING ---
// Buka modal setting
btnSetting.addEventListener("click", () => {
  modalSetting.style.display = "flex";
});

// Tutup modal setting saat klik (X)
closeSetting.addEventListener("click", () => {
  modalSetting.style.display = "none";
});

// --- LOGIKA PERSON ---
// Buka modal person
btnPerson.addEventListener("click", () => {
  modalPerson.style.display = "flex";
});

// Tutup modal person saat klik (X)
closePerson.addEventListener("click", () => {
  modalPerson.style.display = "none";
});

// --- LOGIKA TAMBAHAN ---
// Tutup modal jika user klik di luar area kotak putih
window.addEventListener("click", (event) => {
  if (event.target == modalSetting) {
    modalSetting.style.display = "none";
  }
  if (event.target == modalPerson) {
    modalPerson.style.display = "none";
  }
});

// Fungsi untuk mengembalikan tampilan home ke semula (saat tombol kembali diklik)
function resetHome() {
  startBtn.style.display = "flex"; // Munculkan kembali tombol mulai
  loadingWrapper.style.display = "none"; // Sembunyikan loading
  progressBar.style.width = "0%"; // Reset panjang bar ke 0
  const materiContainer = document.getElementById("materi-container");
  if (materiContainer) materiContainer.style.display = "none";
}

// LOGIKA 2: Klik "Kembali" -> Pindah ke Beranda
btnBack.addEventListener("click", function () {
  pageMenu.style.display = "none";
  pageHome.style.display = "flex";
});
