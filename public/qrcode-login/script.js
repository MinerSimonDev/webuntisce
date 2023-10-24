const storageInformation = document.getElementById('storageInformation');
const checkbox = document.getElementById('rememberInput');

var CheckBoxChecked = false;

if (localStorage.getItem("backgroundColor")) {
    document.body.style.backgroundImage = `${localStorage.getItem("backgroundColor")}`;
  }  

checkbox.addEventListener('change', function() {
    if (this.checked) {
        storageInformation.style.display = 'contents';
        CheckBoxChecked = true;
    } else {
        storageInformation.style.display = 'none';
        CheckBoxChecked = false;
    }
});

document.body.style.backgroundImage = "linear-gradient(to right, #d08711, #db6115, #d45b32)";

function settingsButton() {
    location.href = "/settings"
}
