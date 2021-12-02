// Imports
import {ipcMain} from "electron";
import internalIP from "internal-ip";

function init() {

    // Listen for a request from renderer process to grab device local IP
    ipcMain.handle("Network:localIP", async (event) => {

        return await internalIP.v4();
    });
}

export default init;
