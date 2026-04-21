const peers = new Map<string, string>(); // peerId -> socketId

const server = Bun.serve({
  port: 3001,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Signaling server is running");
  },
  websocket: {
    message(ws, message) {
      const data = JSON.parse(message as string);
      
      switch (data.type) {
        case "join":
          ws.subscribe(data.roomId);
          ws.publish(data.roomId, JSON.stringify({
            type: "peer-joined",
            peerId: data.peerId
          }));
          break;
        case "signal":
          ws.publish(data.roomId, JSON.stringify({
            type: "signal",
            from: data.from,
            signal: data.signal
          }));
          break;
      }
    },
    open(ws) {
      console.log("Socket opened");
    },
    close(ws) {
      console.log("Socket closed");
    },
  },
});

console.log(`Signaling server running at ws://localhost:${server.port}`);
