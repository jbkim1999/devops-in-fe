export class Notifier {
    constructor(servers) {
        for (const server of servers) {
            server.setNotifier(this);
        }
        this.socket = null;
    }

    // method
    setSocket(socket) {
        console.log("setting socket to notifier");
        this.socket = socket;
    }

    notify(id, queueLength) {
        this.socket.emit("notify-server-change", { id, queueLength });
    }
}
