export class LoadBalancer {
    constructor(servers) {
        this.servers = servers;
    }

    // method
    handleClientSubmit(req, res) {
        let to_send = null;
        let minUtilization = Number.POSITIVE_INFINITY;

        for (const server of this.servers) {
            const utilization = server.getUtilization();
            // console.log(server.id + ": " + utilization);
            if (utilization < minUtilization && utilization < 1) {
                to_send = server;
                minUtilization = utilization;
            }
        }

        if (to_send === null) {
            res.status(500).json({ message: "All the servers are unavailable at the moment :(" })
        } else {
            to_send.addToQueue();
            res.status(200).json({ message: `Server ${to_send.id} has received your request!` });
        }
    }
}
