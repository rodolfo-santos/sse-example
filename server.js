const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/notifications", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  const sendNotification = (message) => {
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  };

  // Simulation of sending notifications at 5 second intervals
  const intervalId = setInterval(() => {
    const notification = {
      id: Date.now(),
      message: `Nova notificação ${Date.now()}`,
    };
    sendNotification(notification);
  }, 5000);

  // Terminates the connection when the client disconnects
  res.on("close", () => {
    clearInterval(intervalId);
  });
});

app.listen(3000, () => {
  console.log("Servidor SSE de Notificações está ouvindo na porta 3000.");
});
