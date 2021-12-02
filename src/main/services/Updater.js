// Imports
import {ipcMain} from "electron";
import {autoUpdater} from "electron-updater";
import log from "electron-log";

// Updater options
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// Logger
log.transports.file.level = "debug";
autoUpdater.logger = log;

class Updater {

    constructor(mainWindow) {

        // Singleton
        if (Updater.instance) return Updater.instance;
        Updater.instance = this;

        // Checking for updates after few seconds
        setTimeout(() => autoUpdater.checkForUpdatesAndNotify(), 1500);

        /**
         * Checking if update has started.
         */
        autoUpdater.on("checking-for-update", () => {

            autoUpdater.logger.info("Checking for update...");
        });

        /**
         * Checking if there is no update available.
         */
        autoUpdater.on("update-not-available", () => {

            autoUpdater.logger.info("Update not available.");
        });

        /**
         * There is an update available.
         */
        autoUpdater.on("update-available", (updateInfo) => {

            autoUpdater.logger.info("Update available.");

            // Send a notification to the renderer
            mainWindow.webContents.send("updateAvailable");
        });

        /**
         * Current download progress.
         */
        autoUpdater.on("download-progress", (progressInfo) => {

            // Send download progress data to the renderer
            mainWindow.webContents.send("downloadProgress", {
                percent: progressInfo.percent,
                transferred: progressInfo.transferred,
                total: progressInfo.total
            });
        });

        /**
         * Update is downloaded successfully.
         */
        autoUpdater.on("update-downloaded", (updateInfo) => {

            autoUpdater.logger.info("Update downloaded.");

            // Send a message to the renderer notifying of download completion
            mainWindow.webContents.send("updateDownloaded");
        });

        /**
         * User requested to download the updates.
         */
        ipcMain.on("downloadUpdates", () => {

            autoUpdater.logger.info("Starting download...");

            // Quit and install the updates
            autoUpdater.downloadUpdate();
        });

        /**
         * User confirmed the application restart.
         */
        ipcMain.on("installUpdates", () => {

            autoUpdater.logger.info("Installing update...");

            // Quit and install the updates
            autoUpdater.quitAndInstall(true, true);
        });
    }
}

export default Updater;
