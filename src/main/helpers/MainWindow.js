// Imports
import {BrowserWindow} from "electron";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import store from "../config/store";
import {initTray} from "./tray";

const path = require("path");

// Get window size
let {width, height} = store.getValue("windowBounds");

const windowOptions = {
    show: false,
    autoHideMenuBar: true,
    title: "PUBG HTML",
    width: width || 800,
    height: height || 600,
    minWidth: 800,
    minHeight: 600,
    fullscreen: false,
    webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
        webSecurity: false
    }
}

class MainWindow extends BrowserWindow {


    constructor() {

        super(windowOptions);

        // Check environment mode
        if (process.env.WEBPACK_DEV_SERVER_URL) {

            // Load the URL of the dev server if in development mode
            this.loadURL(process.env.WEBPACK_DEV_SERVER_URL);

        } else {
            createProtocol("app");

            // Load the index file when not in development
            this.loadURL("app://./index.html")
        }

        // Gracefully show when ready to prevent flickering
        this.once("ready-to-show", function () {

            // Remove menu bar
            this.removeMenu();

            // Show window
            this.show();

            // Open Devtools if in development mode
            if (process.env.WEBPACK_DEV_SERVER_URL) {

                // Open the Devtools
                this.webContents.openDevTools();
            }
        });

        // Initialize tray icon
        initTray(this);

        // Listen to resize event and save the window size in user settings file
        this.on("resize", () => {

            // Grab and save window bounds
            store.setValue("windowBounds", this.getBounds());
        });

        // Listen to move event and save the window size in user settings file
        this.on("moved", () => {

            // Grab and save window bounds
            store.setValue("windowBounds", this.getBounds());
        });

        // Listen to before close event and save the window size in user settings file
        this.on("close", () => {

            // Grab and save window bounds
            store.setValue("windowBounds", this.getBounds());
        });
    }
}

export default MainWindow;
