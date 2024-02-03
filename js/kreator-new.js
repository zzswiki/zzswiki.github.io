var zdjecie_obiektu = true;

var is_safe = false;
var is_euclid = false;
var is_keter = false;
var is_setter = false;
var is_metter = false;
var is_etther = false;

var next_section_ID = 0;
var next_content_ID = 0;

var content = [];

var crator_version = "2.0";

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
	<div class="section_panel" id="section_${next_section_ID}">
		<button onclick="remove_section(${next_section_ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
		<h3>Tekst</h3>
		<div class="section_panel_content" id="section_panel_${next_section_ID}">
		</div>
		<button onclick="add_text(${next_section_ID});" class="add_text_btn">Dodaj tekst</button>
	</div>
	`;
	
	var sfa_section = `
	<div class="section_panel" id="section_${next_section_ID}">
		<button onclick="remove_section(${next_section_ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
		<h3>SFA</h3>
		<span>Osoba notująca</span>
		<input type="text" id="sfa_${next_section_ID}">
		<div class="section_panel_content" id="section_panel_${next_section_ID}">
		</div>
		<button onclick="add_text(${next_section_ID});" class="add_text_btn">Dodaj tekst</button>
	</div>
	`;

	var przesluchanie_section = `
	<div class="section_panel" id="section_${next_section_ID}">
		<button onclick="remove_section(${next_section_ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
		<h3>Przesłuchanie</h3>
		<span>Przesłuchujący</span>
		<br>
		<input type="text" id="przesluchujacy_${next_section_ID}">
		<br><br>
		<span>Przesłuchiwany</span>
		<br>
		<input type="text" id="przesluchiwany_${next_section_ID}">
		<div class="section_panel_content" id="section_panel_${next_section_ID}">
		</div>
		<button onclick="add_text(${next_section_ID});" class="add_text_btn">Dodaj tekst</button>
	</div>
	`;
	
	var badanie_section = `
	<div class="section_panel" id="section_${next_section_ID}">
		<button onclick="remove_section(${next_section_ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
		<h3>Badanie</h3>
		<span>Przeprowadzający badanie</span>
		<br>
		<input type="text" id="badanie_osoba_${next_section_ID}">
		<br><br>
		<span>Przedmioty w badaniu</span>
		<br>
		<input type="text" id="badanie_przedmioty_${next_section_ID}">
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

	var section_push = {
		'id' : next_section_ID,
		'type' : section_type,
		'section_content' : []
	};

	content.push(section_push);

	next_section_ID++;
});

function remove_section(ID) {
	$(window["section_" + ID]).remove();

	for (let index = 0; index < content.length; index++) {
		const element = content[index];
		if (element['id'] == ID) {
			content.splice(index, 1);
		}
	}
}

function remove_content(ID, section_ID) {
	for (let index = 0; index < content.length; index++) {
		const element = content[index];
		if (element['id'] == section_ID) {
			const content_index = content[index]['section_content'].indexOf(ID);
			element['section_content'].splice(content_index, 1);
		}
	}
	
	$(window["content_" + ID]).remove();
}

function add_text(ID) {
	var tekst_content = `
		<div class="content_panel" id="content_${next_content_ID}">
			<button onclick="remove_content(${next_content_ID}, ${ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
			<span>Nazwa: </span>
			<input type="text" name="" id="name_${next_content_ID}">
			<p>Zawartość:</p>
			<textarea name="" id="text_content_${next_content_ID}" rows="10"></textarea>
		</div>
	`;

	$(window["section_panel_" + ID]).append(tekst_content);

	for (let index = 0; index < content.length; index++) {
		const element = content[index];
		if (content[index]['id'] == ID) {
			element['section_content'].push(next_content_ID);
		}
	}
	next_content_ID++;
}

// ---------------- GENEROWANIE KODU ----------------

