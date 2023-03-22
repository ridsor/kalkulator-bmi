// element form input kalkulator bmi
const form = document.getElementById("formKalkulatorBmi");
const berat_badan = document.getElementById("berat_badan");
const usia = document.getElementById("usia");
const tinggi_badan = document.getElementById("tinggi_badan");
const btnHitungBmi = document.getElementById("btnHitungBmi");

// aksi submit form kalkulator bmi
form.addEventListener("submit", handleFormSubmit);

// menghapus validasi di from kalkulator bmi
removeValidate(berat_badan);
removeValidate(usia);
removeValidate(tinggi_badan);

// mereset form input kalkulator bmi dan menghilangkan display hasil bmi
document
  .getElementById("btnResetBmi")
  .addEventListener("click", handleBtnReset);

// Accessibility for label with input radio jenis_kelamin
accessibilityLabelRadio();

function handleFormSubmit(e) {
  e.preventDefault();

  const data = {
    jenis_kelamin: e.target.jenis_kelamin.value,
    berat_badan: e.target.berat_badan.value,
    usia: e.target.usia.value,
    tinggi_badan: e.target.tinggi_badan.value,
  };

  // validasi form kalkulator bmi
  if (validasiKalkulatorBmi(data)) return false;

  // membuat element hasil bmi
  var elementHasilBmi = `<div
          class="container md:px-3 mb-16 text-sm text-justify text-[#0f0f0f] mx-auto">
          <h1 class="font-medium text-xl md:px-5 px-3 mb-3">Hasil</h1>
          <div class="row flex flex-wrap">
            <div class="col md:w-6/12 w-full md:px-5 md:mb-0 mb-8">
              <div class="bg-[#f3f4f5] sm:rounded-md p-3 shadow-md">
                <h3 class="hasil-kualitas text-base text-center mt-3 mb-4">
                  Berat Badan Kurang
                </h3>
                <h2 class="hasil-bmi font-semibold text-3xl text-center mb-7">
                  17.7
                </h2>
                <p class="hasil-ket text-center mb-6">
                  Anda kekurangan berat badan
                </p>
                <a
                  href="#"
                  class="text-white font-medium shadow-md bg-blue-500 hover:bg-blue-600 focus:ring block px-4 py-2.5 rounded-lg mx-auto w-fit"
                  >Download Hasil BMI</a
                >
              </div>
            </div>
            <div class="col md:w-6/12 md:px-5 px-3">
              <p class="kualitas-bmi mb-3">Hasil BMI &lt; 18.5</p>
              <p class="saran-bmi mb-3">
                Anda berada dalam kategori kekurangan berat badan. Hubungi
                dokter lebih lanjut mengenai pola makan dan gizi yang baik untuk
                meningkatkan kesehatan.
              </p>
              <div class="flex gap-2 mb-3 flex-col lg:flex-row flex-wrap">
                <a
                  href="#"
                  class="text-white font-medium shadow-md bg-blue-500 hover:bg-blue-600 focus:ring block px-4 py-2.5 rounded-lg w-fit"
                  >Konsultasi Ahli Gizi Via Aplikasi</a
                >
                <a
                  href="#"
                  class="text-white font-medium shadow-md bg-blue-500 hover:bg-blue-600 focus:ring block px-4 py-2.5 rounded-lg w-fit"
                  >Registrasi Online Ahli Gizi</a
                >
              </div>
              <p>
              BMI tidak sepenuhnya mewakili diagnosis menyeluruh dari
              kesehatan tubuh dan resiko penyakit seseorang. Anda perlu
              konsultasi lebih lanjut mengenai resiko dan kekhawatiran Anda
              terkait dengan berat badan Anda.
              </p>
              </div>
              </div>
              <div class="row flex flex-wrap">
              <div class="col md:w-6/12 md:px-5 md:mb-0 mb-8 mt-3 w-full">
              <div class="bg-[#f3f4f5] sm:rounded-md p-3 shadow-md mb-8">
                <p class="ket-penyakit text-center text-base my-3">
                Berat rendah dapat menyebabkan berbagai masalah penyakit
                </p>
                <ul class="daftar-penyakit text-center mb-6 md:mb-8">
                  <li>Infertilitas</li>
                  <li>Anemia</li>
                  <li>Osteoporosis</li>
                  <li>Sistem Imun Lemah</li>
                </ul>
                <div
                  class="flex justify-center items-center flex-wrap gap-2.5 flex-col lg:flex-row">
                  <a
                    href="#"
                    class="text-white font-medium shadow-md bg-blue-500 hover:bg-blue-600 focus:ring block px-4 py-2.5 rounded-lg w-fit"
                    >Konsultasi Dokter Via Aplikasi</a
                  >
                  <a
                    href="#"
                    class="text-white font-medium shadow-md bg-blue-500 hover:bg-blue-600 focus:ring block px-4 py-2.5 rounded-lg w-fit"
                    >Registrasi Online Sekarang</a
                  >
                </div>
              </div>
              <div class="aplikasi">
                <h2 class="text-base text-center font-medium mb-2">
                  Download Aplikasi
                </h2>
                <ul class="list-none flex justify-center gap-2 flex-wrap">
                <li>
                <a href="#">
                <img
                        src="https://static.rsmurniteguh.app/sites/Images/Content/google-play.png"
                        alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="https://static.rsmurniteguh.app/sites/Images/Content/app-store.png"
                        alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>`;

  const displayHasilBmi = document.getElementById("display_hasil_bmi");

  // menambahkan transition ke display hasil bmi
  displayHasilBmi.classList.add("transition-showHasilBmi");
  displayHasilBmi.classList.remove("transition-hideHasilBmi");

  // menambahkan element hasil bmi
  displayHasilBmi.insertAdjacentHTML("beforeend", elementHasilBmi);
}

