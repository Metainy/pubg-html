// Imports
import {BrowserWindow, app, protocol} from "electron";
import installExtension, {VUEJS_DEVTOOLS} from "electron-devtools-installer";
import MainWindow from "./helpers/MainWindow";
import fileProtocol from "./helpers/protocols";
import bootstrap from "./bootstrap";

// Disable warning messages
process.removeAllListeners("warning");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "false";

// Global reference of the window object, to avoid garbage collection
let mainWindow;

// Check if development mode
const isDevelopment = process.env.NODE_ENV !== "production";

// Check if it's a single instance
const isSingleInstance = app.requestSingleInstanceLock();

// Quit if this is a second instance
if (!isSingleInstance) {

    app.quit();
    process.exit(0);
}

// Scheme must be registered before the app is ready
// Gives our schema access to load relative files as well as local storage and cookies
protocol.registerSchemesAsPrivileged([
    {scheme: "app", privileges: {secure: true, standard: true}}
]);

/**
 * Create main browser window and load app services.
 */
function initApp() {

    // Create the main browser window
    mainWindow = new MainWindow();

    // Handle all app services
    bootstrap(mainWindow);

    // Main browser window is closed
    mainWindow.on("closed", () => {

        mainWindow = null;
    });
}

// This method will be called when Electron has finished initialization and is ready to create browser windows
app.on("ready", async () => {

    if (isDevelopment && !process.env.IS_TEST) {

        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS);
        } catch (error) {
            console.error("Vue Devtools failed to install:", error.toString());
        }
    }

    // Registering file protocol
    protocol.registerFileProtocol("file", fileProtocol);

    // Initialize the app and create main browser window
    initApp();
});

// Emitted on macOS. Various actions can trigger this event
app.on("activate", () => {

    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open
    if (BrowserWindow.getAllWindows().length === 0) initApp()
});

// Called when a second instance of the app is active
app.on("second-instance", (event, commandLine, workingDirectory) => {

    // Restore the app window and focus it
    if (mainWindow) {

        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});

// Quit when all windows are closed
app.on("window-all-closed", () => {

    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") app.quit();
});

// Exit cleanly on request from parent process in development mode
if (isDevelopment) {

    if (process.platform === "win32") {

        process.on("message", (data) => {

            if (data === "graceful-exit") app.quit();
        });
    } else {

        process.on("SIGTERM", () => {

            app.quit();
        });
    }
}
