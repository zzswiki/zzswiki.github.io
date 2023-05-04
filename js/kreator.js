// zmienne
var id_nastepnej_sekcji = 1;
var id_nastepnej_zawartosci = 1;
let lista_sekcji = {
  'sekcje' : []
};

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

  for (let i = 0; i < lista_sekcji.sekcje.length; i++){
    if (lista_sekcji.sekcje[i]['id'] == sekcja_id){
      lista_sekcji.sekcje.splice(i, 1);
    };
  };
}

// usunięcie zawartości
function close_zawartosc(sekcja_id, zawartosc_id) {
  var zawartosc = document.getElementById(`zawartosc_${zawartosc_id}`);
  zawartosc.remove()

  for (let i = 0; i < lista_sekcji.sekcje.length; i++){
    if (lista_sekcji.sekcje[i]['id'] == sekcja_id){
      let index = lista_sekcji.sekcje[i]['id_zawartosci'].indexOf(zawartosc_id);
      lista_sekcji.sekcje[i]['id_zawartosci'].splice(index, 1);
    };
  };
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
    <input type="text" id="osoba_notujaca_${id_nastepnej_sekcji}">
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
    <input type="text" id="przesluchujacy_${id_nastepnej_sekcji}">
    <label>Przesłuchiwany</label>
    <input type="text" id="przesluchiwany_${id_nastepnej_sekcji}">
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
    <input type="text" id="przeprowadzajacy_badanie_${id_nastepnej_sekcji}">
    <br>
    <label>Przedmioty w badaniu</label>
    <input type="text" id="przedmioty_w_badaniu_${id_nastepnej_sekcji}">
    <br>
    <button onclick="create_zawartosc(${id_nastepnej_sekcji})" class="dodaj-tekst">Dodaj tekst</button>
    <div id="zawartosc_sekcji_${id_nastepnej_sekcji}">
    </div>`;
  }

  lista_sekcji.sekcje.push({
    'id' : id_nastepnej_sekcji,
    'typ' : typ_sekcji,
    'id_zawartosci' : []
  });

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
    <button onclick="close_zawartosc(${sekcja_id}, ${id_nastepnej_zawartosci})" style="float: right; background-color: rgba(0, 0, 0, 0); border: none; cursor: pointer;">X</button>
    <label>Nazwa</label>
    <input class="nazwa" type="text" id="text-nazwa-${id_nastepnej_zawartosci}">
    <a>Zawartość</a>
    <br>
    <textarea class="zawartosc-text" id="text-zawartosc-${id_nastepnej_zawartosci}"></textarea>
  `;

  for (let i = 0; i < lista_sekcji.sekcje.length; i++){
    if (lista_sekcji.sekcje[i]['id'] == sekcja_id){
      lista_sekcji.sekcje[i]['id_zawartosci'].push(id_nastepnej_zawartosci);
    };
  };

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

// klasy
function safe() {
  is_safe = true;
  is_euclid = false;
  is_keter = false;

  var safe = document.getElementById("safe-btn");
  var euclid = document.getElementById("euclid-btn");
  var keter = document.getElementById("keter-btn");

  safe.setAttribute("class", "active");
  euclid.setAttribute("class", "deactivate");
  keter.setAttribute("class", "deactivate");
}
function euclid() {
  is_safe = false;
  is_euclid = true;
  is_keter = false;

  var safe = document.getElementById("safe-btn");
  var euclid = document.getElementById("euclid-btn");
  var keter = document.getElementById("keter-btn");

  safe.setAttribute("class", "deactivate");
  euclid.setAttribute("class", "active");
  keter.setAttribute("class", "deactivate");
}
function keter() {
  is_safe = false;
  is_euclid = false;
  is_keter = true;

  var safe = document.getElementById("safe-btn");
  var euclid = document.getElementById("euclid-btn");
  var keter = document.getElementById("keter-btn");

  safe.setAttribute("class", "deactivate");
  euclid.setAttribute("class", "deactivate");
  keter.setAttribute("class", "active");
}
function setter() {
  is_setter = true;
  is_metter = false;
  is_etther = false;

  var setter = document.getElementById("setter-btn");
  var metter = document.getElementById("metter-btn");
  var etther = document.getElementById("etther-btn");

  setter.setAttribute("class", "active");
  metter.setAttribute("class", "deactivate");
  etther.setAttribute("class", "deactivate");
}
function metter() {
  is_setter = false;
  is_metter = true;

  var setter = document.getElementById("setter-btn");
  var metter = document.getElementById("metter-btn");

  setter.setAttribute("class", "deactivate");
  metter.setAttribute("class", "active");
}
function etther() {
  is_setter = false;
  is_etther = true;

  var setter = document.getElementById("setter-btn");
  var etther = document.getElementById("etther-btn");

  setter.setAttribute("class", "deactivate");
  etther.setAttribute("class", "active");
}

document.getElementById("safe-btn").addEventListener("click", safe);
document.getElementById("euclid-btn").addEventListener("click", euclid);
document.getElementById("keter-btn").addEventListener("click", keter);
document.getElementById("setter-btn").addEventListener("click", setter);
document.getElementById("metter-btn").addEventListener("click", metter);
document.getElementById("etther-btn").addEventListener("click", etther);

function generuj() {
  // zmienne
  var output = document.getElementById("output");
  var id_obiektu = document.getElementById("id-input").value;
  var id = id_obiektu.toString().padStart(3, '0');
  var autor_nick = document.getElementById("autor-nick").value;
  var autor_wyswietlana = document.getElementById("autor-wyswietlana").value;
  var klasy_text = "";
  var klasy_img = "";
  var obiekt_img = "";
  var opis_zdjecia = document.getElementById("opis-zdjecia").value;
  var sekcje_text = "";
  var sygnatura_sfa = 1;
  var sygnatura_przesluchania = 1;
  var sygnatura_badania = 1;

  // klasy
  if (is_safe == true){
    klasy_text = "Safe";
    klasy_img = `<img src="/media/class/safe.png">`;
  } else if (is_euclid == true){
    klasy_text = "Euclid";
    klasy_img = `<img src="/media/class/euclid.png">`;
  } else if (is_keter == true){
    klasy_text = "Keter";
    klasy_img = `<img src="/media/class/keter.png">`;
  };

  if (is_setter == true){
    klasy_text += ", Setter";
    klasy_img += `<img src="/media/class/setter.png">`;
  };
  if (is_metter == true){
    klasy_text += ", Metter";
    klasy_img += `<img src="/media/class/metter.png">`;
  };
  if (is_etther == true){
    klasy_text += ", Etther";
    klasy_img += `<img src="/media/class/etther.png">`;
  };

  // zdjęcie obiektu
  if (zdjecie_obiektu == true){
    obiekt_img = `
      <div class="img" style="float: right; margin: 20px;">
        <img src="media/img1.png" style="width: 250px; height: auto;">
        <p><strong>${opis_zdjecia}</strong></p>
      </div>
    `;
  };

  // sekcje
  for (let i = 0; i < lista_sekcji.sekcje.length; i++){
    sekcje_text += `
    <div class="section">
    `
    if (lista_sekcji.sekcje[i]['typ'] == "tekst"){
      for (let x = 0; x < lista_sekcji.sekcje[i]['id_zawartosci'].length; x++){
        var id_zaw = lista_sekcji.sekcje[i]['id_zawartosci'][x];
        var nazwa = document.getElementById(`text-nazwa-${id_zaw}`).value;
        var zawartosc = document.getElementById(`text-zawartosc-${id_zaw}`).value;

        sekcje_text += `
        <p>
          <strong>${nazwa}</strong>
          ${zawartosc}
          <br>
        </p>
        `
      }
    } else if (lista_sekcji.sekcje[i]['typ'] == "sfa"){
      var sekcja_id = lista_sekcji.sekcje[i]['id'];
      var osoba_notujaca = document.getElementById(`osoba_notujaca_${sekcja_id}`).value;

      sekcje_text += `
        <p>
          <strong>Osoba notująca: </strong>
          ${osoba_notujaca} <br>
          <strong>sygnatura SFA: </strong>
          ZZS-${id}-SFA-${sygnatura_sfa.toString().padStart(3, '0')}
        </p>
        <blockquote>
          <p><strong>&lt;Początek SFA&gt;</strong></p>
      `
      sygnatura_sfa++;
      for (let x = 0; x < lista_sekcji.sekcje[i]['id_zawartosci'].length; x++){
        var id_zaw = lista_sekcji.sekcje[i]['id_zawartosci'][x];
        var nazwa = document.getElementById(`text-nazwa-${id_zaw}`).value;
        var zawartosc = document.getElementById(`text-zawartosc-${id_zaw}`).value;

        sekcje_text += `
        <p><b>${nazwa}</b> ${zawartosc}</p>
        `
      }
      sekcje_text += `
          <p><strong>&lt;Koniec nagrania&gt;</strong></p>
        </blockquote>
      `
    } else if (lista_sekcji.sekcje[i]['typ'] == "przesluchanie"){
      var sekcja_id = lista_sekcji.sekcje[i]['id'];
      var przesluchujacy = document.getElementById(`przesluchujacy_${sekcja_id}`).value;
      var przesluchiwany = document.getElementById(`przesluchiwany_${sekcja_id}`).value;

      sekcje_text += `
          <p>
            <strong>Audiolog z przesłuchania ${przesluchiwany}:</strong><br>
            <br>
            <strong>Przesłuchujący: </strong>
            ${przesluchujacy} <br>
            <strong>Przesłuchiwany: </strong>
            ${przesluchiwany} <br>
            <strong>Sygnatura przesłuchania: </strong>
            ZZS-${id}-LOG-${sygnatura_przesluchania.toString().padStart(3, '0')}
          </p>
        <blockquote>
          <p><strong>&lt;Początek nagrania&gt;</strong></p>
      `
      sygnatura_przesluchania++;
      for (let x = 0; x < lista_sekcji.sekcje[i]['id_zawartosci'].length; x++){
        var id_zaw = lista_sekcji.sekcje[i]['id_zawartosci'][x];
        var nazwa = document.getElementById(`text-nazwa-${id_zaw}`).value;
        var zawartosc = document.getElementById(`text-zawartosc-${id_zaw}`).value;

        sekcje_text += `
        <p><b>${nazwa}:</b> ${zawartosc}</p>
        `
      }
      sekcje_text += `
          <p><strong>&lt;Koniec nagrania&gt;</strong></p>
        </blockquote>
      `
    } else if (lista_sekcji.sekcje[i]['typ'] == "badanie"){
      var sekcja_id = lista_sekcji.sekcje[i]['id'];
      var przeprowadzajacy_badanie = document.getElementById(`przeprowadzajacy_badanie_${sekcja_id}`).value;
      var przedmioty_w_badaniu = document.getElementById(`przedmioty_w_badaniu_${sekcja_id}`).value;

      sekcje_text += `
      <p>
        <strong>Badanie przeprowadzone na ZZS-${id}:</strong><br>
        <br>
        <strong>Przeprowadzający badanie: </strong>
        ${przeprowadzajacy_badanie} <br>
        <strong>Obiekt: </strong>
        ZZS-${id} <br>
        <strong>Sygnatura badania: </strong>
        ZZS-${id}-LOG-B-${sygnatura_badania} <br>
        <strong>Przedmioty wykorzystane w badaniu: </strong>
        ${przedmioty_w_badaniu}
      </p>
      <blockquote>
      `

      sygnatura_badania++;
      for (let x = 0; x < lista_sekcji.sekcje[i]['id_zawartosci'].length; x++){
        var id_zaw = lista_sekcji.sekcje[i]['id_zawartosci'][x];
        var nazwa = document.getElementById(`text-nazwa-${id_zaw}`).value;
        var zawartosc = document.getElementById(`text-zawartosc-${id_zaw}`).value;

        sekcje_text += `
        <p><strong>${nazwa}</strong></p>
        <p>${zawartosc}</p>
        `
      }
      sekcje_text += `
      </blockquote>
      `
    }

    sekcje_text += `
    </div>
    `
    
    if (i != lista_sekcji.sekcje.length - 1){
      sekcje_text += `
        <hr>
      `
    }
  };

  // output
  output.value = `
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/style/main.css">
    <link id="theme" rel="stylesheet" type="text/css" href="/style/dark/site-dark.css">
    <link rel="icon" href="/media/zzs.png">
    <title>ZZS-Wiki - ZZS-${id}</title>
  </head>
  <body>
    <!-- START top bar -->
    <div id="top">
      <div class="topnav">
        <a href="/">Home</a>
      </div>
    </div>
    <!-- END top bar -->

    <!-- main content -->
    <div class="siteWeb">
      <!-- START object img -->
      ${obiekt_img}
      <!-- END object img -->
      <!-- START head -->
      <h1>ZZS-${id}</h1>
      <div class="class">
        ${klasy_img}
      </div>
      <!-- END head -->

      <!-- START section 1 -->
      <div class="section">
        <!-- START descriptionn -->
        <p>
          <strong>Identyfikator podmiotu: </strong>
          ZZS-${id} <br>
          <br>
          <strong>Klasa podmiotu: </strong>
          ${klasy_text} <br>
          <br>
        <!-- END description -->

      </div>
      
      ${sekcje_text}

      <p>By <a href="/profile/${autor_nick}.html">${autor_wyswietlana}</a></p>
    </div>
    <!-- END content -->
    <script src="/js/theme/datk-theme-site.js"></script>
  </body>
</html>
  `
}