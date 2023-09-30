class Server {
    constructor(id) {
        this.id = id;
        this.capacity = 5;
        this.queue = [];
        this.processed = null;
    }

    // method
    getUtilization() {
        return this.queue.length();
    }

    addToQueue() {
        this.queue.push(1);
    }

    process() {
        if (this.queue.length() > 0) {
            this.processed = this.queue.shift();
            setTimeout(() => {
                this.processed === null;
                this.process();
            }, 3000); // 3 seconds to handle the request
        } else {
            setTimeout(() => {
                this.process();
            }, 1000); // 1 second to wait for incoming request
        }
    }
}

function initializeAndGetServers(no) {
    const servers = [];
    for (let i = 0; i < no; i++) {
        const server = new Server(i);
        server.process();
        servers.push(server);
    }
    return servers;
}
