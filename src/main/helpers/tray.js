// Imports
import {app, Tray, Menu} from "electron";
import path from "path";

let mainWindow, trayIcon;

function initTray(window) {

    mainWindow = window;
}

function createTray() {

    trayIcon = new Tray(path.join(__static, "icons/tray-icon.png"));

    // Tray icon context menu
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Show", click: function () {

                trayIcon.destroy();
                mainWindow.show();
            }
        },
        {
            label: "Exit", click: function () {

                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    // trayIcon.setContextMenu(contextMenu);
    trayIcon.setToolTip(app.getName());
    trayIcon.displayBalloon({
        title: app.getName(),
        content: "Application is running in the background",
        noSound: true,
        largeIcon: false
    });

    // On click handler for the tray icon
    trayIcon.on("click", () => {

        trayIcon.destroy();
        mainWindow.show();
    });

    return trayIcon;
}

function destroyTray() {

    if (trayIcon) trayIcon.destroy();
}

export {
    initTray,
    createTray,
    destroyTray
};
