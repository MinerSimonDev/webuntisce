const checkbox = document.getElementById('rememberInput');
const storageInformation = document.getElementById('storageInformation');
const timeTableToday = document.getElementById('timeTableToday');

const date = new Date();

var timeTableId;
var allClasses;
var timeTableJson;
var startTime;
var endTime;
var teacher;
var subject;
var room;

if (localStorage.getItem("backgroundColor")) {
  document.body.style.backgroundImage = `${localStorage.getItem("backgroundColor")}`;
}

if (localStorage.getItem("savedClass")) {
    var searchInput = document.getElementById('searchInput')
    searchInput.value = localStorage.getItem("savedClass");
}

function settingsButton() {
  location.href = "/settings"
}

var CheckBoxChecked = false;

checkbox.addEventListener('change', function() {
    if (this.checked) {
        storageInformation.style.display = 'contents';
        CheckBoxChecked = true;
    } else {
        storageInformation.style.display = 'none';
        CheckBoxChecked = false;
    }
});

fetch('/api/classes')
  .then(response => response.json())
  .then(data => {
    setTimeout(console.log("Waiting 0.001 seconds..."), 1)
    allClasses = data;
  })
  .catch(error => {
    console.error('Fehler beim Abrufen der Daten:', error);
  });

function getTimeTable() {
  fetch('/api/id')
    .then(response => response.json())
    .then(data => {
      timeTableJson = data;
      processTimeTable();
    })
    .catch(error => {
      console.error('Fehler beim Abrufen der Daten:', error);
    });
}

function processTimeTable() {
    let tt = timeTableJson;

function createSchedule(data) {

    const tableDiv = document.getElementById('tableDiv')
    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headers = ['Beginn', 'Ende', 'Fach', 'Lehrer', 'Raum'];
    headers.forEach(headerText => {
      const headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
    });

// Funktion zum Sortieren der Daten nach Startzeit
function sortByStartTime(a, b) {
  return a.startTime - b.startTime;
}

// Sortieren der Daten nach Startzeit
data.sort(sortByStartTime);

  data.forEach(activity => {

    const startTime = formatTime(activity.startTime);
    const endTime = formatTime(activity.endTime);
    const subject = activity.su[0].name;
    const teacher = activity.te[0].name;
    const room = activity.ro[0].name;

    const data = [{
      startTime: startTime,
      endTime: endTime,
      subject: subject,
      teacher: teacher,
      room: room
    }]

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

      data.forEach(rowData => {
        const row = document.createElement('tr');
  
      Object.values(rowData).forEach(cellData => {
        const cell = document.createElement('td');
        cell.textContent = cellData;
        row.appendChild(cell);
    });
  
  tbody.appendChild(row);
});

var divElement = document.getElementById('tableDiv');
divElement.innerHTML = '';

table.appendChild(tbody);
tableDiv.appendChild(table);

    // Daten als JSON ausgeben (auskommentiert da Erstellung von Tabelle direkt hier)
    // const timeTable = [];

    // entry.forEach(obj => {
    //   timeTable.push(entry);
    // });

    // const finalTimeTable = JSON.stringify(timeTable);

    // console.log(finalTimeTable);

  });
}

// Funktion zur Formatierung der WebUntis Zeit

function formatTime(time) {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  createSchedule(tt);
}

function submitInput() {
    if (CheckBoxChecked == true) {
        var searchInput = document.getElementById('searchInput').value;
        localStorage.setItem("savedClass", searchInput);
    }
    // Inhalt vom Textfeld
    var searchInput = document.getElementById('searchInput').value;
    let found = false;
    // name der Klasse + id für Stundenplan
    setTimeout(console.log("Waiting 0.5 second..."), 500)
    for (let i = 0; i < allClasses.length; i++) {
        if (allClasses[i].name.toLowerCase() == searchInput.toLowerCase()) {
            found = true;
            const data = {
                id: i,
              };
              const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              };
              
              fetch('/api/id', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setTimeout(function(){
                        getTimeTable();
                    }, 2000);
                })
                .catch(error => {
                  console.error('Fehler beim Senden der Daten:', error);
                });
        }
    }
    if (!found) {
        let newSearchInput = document.getElementById('searchInput');
        newSearchInput.value = "Klasse nicht gefunden!";
    } else {

    }
}