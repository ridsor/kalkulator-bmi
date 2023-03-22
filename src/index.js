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
    berat_badan: Number(e.target.berat_badan.value),
    usia: Number(e.target.usia.value),
    tinggi_badan: Number(e.target.tinggi_badan.value),
  };

  // validasi form kalkulator bmi
  if (validasiKalkulatorBmi(data)) return false;

  // menghitung bmi
  let hasilBmi =
    data.berat_badan / ((data.tinggi_badan / 100) * (data.tinggi_badan / 100));
  hasilBmi = hasilBmi.toFixed(1);

  // menentukan pesan berdasarkan hasil bmi
  const message = {
    hasilBmi,
  };
  if (hasilBmi < 18.5) {
    message.hasilKualitas = "Berat Badan Kurang";
    message.hasilKet = "Anda kekurangan berat badan";
    message.kualitasBmi = "Hasil BMI &lt; 18.5";
    message.saranBmi =
      "Anda berada dalam kategori kekurangan berat badan.<br/>Hubungi dokter lebih lanjut mengenai pola makan dan gizi yang baik untuk meningkatkan kesehatan.";
    message.ketPenyakit =
      "Berat rendah dapat menyebabkan berbagai masalah penyakit";
    message.daftarPenyakit = [
      "Infertilitas",
      "Anemia",
      "Osteoporosis",
      "Sistem Imun Lemah",
    ];
  } else if (hasilBmi < 25) {
    message.hasilKualitas = "Normal";
    message.hasilKet = "Anda memiliki berat badan ideal.<br>Good job!!";
    message.kualitasBmi = "Hasil BMI diantara 18.5 dan 24.9";
    message.saranBmi =
      "Anda berada dalam kategori berat badan yang normal.<br/>Tetap pertahankan berat badan Anda dan jaga berat badan Anda dengan mengatur keseimbangan antara pola makan dan aktivitas fisik Anda.";
  } else if (hasilBmi < 30) {
    message.hasilKualitas = "Berat Badan Berlebih";
    message.hasilKet = "Anda memiliki berat badan berlebih";
    message.kualitasBmi = "Hasil BMI diantara 25 dan 29.9";
    message.saranBmi =
      "Anda berada dalam kategori overweight atau berat badan berlebih.<br/>Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalor makanan yang dikonsumsi dan berolahraga. Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.";
    message.ketPenyakit = "Beberapa penyakit yang berasal dari kegemukan";
    message.daftarPenyakit = [
      "Diabetes",
      "Hipertensi",
      "Sakit Jantung",
      "Osteoarthritis",
    ];
  } else {
    message.hasilKualitas = "Obesitas";
    message.hasilKet = "Anda berada dalam kategori obesitas";
    message.kualitasBmi = "Hasil BMI lebih dari 25";
    message.saranBmi =
      "Anda berada dalam kategori obesitas.<br/>Usahakan untuk menurunkan berat badan dan menerapkan pola hidup sehat dengan menjaga makan dan aktivitas fisik. Segera kunjungi dokter untuk dilakukan pemeriksaan kesehatan lanjutan untuk mengetahui risiko yang Anda miliki terkait berat badan Anda.";
    message.ketPenyakit = "Beberapa penyakit yang berasal dari kegemukan";
    message.daftarPenyakit = [
      "Diabetes",
      "Hipertensi",
      "Sakit Jantung",
      "Osteoarthritis",
    ];
  }

  // render element hasil bmi
  renderElementHasilBmi(message);
}

function renderElementHasilBmi({
  hasilKualitas,
  hasilBmi,
  hasilKet,
  kualitasBmi,
  saranBmi,
  ketPenyakit,
  daftarPenyakit,
}) {
  if (typeof daftarPenyakit !== "undefined") {
    daftarPenyakitHTML = "";
    for (const x of daftarPenyakit) {
      daftarPenyakitHTML += `<li>${x}</li>`;
    }
  }

  var elementHasilBmi = `<div
          class="container md:px-3 mb-16 text-sm text-justify text-[#0f0f0f] mx-auto">
          <h1 class="font-medium text-xl md:px-5 px-3 mb-3">Hasil</h1>
          <div class="row flex flex-wrap">
            <div class="col md:w-6/12 w-full md:px-5 md:mb-0 mb-5">
              <div class="bg-[#f2f3f5] sm:rounded-md p-3 shadow-md">
                <h3 class="hasil-kualitas text-base text-center mt-3 mb-4">
                  ${hasilKualitas}
                </h3>
                <h2 class="hasil-bmi font-semibold text-3xl text-center mb-7">
                  ${hasilBmi}
                </h2>
                <p class="hasil-ket text-center mb-6">
                  ${hasilKet}
                </p>
                <a
                  href="#"
                  class="text-white font-medium shadow-md bg-blue-500 hover:bg-blue-600 focus:ring block px-4 py-2.5 rounded-lg mx-auto w-fit"
                  >Download Hasil BMI</a
                >
              </div>
            </div>
            <div class="col md:w-6/12 md:px-5 px-3 md:mb-0 mb-2">
              <p class="kualitas-bmi mb-3">${kualitasBmi}</p>
              <p class="saran-bmi mb-3">
                ${saranBmi}
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
              ${
                hasilKualitas !== "Normal"
                  ? `
              <div class="bg-[#f2f3f5] sm:rounded-md p-3 shadow-md">
                <p class="ket-penyakit text-center text-base my-3">
                ${ketPenyakit}
                </p>
                <ul class="daftar-penyakit text-center mb-6 md:mb-8">
                ${daftarPenyakitHTML}
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
              `
                  : ``
              }
              <div class="aplikasi">
                <h2 class="text-base text-center font-medium mb-2 mt-8">
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

  // mengecek jika ada element maka direset
  if (displayHasilBmi.firstElementChild) {
    // menambahkan transition ke display hasil bmi
    displayHasilBmi.classList.add("transition-hideHasilBmi");
    displayHasilBmi.classList.remove("transition-showHasilBmi");

    setTimeout(() => {
      // menambahkan element hasil bmi
      displayHasilBmi.innerHTML = elementHasilBmi;

      // menambahkan transition ke display hasil bmi
      displayHasilBmi.classList.add("transition-showHasilBmi");
      displayHasilBmi.classList.remove("transition-hideHasilBmi");
      window.location.href = "#display_hasil_bmi";
    }, 500);
  } else {
    // menambahkan element hasil bmi
    displayHasilBmi.innerHTML = elementHasilBmi;

    // menambahkan transition ke display hasil bmi
    displayHasilBmi.classList.add("transition-showHasilBmi");
    displayHasilBmi.classList.remove("transition-hideHasilBmi");

    window.location.href = "#display_hasil_bmi";
  }
}

function handleBtnReset() {
  const displayHasilBmi = document.getElementById("display_hasil_bmi");
  if (displayHasilBmi.firstElementChild) {
    displayHasilBmi.classList.add("transition-hideHasilBmi");
    displayHasilBmi.classList.remove("transition-showHasilBmi");
    setTimeout(() => {
      displayHasilBmi.innerHTML = "";
    }, 500);
  }
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