function handleBtnReset() {
  const displayHasilBmi = document.getElementById("display_hasil_bmi");
  displayHasilBmi.classList.add("transition-hideHasilBmi");
  document
    .getElementById("display_hasil_bmi")
    .classList.remove("transition-showHasilBmi");
  setTimeout(() => {
    displayHasilBmi.removeChild(displayHasilBmi.firstElementChild);
  }, 1000);
}

function validasiKalkulatorBmi(data) {
  let error = false;
  if (!data.berat_badan) {
    handleElementValidate(berat_badan, "Berat Badan tidak boleh kosong!");
    error = true;
  }
  if (!data.usia) {
    handleElementValidate(usia, "Usia tidak boleh kosong!");
    error = true;
  }
  if (!data.tinggi_badan) {
    handleElementValidate(tinggi_badan, "Tinggi Badan tidak boleh kosong!");
    error = true;
  }

  return error;
}

function removeValidate(element) {
  element.addEventListener("keyup", function () {
    if (element.id === "usia") {
      setTimeout(
        () =>
          (element.nextElementSibling.innerText =
            "Kalkulator hanya untuk 18 tahun ke atas"),
        150
      );
    }
    element.classList.remove("ring-color-red");
    element.nextElementSibling.classList.add(
      "transition-hideSpanValidateKalkulatorBmi"
    );
    element.nextElementSibling.classList.remove(
      "transition-showSpanValidateKalkulatorBmi"
    );
  });
}

function handleElementValidate(element, msg) {
  element.classList.add("ring-color-red");
  element.nextElementSibling.innerText = msg;
  element.nextElementSibling.classList.add(
    "transition-showSpanValidateKalkulatorBmi"
  );
  element.nextElementSibling.classList.remove(
    "transition-hideSpanValidateKalkulatorBmi"
  );
}

function accessibilityLabelRadio() {
  document
    .querySelector("label[for='jenis_wanita']")
    .addEventListener("keypress", function (e) {
      if (e.keyCode === 32)
        document.getElementById("jenis_wanita").checked = true;
    });
  document
    .querySelector("label[for='jenis_pria']")
    .addEventListener("keypress", function (e) {
      if (e.keyCode === 32)
        document.getElementById("jenis_pria").checked = true;
    });
}
