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

// Fungsi untuk mengembalikan tampilan home ke semula (saat tombol kembali diklik)
function resetHome() {
  startBtn.style.display = "flex"; // Munculkan kembali tombol mulai
  loadingWrapper.style.display = "none"; // Sembunyikan loading
  progressBar.style.width = "0%"; // Reset panjang bar ke 0
}

// LOGIKA 2: Klik "Kembali" -> Pindah ke Beranda
btnBack.addEventListener("click", function () {
  pageMenu.style.display = "none";
  pageHome.style.display = "flex";
});
