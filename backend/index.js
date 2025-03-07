import express from "express";
import { Server } from "socket.io";
import "dotenv";
import bodyParser from "body-parser";

const io = new Server({
  cors: true,
});

const app = express();

app.use(bodyParser.json());

const emailToSocketMapping = new Map();
io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("join-room", (data) => {
    const { roomId, emailId } = data;
    console.log("user", emailId, "joined Room", roomId);
    emailToSocketMapping.set(emailId, socket.id);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server is running on", port);
});

io.listen(8081);
