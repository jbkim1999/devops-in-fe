export const respond = (io, notifier) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    notifier.setSocket(socket);
  });
}
