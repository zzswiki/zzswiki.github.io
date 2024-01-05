var zdjecie_obiektu = true;

var is_safe = false;
var is_euclid = false;
var is_keter = false;
var is_setter = false;
var is_metter = false;
var is_etther = false;

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

var tekst_section = `
<div class="section_panel">
	<h3>Tekst</h3>
</div>
`;

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

	$('#content').append(window[section_type + "_section"]);
});