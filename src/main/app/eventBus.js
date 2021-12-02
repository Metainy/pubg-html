/*
|--------------------------------------------------------------------------
| Event Bus
|--------------------------------------------------------------------------
|
| Handle communication with static data pages in renderer process.
|
*/

// Imports
import {ipcMain} from "electron";
import Store from "../config/store";

let clientsCount = 0;

function init(mainWindow, IO) {

    // Get event list
    let serverNS = Store.getValue("server.namespace") || "pubg-html";

    // Setting namespace
    const namespace = IO.of(serverNS);

    namespace.on("connect", (socket) => {

        clientsCount++;

        console.log("Client Connected.");

        // Send notification to renderer
        sendCountToRenderer();

        socket.on("disconnect", (reason) => {

            if (clientsCount > 0) clientsCount--;

            console.log("Client Disconnected.")

            // Send notification to renderer
            sendCountToRenderer();
        });
    });

    /**
     * Listen to the send data button in the renderer.
     * Should receive page url, page title and page data.
     */
    ipcMain.on("tabData", (event, {pageURL, pageTitle, eventName, payload}) => {

        let channel = eventName ? pageTitle + ":" + eventName : pageTitle;

        // Forward incoming data
        namespace.emit(channel, payload);
    });

    /**
     * Listen to renderer request for client count.
     * Required because sending the client count from main doesn't guarantee the DOM is loaded.
     */
    ipcMain.handle("Server:clientsCount", (event) => {

        return clientsCount;
    });

    /**
     * Send a notification to renderer with current client count.
     */
    function sendCountToRenderer() {

        // Send connection status to renderer after DOM has finished loading
        mainWindow.webContents.once("did-finish-load", () => {

            mainWindow.webContents.send("clientsCount", clientsCount);
        });

        // In case the client disconnected and the app is still alive
        mainWindow.webContents.send("clientsCount", clientsCount);
    }
}

export default init;
