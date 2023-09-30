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
        this.notifier.notify(this.id, this.queue.length);
    }

    setNotifier(notifier) {
        this.notifier = notifier;
    }

    process() {
        if (this.queue.length > 0) {
            this.processed = this.queue.shift();
            setTimeout(() => {
                // console.log("handling a request...");
                this.processed === null;
                this.notifier.notify(this.id, this.queue.length);
                
                this.process();
            }, 5000); // 5 seconds to handle the request
        } else {
            setTimeout(() => {
                // console.log("waiting for incoming request...");
                this.process();
            }, 1000); // 1 second to wait for incoming request
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
