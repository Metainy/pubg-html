// Imports
import express from "express";
import socket from "socket.io";
import store from "../config/store";

class Socket {

    constructor(mainWindow) {

        // Singleton
        if (Socket.instance instanceof Socket) return Socket.instance;

        this.mainWindow = mainWindow;
        this.server = null;

        Socket.instance = this;
    }

    /**
     * Start Socket.IO server
     *
     * @returns {Server || *}
     */
    startServer() {

        // Return if server already running
        if (this.server) return;

        // App setup
        let app = express();
        this.server = app.listen(store.getValue("server.port"), null);

        // Socket.io options
        const options = {
            perMessageDeflate: false,
            cors: {
                origin: "*",
            }
        };

        let sockServer = socket(this.server, options);

        // Client connected to the server
        sockServer.on("connect", (socket) => {

            // Client disconnected from the server
            socket.on("disconnect", (reason) => {

            });
        });

        return sockServer;
    }
}

export default Socket;
