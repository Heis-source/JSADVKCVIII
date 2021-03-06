const express = require('express');
const PORT = 3000;

const app = express();

console.log(__dirname);

app.use(express.static('.')); // servidor de staticos como http-server .
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log('Listening...');
});

