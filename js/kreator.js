// zmienne
var id_nastepnej_sekcji = 1;
var id_nastepnej_zawartosci = 1;
var lista_sekcji = [];
var lista_zawartosci = [];

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
