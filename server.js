const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

console.log("Le serveur backend tourne sur http://localhost:" + 3000)
server.listen(process.env.PORT || 3000);