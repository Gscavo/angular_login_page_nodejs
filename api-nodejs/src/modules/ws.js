const uuidv4 = require('./uuidv4');
const WebSocket = require('ws');

const clientsList = new Map();

const onConnection = (ws, req) => {
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color };
    clientsList.set(ws, metadata);

    ws.on('message', data => {
        onMessage(ws, data);
    });
    ws.on('error', error => {
        onError(ws, error);
    });
    ws.on('close', () => {
        console.log(`User ${clientsList.get(ws).id} disconnected from server`);
        onClose();
    });

    console.log('New Connection');
}

const onMessage = (ws, data) => {
    data = data.toString();
    const message = typeof(data) == 'string'? JSON.parse(data): data;
    const metadata = clientsList.get(ws);
    
    message.sender = metadata.id;
    message.color = metadata.color;
    console.log(JSON.stringify(message));
    broadcast(message);
}

const onError = (ws, error) => {
    console.error(`onERROR: ${error.message}`);
}

const broadcast = (data) => {
    if (!clientsList) return console.log('Sem Clientes');
    console.log('Broadcasting...');
    [...clientsList.keys()].forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            if (typeof(data) === 'object' && data !== null) {
                data = JSON.stringify(data);
            }
            client.send(data);
        }
    });
}

const onClose = (ws) => {
    clientsList.delete(ws);
}

module.exports = (server) => {
    const wss = new WebSocket.Server({server})
    wss.on('connection', onConnection);
    wss.clientsList = clientsList;
    wss.broadcast = broadcast;
    return wss;
}

module.exports.clientsList = clientsList;
module.exports.broadcast = broadcast;