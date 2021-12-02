/*
|--------------------------------------------------------------------------
| App Bus
|--------------------------------------------------------------------------
|
| Handle app control communication and app setting.
|
*/

// Imports
import {ipcMain, app} from "electron";
import {createTray} from "../helpers/tray";
import startup from "../helpers/startup";

function init(mainWindow) {

    /**
     * Get app name, version and if app is maximizable.
     */
    ipcMain.handle("App:details", (event) => {

        return {
            name: app.getName(),
            version: app.getVersion(),
            isMaximizable: mainWindow.isMaximizable()
        }
    });

    /**
     * Minimize the window to tray.
     */
    ipcMain.handle("App:tray", (event) => {

        // Hide the window
        mainWindow.hide();

        // Create tray icon
        createTray();
    });

    /**
     * Change auto launch setting based on incoming state from renderer.
     */
    ipcMain.handle("Setting:startup", (event, state) => {

        startup.setLaunchState(state);
    });
}

export default init;
