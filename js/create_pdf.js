src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"

var form = document.getElementById('form');

form.addEventListener('submit',function(event) {
  event.preventDefault();

  var surname = document.getElementById('nickname').value
  var name = document.getElementById('email').value

  var doc = new jsPDF()

  doc.setFontSize(fontsize)

  doc.text(text,20,20)

  doc.save("output.pdf")

})

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