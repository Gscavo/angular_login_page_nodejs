const connectToDatabase = require("./src/database/connect");
const {WebSocketServer} = require('./src/modules/ws');
const {app, printUrls, port} = require('./src/modules/express');

connectToDatabase();

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Rodando app na porta ${port}\nLinks mapeados:`);
    printUrls()
});

const webSocket = WebSocketServer(server);

module.exports = app;