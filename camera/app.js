const express = require('express');
const app = express();
const http = require('http').Server(app);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
