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

document.addEventListener("DOMContentLoaded", function () {
  // Ambil semua container dengan class .fraction-box.a
  const fractionBoxes = document.querySelectorAll(".fraction-box.a");

  const observerOptions = {
    root: null,
    threshold: 0.3, // Chat mulai muncul saat 30% box terlihat
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bubbles = entry.target.querySelectorAll(".bubble");

        bubbles.forEach((bubble, index) => {
          // Muncul satu per satu dengan jeda 1.8 detik
          setTimeout(() => {
            bubble.classList.add("show");
          }, index * 1800);
        });

        // Setelah animasi jalan, stop memantau box ini agar tidak reset
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Jalankan pengawasan pada setiap fraction-box.a
  fractionBoxes.forEach((box) => {
    observer.observe(box);
  });
});

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
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval;
let timeLeft = 600; // 10 menit

// Data Pool (Contoh 4 tipe, silakan lengkapi hingga 40)
const questionPool = [
  // Tipe 1: Penjumlah sama
  { q: "1/5 + 2/5", a: "3/5", options: ["3/5", "4/5", "2/5", "3/10"], type: 1 },
  { q: "2/7 + 3/7", a: "5/7", options: ["5/7", "6/7", "4/7", "5/14"], type: 1 },
  // Tipe 2: Pengurangan sama
  { q: "4/5 - 1/5", a: "3/5", options: ["3/5", "2/5", "5/5", "3/10"], type: 2 },
  // Tipe 3: Penjumlahan beda
  { q: "1/2 + 1/4", a: "3/4", options: ["3/4", "2/4", "2/6", "1/4"], type: 3 },
  // Tipe 4: Pengurangan beda
  { q: "1/2 - 1/4", a: "1/4", options: ["1/4", "3/4", "0", "1/2"], type: 4 },
  // Tambahkan soal lainnya di sini hingga masing-masing tipe ada 10...
];

function quizToIdentity() {
  document.getElementById("quiz-guide").style.display = "none";
  document.getElementById("quiz-identity").style.display = "block";
}

function startQuiz() {
  const name = document.getElementById("student-name").value;
  if (!name) return alert("Masukkan nama dulu ya!");

  // Ambil 10 soal acak (Pastikan tiap tipe muncul)
  questions = shuffleArray(questionPool).slice(0, 10);
  userAnswers = new Array(10).fill(null);

  document.getElementById("quiz-identity").style.display = "none";
  document.getElementById("quiz-play").style.display = "block";

  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById("question-number").innerText =
    `Soal ${currentQuestionIndex + 1}/10`;
  document.getElementById("question-text").innerText = `${q.q} = ...`;

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  // Acak pilihan jawaban
  const shuffledOptions = shuffleArray([...q.options]);

  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = `option-btn ${userAnswers[currentQuestionIndex] === opt ? "selected" : ""}`;
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(opt);
    optionsContainer.appendChild(btn);
  });

  // Navigasi Button Control
  document.getElementById("prev-q").style.visibility =
    currentQuestionIndex === 0 ? "hidden" : "visible";
  if (currentQuestionIndex === 9) {
    document.getElementById("next-q").style.display = "none";
    document.getElementById("finish-q").style.display = "block";
  } else {
    document.getElementById("next-q").style.display = "block";
    document.getElementById("finish-q").style.display = "none";
  }
}

function selectAnswer(ans) {
  userAnswers[currentQuestionIndex] = ans;
  showQuestion();
}

function changeQuestion(step) {
  currentQuestionIndex += step;
  showQuestion();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    const timerDisplay = document.getElementById("quiz-timer");
    timerDisplay.innerText = `${mins}:${secs < 10 ? "0" : ""}${secs}`;

    if (timeLeft <= 30) {
      document
        .getElementById("quiz-timer-container")
        .classList.add("timer-warning");
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      finishQuiz();
    }
  }, 1000);
}

function confirmFinish() {
  if (confirm("Apakah kamu sudah yakin dengan semua jawabanmu?")) {
    finishQuiz();
  }
}

function finishQuiz() {
  clearInterval(timerInterval);
  let correctCount = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.a) correctCount++;
  });

  document.getElementById("quiz-play").style.display = "none";
  document.getElementById("quiz-result").style.display = "block";

  document.getElementById("res-name").innerText =
    document.getElementById("student-name").value;
  document.getElementById("final-score").innerText = correctCount * 10;
  document.getElementById("stat-correct").innerText = correctCount;
  document.getElementById("stat-wrong").innerText = 10 - correctCount;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
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
