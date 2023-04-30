// maksymalnie 3 cyfry w ID 
const numberInput = document.getElementById("id-input");
numberInput.addEventListener("input", () => {
  if (numberInput.value.length > 3) {
    numberInput.value = numberInput.value.slice(0, 3);
  }
});
