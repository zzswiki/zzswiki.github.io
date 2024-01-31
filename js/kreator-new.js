var zdjecie_obiektu = true;

var is_safe = false;
var is_euclid = false;
var is_keter = false;
var is_setter = false;
var is_metter = false;
var is_etther = false;

var next_section_ID = 0;
var next_content_ID = 0;

var content = {};

var krator_version = "2.0";

// maksymalnie 3 cyfry w ID 
const numberInput = document.getElementById("id");
numberInput.addEventListener("input", () => {
  if (numberInput.value.length > 3) {
    numberInput.value = numberInput.value.slice(0, 3);
  }
});

// przycisk zdjęcia obiektu
$('#img-button').click(function () {
	if (zdjecie_obiektu){
		$(this).text("OFF");
		
	} else {
		$(this).text("ON");
	}
	$('#img-des').slideToggle();
	zdjecie_obiektu = !zdjecie_obiektu;
	$(this).toggleClass('off');
});

$('#safe-btn').click(function () { 
	setClassActive(true, "safe");
	setClassActive(false, "euclid");
	setClassActive(false, "keter");
});

$('#euclid-btn').click(function () { 
	setClassActive(false, "safe");
	setClassActive(true, "euclid");
	setClassActive(false, "keter");
});

$('#keter-btn').click(function () { 
	setClassActive(false, "safe");
	setClassActive(false, "euclid");
	setClassActive(true, "keter");
});

$('#setter-btn').click(function () { 
	setClassActive(true, "setter");
	setClassActive(false, "metter");
	setClassActive(false, "etther");
});

$('#metter-btn').click(function () { 
	setClassActive(false, "setter");
	setClassActive(true, "metter");
});

$('#etther-btn').click(function () { 
	setClassActive(false, "setter");
	setClassActive(true, "etther");
});

function setClassActive(active, name) {
	is_class = "is_" + name;
	window[is_class] = active;

	if (active){
		$('#' + name + '-btn').addClass('active');
	} else {
		$('#' + name + '-btn').removeClass('active');
	}
}

// ---------------- SEKCJE ----------------

$('#addSection').click(function () { 
	var section_type = $('#typ-sekcji').val();
	
	var tekst_section = `
	<div class="section_panel" id="section_${next_section_ID}" type="tekst">
		<button onclick="remove_section(${next_section_ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
		<h3>Tekst</h3>
		<div class="section_panel_content" id="section_panel_${next_section_ID}">
		</div>
		<button onclick="add_text(${next_section_ID});" class="add_text_btn">Dodaj tekst</button>
	</div>
	`;
	
	var sfa_section = `
	<div class="section_panel" id="section_${next_section_ID}" type="SFA">
		<button onclick="remove_section(${next_section_ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
		<h3>SFA</h3>
		<span>Osoba notująca</span>
		<input type="text">
		<div class="section_panel_content" id="section_panel_${next_section_ID}">
		</div>
		<button onclick="add_text(${next_section_ID});" class="add_text_btn">Dodaj tekst</button>
	</div>
	`;

	var przesluchanie_section = `
	<div class="section_panel" id="section_${next_section_ID}" type="przesluchanie">
		<button onclick="remove_section(${next_section_ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
		<h3>Przesłuchanie</h3>
		<span>Przesłuchujący</span>
		<br>
		<input type="text">
		<br><br>
		<span>Przesłuchiwany</span>
		<br>
		<input type="text">
		<div class="section_panel_content" id="section_panel_${next_section_ID}">
		</div>
		<button onclick="add_text(${next_section_ID});" class="add_text_btn">Dodaj tekst</button>
	</div>
	`;
	
	var badanie_section = `
	<div class="section_panel" id="section_${next_section_ID}" type="badanie>
		<button onclick="remove_section(${next_section_ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
		<h3>Badanie</h3>
		<span>Przeprowadzający badanie</span>
		<br>
		<input type="text">
		<br><br>
		<span>Przedmioty w badaniu</span>
		<br>
		<input type="text">
		<div class="section_panel_content" id="section_panel_${next_section_ID}">
		</div>
		<button onclick="add_text(${next_section_ID});" class="add_text_btn">Dodaj tekst</button>
	</div>
	`;

	if (section_type == "tekst"){
		$('#content').append(tekst_section);
	} else if (section_type == "sfa"){
		$('#content').append(sfa_section);
	} else if (section_type == "przesluchanie"){
		$('#content').append(przesluchanie_section);
	} else if (section_type == "badanie"){
		$('#content').append(badanie_section);
	}

	content[next_section_ID] = [];

	next_section_ID++;
});

function remove_section(ID) {
	$(window["section_" + ID]).remove();

	delete content[ID];
}

function remove_content(ID, section_ID) {
	$(window["content_" + ID]).remove();

	const index = content[section_ID].indexOf(ID);
	content[section_ID].splice(index, 1);
}

function add_text(ID) {
	var tekst_content = `
		<div class="content_panel" id="content_${next_content_ID}">
			<button onclick="remove_content(${next_content_ID}, ${ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
			<span>Nazwa</span>
			<input type="text" name="" id="">
			<p>Zawartość</p>
			<textarea name="" id="" rows="10"></textarea>
		</div>
	`;

	$(window["section_panel_" + ID]).append(tekst_content);
	content[ID].push(next_content_ID);
	next_content_ID++;
}

// ---------------- GENEROWANIE KODU ----------------

function format_output() {
	var object_ID = $('#id').val().padStart(3, '0');

	var class_list = "";
	var object_photo = "";
	var img_des = $('#img-des-text').val();

	if (is_safe) {
		class_list += `<img src="/media/class/safe.png">`;
	}
	if (is_euclid) {
		class_list += `<img src="/media/class/euclid.png">`;
	}
	if (is_keter) {
		class_list += `<img src="/media/class/keter.png">`;
	}
	if (is_setter) {
		class_list += `<img src="/media/class/setter.png">`;
	}
	if (is_metter) {
		class_list += `<img src="/media/class/metter.png">`;
	}
	if (is_etther) {
		class_list += `<img src="/media/class/etther.png">`;
	}

	if (zdjecie_obiektu) {
		object_photo = `
		<div class="img" style="float: right; margin: 20px;">
			<img src="media/img1.png" style="width: 250px; height: auto;">
			<p><strong>${img_des}</strong></p>
		</div>`;
	}

	var output = `
	<!DOCTYPE html>
	<html lang="pl">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link rel="stylesheet" type="text/css" href="/style/main.css">
			<link id="theme" rel="stylesheet" type="text/css" href="/style/site.css">
			<link rel="icon" href="/media/zzs.png">
			<title>ZZS-Wiki - ZZS-${object_ID}</title>
	
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
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
					${object_photo}
				<!-- END object img -->

				<!-- START head -->
				<h1>ZZS-${object_ID}</h1>
				<div class="class">
					${class_list} 
				</div>
				<!-- END head -->
	
				<!-- START section 1 -->
				<div class="section">
					<!-- START descriptionn -->
					<p>
						<strong>Identyfikator podmiotu: </strong>
						ZZS-002 <br>
						<br>
						<strong>Klasa podmiotu: </strong>
						Euclid, Metter <br>
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
	
				<p>By <a href="/profile/PieselKlif">Dr. Klif</a></p>
			</div>
			<!-- END content -->
			<script src="/js/theme.js"></script>
		</body>
	</html>
	
	`;

	$('#output').val(output);
}