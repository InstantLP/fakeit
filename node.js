const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
let clients = [];

server.on('connection', (ws) => {
  clients.push(ws);

  ws.on('close', () => {
    clients = clients.filter(client => client !== ws);
  });

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
  });
});

function broadcastMessages() {
  const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
  const uniqueWord = 'unique';
  const randomWord = words[Math.floor(Math.random() * words.length)];
  
  clients.forEach((client, index) => {
    if (index === 0) { // Send a unique word to the first client
      client.send(uniqueWord);
    } else { // Send the common word to other clients
      client.send(randomWord);
    }
  });
}

setInterval(broadcastMessages, 60000); // Send messages every minute
