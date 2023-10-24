if (localStorage.getItem("backgroundColor")) {
  document.body.style.backgroundImage = `${localStorage.getItem("backgroundColor")}`;
}

function homeButton() {
    location.href = "/"
}

function showColorPicker(colorNum) {
    var colorPicker = document.getElementById('colorPicker');
    colorPicker.click();
    
    colorPicker.addEventListener('change', function() {
      var color = colorPicker.value;
      document.body.style.backgroundColor = color;
    });
  }

function changeBackground(color) {
  switch (color) {
    case 'cyan':
      document.body.style.backgroundImage = 'linear-gradient(to right, #2356ced7, #3885b8d7, #2c6a8ed7)';
      localStorage.setItem("backgroundColor", 'linear-gradient(to right, #2356ced7, #3885b8d7, #2c6a8ed7)');
      break;

    case 'mesa':
      document.body.style.backgroundImage = 'linear-gradient(to right, #d08711, #db6115, #d45b32)';
      localStorage.setItem("backgroundColor", 'linear-gradient(to right, #d08711, #db6115, #d45b32)');
      break;
  }
}