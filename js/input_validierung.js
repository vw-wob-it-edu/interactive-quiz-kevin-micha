const surname = document.getElementById("nickname");
const name = document.getElementById("email");
const submit = document.getElementById("submit");

surname.addEventListener("input", checkInputs);
name.addEventListener("input", checkInputs);

function checkInputs() {
  if (surname.value.trim() !== "" && name.value.trim() !== "") {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}