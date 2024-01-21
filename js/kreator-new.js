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

var sfa_section = `
<div>
	<p>sfa</p>
</div>
`;

var przesluchanie_section = `
<div>
	<p>przesluchanie</p>
</div>
`;

var badanie_section = `
<div>
	<p>badanie</p>
</div>
`;

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

function remove_content(ID) {
	$(window["content_" + ID]).remove();
}

function add_text(ID) {
	var tekst_content = `
		<div class="content_panel" id="content_${next_content_ID}">
			<button onclick="remove_content(${next_content_ID});" class="close_btn"><ion-icon name="trash-outline" class="remove_section_panel"></ion-icon></button>
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
