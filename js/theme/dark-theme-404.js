// funkcja do pobierania wartości cookie
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// funkcja do ustawienia motywu strony
function setTheme() {
  const theme = getCookie("theme") || "light"; // pobieramy wartość z pliku cookie lub ustawiamy jasny motyw, jeśli nie ma pliku cookie
  const cssFile = theme === "light" ? "/style/404.css" : "/style/dark/404-dark.css";
  document.getElementById("theme").href = cssFile; // zmieniamy plik CSS
}

// ustawiamy motyw przy załadowaniu strony
setTheme();
