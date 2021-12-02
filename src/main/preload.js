// Imports
const {contextBridge, ipcRenderer} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {

    // Get and set specific store value
    getStoreValue: (key) => ipcRenderer.invoke("Store:get", key),
    setStoreValue: (key, value) => ipcRenderer.invoke("Store:set", key, value),

    // Generic invoke
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),

    // Send to main process
    send: (channel, data) => {

        // whitelist channels
        let validChannels = ["toMain", "tabData", "downloadUpdates", "installUpdates"];

        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },

    // Receive any message from main process
    receive: (channel, func) => {

        let validChannels = [
            "fromMain", "clientsCount", "serverStatus",
            "updateAvailable", "downloadProgress", "updateDownloaded"
        ];

        if (validChannels.includes(channel)) {

            // Deliberately strip event as it includes "sender"
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});
