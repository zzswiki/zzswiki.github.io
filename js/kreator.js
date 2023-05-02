// maksymalnie 3 cyfry w ID 
const numberInput = document.getElementById("id-input");
numberInput.addEventListener("input", () => {
  if (numberInput.value.length > 3) {
    numberInput.value = numberInput.value.slice(0, 3);
  }
});

function close_sekcja(sekcja_id) {
  var sekcja = document.getElementById('sekcja_' + sekcja_id);
  sekcja.remove()
}

function close_zawartosc(sekcja_id , zawartosc_id) {
  var zawartosc = document.getElementById('zawartosc_' + sekcja_id + '_' + zawartosc_id);
  zawartosc.remove()
}
