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
  // Mengecek apakah container sedang sembunyi atau muncul
  if (
    materiContainer.style.display === "none" ||
    materiContainer.style.display === ""
  ) {
    materiContainer.style.display = "block";
    // Scroll otomatis ke container materi agar user tahu ada konten muncul di bawah
    materiContainer.scrollIntoView({ behavior: "smooth" });
  } else {
    materiContainer.style.display = "none";
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
