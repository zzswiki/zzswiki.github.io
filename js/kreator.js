// zmienne
var id_nastepnej_sekcji = 1;
var id_nastepnej_zawartosci = 1;

var zdjecie_obiektu = false;

var is_safe = false;
var is_euclid = false;
var is_keter = false;
var is_setter = false;
var is_metter = false;
var is_etther = false;

// maksymalnie 3 cyfry w ID 
const numberInput = document.getElementById("id-input");
numberInput.addEventListener("input", () => {
  if (numberInput.value.length > 3) {
    numberInput.value = numberInput.value.slice(0, 3);
  }
});

// usunięcie sekcji
function close_sekcja(sekcja_id) {
  var sekcja = document.getElementById(`sekcja_${sekcja_id}`);
  sekcja.remove()
}

// usunięcie zawartości
function close_zawartosc(zawartosc_id) {
  var zawartosc = document.getElementById(`zawartosc_${zawartosc_id}`);
  zawartosc.remove()
}

// tworzenie nowej sekji
function create_sekcja() {
  var typ_sekcji_input = document.getElementById("typ-sekcji");
  var typ_sekcji = typ_sekcji_input.value;

  if(typ_sekcji == "tekst"){
    var sekcja = document.createElement("div");
    sekcja.classList.add("sekcja");
    sekcja.id = `sekcja_${id_nastepnej_sekcji}`;
    sekcja.innerHTML = `
    <button onclick="close_sekcja(${id_nastepnej_sekcji})" class="close">X</button>
    <h3>Tekst</h3>
    <button onclick="create_zawartosc(${id_nastepnej_sekcji})" class="dodaj-tekst">Dodaj tekst</button>
    <div id="zawartosc_sekcji_${id_nastepnej_sekcji}">
    </div>`;
  } else if (typ_sekcji == "sfa"){
    var sekcja = document.createElement("div");
    sekcja.classList.add("sekcja");
    sekcja.id = `sekcja_${id_nastepnej_sekcji}`;
    sekcja.innerHTML = `
    <button onclick="close_sekcja(${id_nastepnej_sekcji})" class="close">X</button>
    <h3>SFA</h3>
    <label>Osoba notująca</label>
    <input type="text">
    <br>
    <button onclick="create_zawartosc(${id_nastepnej_sekcji})" class="dodaj-tekst">Dodaj tekst</button>
    <div id="zawartosc_sekcji_${id_nastepnej_sekcji}">
    </div>`;
  } else if (typ_sekcji == "przesluchanie"){
    var sekcja = document.createElement("div");
    sekcja.classList.add("sekcja");
    sekcja.id = `sekcja_${id_nastepnej_sekcji}`;
    sekcja.innerHTML = `
    <button onclick="close_sekcja(${id_nastepnej_sekcji})" class="close">X</button>
    <h3>Przesłuchanie</h3>
    <label>Przesłuchujący</label>
    <input type="text">
    <label>Przesłuchiwany</label>
    <input type="text">
    <br>
    <br>
    <button onclick="create_zawartosc(${id_nastepnej_sekcji})" class="dodaj-tekst">Dodaj tekst</button>
    <div id="zawartosc_sekcji_${id_nastepnej_sekcji}">
    </div>`;
  } else if (typ_sekcji == "badanie"){
    var sekcja = document.createElement("div");
    sekcja.classList.add("sekcja");
    sekcja.id = `sekcja_${id_nastepnej_sekcji}`;
    sekcja.innerHTML = `
    <button onclick="close_sekcja(${id_nastepnej_sekcji})" class="close">X</button>
    <h3>Badanie</h3>
    <label>Przeprowadzający badanie</label>
    <input type="text">
    <br>
    <label>Przedmioty w badaniu</label>
    <input type="text">
    <br>
    <button onclick="create_zawartosc(${id_nastepnej_sekcji})" class="dodaj-tekst">Dodaj tekst</button>
    <div id="zawartosc_sekcji_${id_nastepnej_sekcji}">
    </div>`;
  }

  id_nastepnej_sekcji += 1;
  var content = document.getElementById("content")
  content.appendChild(sekcja);
}

// tworzenie nowej zawartości
function create_zawartosc(sekcja_id) {
  var zawartosc = document.createElement("div");
  zawartosc.classList.add("zawartosc");
  zawartosc.id = `zawartosc_${id_nastepnej_zawartosci}`;
  zawartosc.innerHTML = `
    <button onclick="close_zawartosc(${id_nastepnej_zawartosci})" style="float: right; background-color: rgba(0, 0, 0, 0); border: none; cursor: pointer;">X</button>
    <label>Nazwa</label>
    <input class="nazwa" type="text">
    <a>Zawartość</a>
    <br>
    <textarea class="zawartosc-text"></textarea>
  `;
  id_nastepnej_zawartosci += 1;
  var sekcja = document.getElementById(`zawartosc_sekcji_${sekcja_id}`);
  sekcja.appendChild(zawartosc)
}

// zdjęcie obiektu
function img_button() {
  var img_button = document.getElementById("img-button");
  var img_div = document.getElementById("img-div");

  if(zdjecie_obiektu == false){
    zdjecie_obiektu = !zdjecie_obiektu;
    img_button.value = "ON";
    img_button.setAttribute("class", "img-button-on");
    img_div.style.display = "block";
  } else {
    zdjecie_obiektu = !zdjecie_obiektu;
    img_button.value = "OFF";
    img_button.setAttribute("class", "img-button-off");
    img_div.style.display = "none";
  }
}

// TODO dokończyć klasy (zmieniać tło)
// klasy
function safe() {
  is_safe = true;
  is_euclid = false;
  is_keter = false;
}
function euclid() {
  is_safe = false;
  is_euclid = true;
  is_keter = false;
}
function keter() {
  is_safe = false;
  is_euclid = false;
  is_keter = true;
}
function setter() {
  is_setter = true;
  is_metter = false;
  is_etther = false;
}
function metter() {
  is_setter = false;
  is_metter = true;
}
function etther() {
  is_setter = false;
  is_etther = true;
}

document.getElementById("safe-btn").addEventListener("click", safe);
document.getElementById("euclid-btn").addEventListener("click", euclid);
document.getElementById("keter-btn").addEventListener("click", keter);
document.getElementById("setter-btn").addEventListener("click", setter);
document.getElementById("metter-btn").addEventListener("click", metter);
document.getElementById("etther-btn").addEventListener("click", etther);