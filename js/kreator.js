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

  // TODO zrobić by zapisywało typ zawartości
  lista_sekcji.sekcje.push({
    'id' : id_nastepnej_sekcji,
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
    <input class="nazwa" type="text">
    <a>Zawartość</a>
    <br>
    <textarea class="zawartosc-text"></textarea>
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
  }

  if (is_setter == true){
    klasy_text += ", Setter";
    klasy_img += `<img src="/media/class/setter.png">`;
  }
  if (is_metter == true){
    klasy_text += ", Metter";
    klasy_img += `<img src="/media/class/setter.png">`;
  }
  if (is_etther == true){
    klasy_text += ", Etther";
    klasy_img += `<img src="/media/class/etther.png">`;
  }

  // zdjęcie obiektu
  if (zdjecie_obiektu == true){
    obiekt_img = `
      <div class="img" style="float: right; margin: 20px;">
        <img src="media/img1.png" style="width: 250px; height: auto;">
        <p><strong>${opis_zdjecia}</strong></p>
      </div>
    `
  }

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
          <!-- START head -->
          <h1>ZZS-${id}</h1>
          <div class="class">
            ${klasy_img}
          </div>
          <!-- END head -->
    
          <!-- START section 1 -->
          <div class="section">
            <!-- START object img -->
            ${obiekt_img}
            <!-- END object img -->
            
            <!-- START descriptionn -->
            <p>
              <strong>Identyfikator podmiotu: </strong>
              ZZS-${id} <br>
              <br>
              <strong>Klasa podmiotu: </strong>
              ${klasy_text} <br>
              <br>
              <strong>Specjalne Czynności Przechowawcze: </strong>
              Podmiot musi być przechowywanny w celi klasy 5b. Pomieszczenie musi być szczelnie zamknięte ze ścianami symulującymi otwarty świat oraz od godzinny 17 należy włączyć dźwięki
              symulujące jego roziców oraz 1 z 10 w telewizorze. <i>Maksymalna prętkość internetu w przechowywalni musi wynosić 1,5 Mb/s. Obowiązkowe jest cotygodniowe sprawdzenie przechowywalni pod kątem znalezienia prób przyśpieszenia internetu przez ZZS-002. (Zostało to zmienione w ZZS-002-SFA-001) </i>
              Pomieszczenie musi być monitorowane 24/7 lecz nikt oprócz uprawnień <b>WTA</b> nie może mieć dostępu do nagrań.<br>
              <br>
              <strong>Opis: </strong>
              Jest to niski obiekt mający około 1,5m. Jego waga jest nie znana, a o jego wyglądzie zewnętrznym można powiedzieć że ma lekką nadwagę oraz wygląda jak 14 latek. Jego ulubionym zajęciem jest granie / chwalenie się komputerem jego 
              ojca, oglądanie anime oraz nękanie <a href="/obiekty/ZZS-012/">ZZS-012</a>. ZZS-002 nagrywa każdą rozmowę oraz robi screany wszystkiego by dać to do teczek, przez takie działanie wszystkie teczki zająmują mu 75% dysku z 1tb. Obiekt 
              jest uzależniony od oglądania Anime, doszło to do takiego momentu że zaczą twierdzić iż jest anime dziewczynką <i>[ Więcej na temat tego jest na nagraniu "ZZS-002-LOG-001" ]</i>. Z niewyjaśnionych przyczyn obiekt przebywa przed komputerem 
              w następujących godzinach: <i>[poniedziałek - czwartek { 18 - 21 }, piątek { 18 - 22 }, sobota { 11 - 12, 18 - 22 }, niedziela { 11 - 12, 18 - 21 }]</i>.
            </p>
            <!-- END description -->
    
          </div>
          <!-- END section 1 -->
    
          <!-- START section 2 -->
          <div class="section">
            <hr>
          
            <!-- START audiolog -->
            <p>
              <strong>Audiolog z przesłuchania ZZS-002:</strong><br>
              <br>
              <strong>Przesłuchujący: </strong>
              Dr ███ <br>
              <strong>Przesłuchiwany: </strong>
              ZZS-002 <br>
              <strong>Sygnatura przesłuchania: </strong>
              ZZS-002-LOG-001
            </p>
            <blockquote>
              <p><strong>&lt;Początek nagrania&gt;</strong></p>
              <p>[czasu ████████ ████████, Strefa Badawcza ██]</p>
              <p><strong>Dr ███: </strong> Witaj 002, jak się dzisiaj czujesz?</p>
              <p><strong>ZZS-002: </strong> Dobrze.</p>
              <p><strong>Dr ███: </strong> Doszły mnie słuchy że zacząłeś oglądać anime. Zgadza się?</p>
              <p><strong>ZZS-002: </strong> Tak.</p>
              <p><strong>Dr ███: </strong> Dostaje informacje od człąków personelu że twoje zachowanie jest, jak by to powiedziec, dziwniejsze, bardziej kobiece czy jakoś tak. Możesz wytłumaczyć?</p>
              <p><strong>ZZS-002: </strong> Moje zachowanie jest spowodowane tym że jestem kobietą, a dokładniej dziewczyną.</p>
              <p><strong>Dr ███: </strong> Jak to dziewczyną? Wszystkie badania stwierdzają że jesteś mężczyzną.</p>
              <p><strong>ZZS-002: </strong> Bo to są tylko badania zewnętrzne. Wewnątrz tego brzydkiego, brudnego, spasionego chłopca znajdzuje się dziewczynka, taka mała, słotka, urocza, taka jak w anime które oglądam. Kocham je. Muszę mieć ich więcej. Słyszysz? Chce ich więcej! Sprowadź mi je!</p>
              <p><strong>Dr ███: </strong> Kogo?</p>
              <p><strong>ZZS-002: </strong> Je. Przynieś mi je.</p>
              <p>[ Obiekt wyciąga kartkę z wygrukowanym zdjęciem <a href="media/img2.jpg" target="_blank">[LINK]</a> ]</p>
              <p><strong>Dr ███: </strong> Wrócimy jeszcze do tego na kolejnym spotkaniu. Jak narazie to będzie na tyle.</p>
              <p><strong>&lt;Koniec nagrania&gt;</strong></p>
            </blockquote>
            <!-- END audiolog -->
    
          </div>
          <!-- END section 2 -->
    
          <!-- START section 3 -->
          <div class="section">
            <hr>
    
            <!-- START SFA -->
              <p>
                <strong>Osoba notująca: </strong>
                Dr ███ <br>
                <strong>sygnatura SFA: </strong>
                ZZS-002-SFA-001
              </p>
              <blockquote>
                <p><strong>&lt;Początek SFA&gt;</strong></p>
                <p>[01.08.2022 20:46, Strefa Badawcza ██]</p>
                <p><b>T + 0:00</b> ZZS-002 zachowuje się dziwnie, o godzinie 18 zammiast usiąść przed komputerem jak zazwyczaj zaczą krążyć wokoł pokooju.</p>
                <p><b>T + 3:24</b> Obiekt zaczą wąchać ścianę, wydaje się to dziwne zwłaszcza że chwilę wcześniej polizał swoją ulubioną figurkę anime dziewczynki.</p>
                <p><b>T + 5:57</b> Jesteśmy gotowi na użycie protokołu "PRZEMOC", obiekt zaczą wydrapywać dziurę w ścianie.</p>
                <p><b>T + 7:16</b> Wkroczenie drużyny GROM nic nie dało, obiekt zabił każdego kto wszedł do przechowywalni, postanowiliśmy przeczekać by zobaczyć dalsze działania obiektu.</p>
                <p><b>T + 9:11</b> Obiekt znalazł połączenie interentowe w ścianie, po kontakcie z radą uznaliśmy że możemy pozwolić mu na dalsze działania</p>
                <p><b>T + 10:43</b> Udało się podłączyć obiektowi komputer z połączeniem internetowym w ścianie.</p>
                <p><b>20:58</b> Obiekt o godzinie 20:58 włączył discorda, wysłał na jakiś serwer screen, udało nam się go przechwycić <a href="media/img3.png" target="_blank">[LINK]</a></p>
                <p><strong>&lt;Koniec SFA&gt;</strong></p>
              </blockquote>
            <!-- END SFA -->
    
          </div>
          <!-- END section 3 -->
    
          <p>By <a href="/profile/${autor_nick}.html">${autor_wyswietlana}</a></p>
        </div>
        <!-- END content -->
        <script src="/js/theme/datk-theme-site.js"></script>
      </body>
    </html>
  `
}