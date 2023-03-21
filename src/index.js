// element form input kalkulator bmi
const form = document.getElementById("formKalkulatorBmi");
const berat_badan = document.getElementById("berat_badan");
const usia = document.getElementById("usia");
const tinggi_badan = document.getElementById("tinggi_badan");
const btnHitungBmi = document.getElementById("btnHitungBmi");

form.addEventListener("submit", handleFormSubmit);
handleValidateReload(berat_badan);
handleValidateReload(usia);
handleValidateReload(tinggi_badan);

// Accessibility for label with input radio jenis_kelamin
document
  .querySelector("label[for='jenis_wanita']")
  .addEventListener("keypress", function (e) {
    if (e.keyCode === 32)
      document.getElementById("jenis_wanita").checked = true;
  });
document
  .querySelector("label[for='jenis_pria']")
  .addEventListener("keypress", function (e) {
    if (e.keyCode === 32) document.getElementById("jenis_pria").checked = true;
  });

// handle form submit
function handleFormSubmit(e) {
  e.preventDefault();

  const data = {
    jenis_kelamin: e.target.jenis_kelamin.value,
    berat_badan: e.target.berat_badan.value,
    usia: e.target.usia.value,
    tinggi_badan: e.target.tinggi_badan.value,
  };

  validasiKalkulatorBmi(data);
}

// handle validasi form kalkulator bmi
function validasiKalkulatorBmi(data) {
  if (!data.berat_badan)
    handleValidate(berat_badan, "Berat Badan tidak boleh kosong!");
  if (!data.usia) handleValidate(usia, "Usia tidak boleh kosong!");
  if (!data.tinggi_badan)
    handleValidate(tinggi_badan, "Tinggi Badan tidak boleh kosong!");
}

function handleValidateReload(element) {
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
function handleValidate(element, msg) {
  element.classList.add("ring-color-red");
  element.nextElementSibling.innerText = msg;
  element.nextElementSibling.classList.add(
    "transition-showSpanValidateKalkulatorBmi"
  );
  element.nextElementSibling.classList.remove(
    "transition-hideSpanValidateKalkulatorBmi"
  );
}