function format_output() {
	var object_ID = $('#id').val().padStart(3, '0');

	var class_list = "";
	var class_list_names = "";
	var object_photo = "";
	var img_des = $('#img-des-text').val();
	var main_content = "";
	var sfa_num = 1;
	var badanie_num = 1;
	var przesluchanie_num = 1;

	if (is_safe) {
		class_list += `<img src="/media/class/safe.png">`;
		class_list_names = 'Safe';
	}
	if (is_euclid) {
		class_list += `<img src="/media/class/euclid.png">`;
		class_list_names = 'Euclid';
	}
	if (is_keter) {
		class_list += `<img src="/media/class/keter.png">`;
		class_list_names = 'Keter';
	}
	if (is_setter) {
		class_list += `<img src="/media/class/setter.png">`;
		class_list_names += ', Setter';
	}
	if (is_metter) {
		class_list += `<img src="/media/class/metter.png">`;
		class_list_names += ', Metter';
	}
	if (is_etther) {
		class_list += `<img src="/media/class/etther.png">`;
		class_list_names += ', Etther';
	}

	if (zdjecie_obiektu) {
		object_photo = `
			<div class="img" style="float: right; margin: 20px;">
				<img src="media/img1.png" style="width: 250px; height: auto;">
				<p><strong>${img_des}</strong></p>
			</div>`;
	}

	var autor_nick = $('#autor-nick').val();
	var autor_wyswietlana = $('#autor-wyswietlana').val();

	for (let index = 0; index < content.length; index++) {
		const element = content[index];
		let text_content = "";

		if (element['type'] == 'tekst') {
			for (let index2 = 0; index2 < element['section_content'].length; index2++) {
				const content_id_list = element['section_content'][index2];
				const content_name = $(window["name_" + content_id_list]).val();
				const content_content = $(window["text_content_" + content_id_list]).val();;
	
				text_content += `
				<p><b>${content_name}</b>${content_content}</p>
				`;
			}
	
			main_content += `
			<!-- START section -->
				<div class="section">
					${text_content}
				</div>
				<hr>
			<!-- END section -->
			`;
		} else if (element['type'] == 'sfa'){
			for (let index2 = 0; index2 < element['section_content'].length; index2++) {
				const content_id_list = element['section_content'][index2];
				const content_name = $(window["name_" + content_id_list]).val();
				const content_content = $(window["text_content_" + content_id_list]).val();;
				
				text_content += `
				<p><b>${content_name}</b>${content_content}</p>
				`;
			}

			var sfa_num_t = sfa_num.toString().padStart(3, '0');
			const sfa_noted = $(window["sfa_" + element['id']]).val();

			main_content += `
			<!-- START section -->
				<div class="section">
					<p><b>Osoba notująca:</b> ${sfa_noted}</p>
					<p><b>sygnatura SFA:</b> ZZS-${object_ID}-SFA-${sfa_num_t}</p>
					<blockquote>
						<p><b>&lt;Początek SFA&gt;</b></p>
						${text_content}
						<p><b>&lt;Koniec SFA&gt;</b></p>
					</blockquote>
				</div>
				<hr>
			<!-- END section -->
			`;

			sfa_num++;

		} else if (element['type'] == 'badanie'){
			for (let index2 = 0; index2 < element['section_content'].length; index2++) {
				const content_id_list = element['section_content'][index2];
				const content_name = $(window["name_" + content_id_list]).val();
				const content_content = $(window["text_content_" + content_id_list]).val();;
				
				text_content += `
				<p><b>${content_name}</b>${content_content}</p>
				`;
			}

			var badanie_num_t = badanie_num.toString().padStart(3, '0');
			const badanie_osoba = $(window["badanie_osoba_" + element['id']]).val();
			const badanie_przedmioty = $(window["badanie_przedmioty_" + element['id']]).val();

			main_content += `
			<!-- START section -->
				<div class="section">
					<p><b>Badanie przeprowadzone na ZZS-${object_ID}</b></p>
					<p><b>Przeprowadzający badanie:</b> ${badanie_osoba}</p>
					<p><b>Obiekt:</b> ${badanie_przedmioty}</p>
					<p><b>Sygnatura badania:</b> ZZS-${object_ID}-LOG-B-${badanie_num_t}</p>
					<blockquote>
						${text_content}
					</blockquote>
				</div>
				<hr>
			<!-- END section -->
			`;

			badanie_num++;

		} else if (element['type'] == 'przesluchanie'){
			for (let index2 = 0; index2 < element['section_content'].length; index2++) {
				const content_id_list = element['section_content'][index2];
				const content_name = $(window["name_" + content_id_list]).val();
				const content_content = $(window["text_content_" + content_id_list]).val();;
				
				text_content += `
				<p><b>${content_name}</b>${content_content}</p>
				`;
			}

			var przesluchanie_num_t = przesluchanie_num.toString().padStart(3, '0');
			const przesluchujacy = $(window["przesluchujacy_" + element['id']]).val();
			const przesluchiwany = $(window["przesluchiwany_" + element['id']]).val();

			main_content += `
			<!-- START section -->
				<div class="section">
					<p><b>Audiolog z przesłuchania ZZS-${object_ID}:</b></p>
					<p><b>Przesłuchujący:</b> ${przesluchujacy}</p>
					<p><b>Przesłuchiwany:</b> ${przesluchiwany}</p>
					<p><b>Sygnatura badania:</b> ZZS-${object_ID}-LOG-${przesluchanie_num_t}</p>
					<blockquote>
						<p><b>&lt;Początek nagrania&gt;</b></p>
						${text_content}
						<p><b>&lt;Koniec nagrania&gt;</b></p>
					</blockquote>
				</div>
				<hr>
			<!-- END section -->
			`;

			przesluchanie_num++;

		}
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

			<br>
			<span><strong>Identyfikator podmiotu:</strong> ZZS-${object_ID}</span>
			<br><br>
			<span><strong>Klasa podmiotu:</strong> ${class_list_names}</span>
			<br><br>			
			${main_content}
			<p>By <a href="/profile/${autor_nick}">${autor_wyswietlana}</a></p>
			<p class="creator-info">In creator ${crator_version}</p>
		</div>
		<!-- END content -->
		<script src="/js/theme.js"></script>
	</body>
</html>
	
	`;

	$('#output').val(output);
	update_iframe(output);
}

function update_iframe(output) {
  document.getElementById('view').contentWindow.location.reload(true);

  setTimeout(function() {
    document.getElementById('view').contentWindow.document.write(output);
  }, 100);
}