// Funkcja do ustawiania pliku cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Funkcja do sprawdzania, czy użytkownik zaakceptował regulamin
function checkTermsAndConditions() {
  var accepted = getCookie("terms_accepted");
  if (accepted) {
    // Użytkownik zaakceptował regulamin
    document.getElementById("informacja").style.display = "none"
  } else {
    // Użytkownik jeszcze nie zaakceptował regulaminu
    document.getElementById("informacja").style.display = "block"
  }
}

// Funkcja do odczytywania wartości pliku cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Funkcja wywoływana po kliknięciu przycisku akceptacji regulaminu
function acceptTermsAndConditions() {
  setCookie("terms_accepted", "true", 365); // Ustawia plik cookie na rok
	document.getElementById("informacja").style.display = "none"
}

// Wywołanie funkcji sprawdzającej po załadowaniu strony
checkTermsAndConditions();
