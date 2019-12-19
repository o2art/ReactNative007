const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 1337 }, () => {
  console.log("ws startuje na porcie 1337");
});

wss.on("connection", (ws, req) => {
  const clientip = req.connection.remoteAddress;

  ws.on("message", message => {
    console.log("serwer odbiera z klienta " + clientip + " -> ", message);
    ws.send("serwer odsyła do klienta -> " + message);
    sendToAllButMe(message, ws);
  });

  sendToAllButMe = (data, ws) => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
});
