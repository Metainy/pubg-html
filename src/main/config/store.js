// Imports
import Store from "electron-store";
import {ipcMain} from "electron";

// Config file
let config = new Store({
    defaults: {
        darkMode: true,
        startup: false,
        miniDrawer: false,
        windowBounds: {},
        server: {
            port: 4114,
            namespace: "pubg-html"
        }
    }
});

/**
 * Save a value to the store.
 *
 * @param {String} key
 * @param {*} value
 */
function setValue(key, value) {

    config.set(key, value);
}

/**
 * Get a value from the store.
 *
 * @param {String} key
 * @returns {*}
 */
function getValue(key) {

    return config.get(key);
}

/**
 * Incoming request from renderer to get a store value.
 */
ipcMain.handle("Store:get", (event, key) => {

    return config.get(key);
});

/**
 * Incoming request from renderer to set a store value.
 */
ipcMain.handle("Store:set", (event, key, value) => {

    config.set(key, value);
});

export default {
    setValue,
    getValue
}
