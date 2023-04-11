// funkcja do ustawiania wartości cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

// funkcja do przełączania motywu
function toggleTheme() {
  const theme = getCookie("theme");
  const newTheme = theme === "light" ? "dark" : "light";
  setCookie("theme", newTheme, 7); // ustawiamy ciasteczko z ważnością 7 dni
  const cssFile = newTheme === "light" ? "/style/main.css" : "/style/dark/main-dark.css";
  document.getElementById("theme").href = cssFile; // zmieniamy plik CSS
}

// ustawiamy domyślny motyw
const defaultTheme = getCookie("theme") || "light";
const cssFile = defaultTheme === "light" ? "/style/main.css" : "/style/dark/main-dark.css";
document.getElementById("theme").href = cssFile;

// nasłuchujemy kliknięcia na przycisk toggle
document.getElementById("toggle-btn").addEventListener("click", toggleTheme);
