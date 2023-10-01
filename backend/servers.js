class Server {
    constructor(id) {
        this.id = id;
        this.capacity = 5;
        this.queue = [];
        this.notifier = null;
        this.processed = null;
    }

    // method
    getUtilization() {
        return this.queue.length / this.capacity;
    }

    addToQueue() {
        this.queue.push(1);
        this.notifier.notify(this.id, this.getUtilization());
    }

    setNotifier(notifier) {
        this.notifier = notifier;
    }

    process() {
        if (this.queue.length > 0) {
            setTimeout(() => {
                // console.log("handling a request...");
                this.processed = this.queue.shift();
                this.processed === null;
                this.notifier.notify(this.id, this.getUtilization());
                
                this.process();
            }, 5000); // 5 seconds to handle the request
        } else {
            setTimeout(() => {
                // console.log("waiting for incoming request...");
                this.process();
            }, 500);
        }
    }
}

export function initializeAndGetServers(no) {
    const servers = [];
    for (let i = 0; i < no; i++) {
        const server = new Server(i);
        server.process();
        servers.push(server);
    }
    return servers;
}
