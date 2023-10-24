import express from 'express';
import { WebUntisAnonymousAuth, WebUntisElementType } from 'webuntis';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
import path from 'path';

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get('/api/classes', (req, res) => {
  getClassesAsync();
  async function getClassesAsync() {
    // New Untis Session
    const untis = new WebUntisAnonymousAuth('HTL Dornbirn', 'hypate.webuntis.com');
    // Login
    await untis.login();
    // Get all classes
    const classes = await untis.getClasses();
    // Send data as json to /api/classes
    res.json(classes);
    // Logout
    await untis.logout();
  }
});

var timetable = null;

app.get('/api/id', (req, res) => { 
  res.json(timetable);
})

app.post('/api/id', (req, res) => {
  const id = req.body.id;
  getTimeTable(id);
  res.json("successfully sent data")
});

async function getTimeTable(id) {
    // New Untis Session
    const untis = new WebUntisAnonymousAuth('HTL Dornbirn', 'hypate.webuntis.com');
    // Login
    await untis.login();
    // Get all classes
    const classes = await untis.getClasses();
    timetable = await untis.getTimetableForToday(classes[id].id, WebUntisElementType.CLASS);
    // Logout
    await untis.logout();
}

app.get('/qrcode-login', (req, res) => {
  // Logik für die zweite Website
  res.sendFile(path.join(__dirname, 'public', 'qrcode-login', 'index.html'));
});

app.get('/settings', (req, res) => {
  // Logik für die zweite Website
  res.sendFile(path.join(__dirname, 'public', 'settings', 'index.html'));
});