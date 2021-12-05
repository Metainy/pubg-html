/*
|--------------------------------------------------------------------------
| Vuex Module
|--------------------------------------------------------------------------
|
| Vuex module for various app attributes.
|
*/

// Imports
import Vuetify from "../../plugins/vuetify";

/*
|---------------------------------------------
| States
|---------------------------------------------
*/
const state = {
    appName: null,
    appVersion: null,
    maximizable: true,
    darkMode: false,
    miniDrawer: false,
    startup: false,
    updateFound: false,
    updateDownloading: false,
    downloadData: {},
    updateDownloaded: false,
};

/*
|---------------------------------------------
| Getters
|---------------------------------------------
*/
const getters = {

    appName: (state) => state.appName,
    appVersion: (state) => state.appVersion,
    isMaximizable: (state) => state.maximizable,
    isDarkMode: (state) => state.darkMode,
    isMiniDrawer: (state) => state.miniDrawer,
    getStartup: (state) => state.startup,
    isUpdateFound: (state) => state.updateFound,
    isUpdateDownloading: (state) => state.updateDownloading,
    getDownloadData: (state) => state.downloadData,
    isUpdateDownloaded: (state) => state.updateDownloaded,
};

/*
|---------------------------------------------
| Mutations
|---------------------------------------------
*/
const mutations = {

    setAppName(state, value) {

        state.appName = value;
    },

    setAppVersion(state, value) {

        state.appVersion = value;
    },

    setMaximizable(state, value) {

        state.maximizable = value;
    },

    setDarkMode(state, isDark) {

        // Set Vuetify theme
        Vuetify.framework.theme.dark = isDark;

        // Save state to setting file
        window.api.setStoreValue("darkMode", isDark);

        state.darkMode = isDark;
    },

    setMiniDrawer(state, isMiniDrawer) {

        // Save state to setting file
        window.api.setStoreValue("miniDrawer", isMiniDrawer);

        state.miniDrawer = isMiniDrawer;
    },

    setStartup(state, startup) {

        // Save state to setting file
        window.api.setStoreValue("startup", startup);

        // Enable auto launch in setting
        window.api.invoke("Setting:startup", startup);

        state.startup = startup;
    },

    setUpdateFound(state, value) {

        state.updateFound = value;
    },

    setUpdateDownloading(state, value) {

        state.updateDownloading = value;
    },

    setDownloadData(state, value) {

        state.downloadData = value;
    },

    setUpdateDownloaded(state, value) {

        state.updateDownloaded = value;
    },
};

/*
|---------------------------------------------
| Actions
|---------------------------------------------
*/
const actions = {

    /**
     * Load default setting from setting file on app launch.
     *
     * @param commit
     */
    async getAppDetails({commit}) {

        let appDetails = await window.api.invoke("App:details")

        commit("setAppName", appDetails.name);
        commit("setAppVersion", appDetails.version);
        commit("setMaximizable", appDetails.isMaximizable);
    },

    /**
     * Load default setting from setting file on app launch.
     *
     * @param commit
     */
    async loadDefaults({commit}) {

        let darkMode = await window.api.getStoreValue("darkMode");
        let miniDrawer = await window.api.getStoreValue("miniDrawer");
        let startup = await window.api.getStoreValue("startup");

        commit("setDarkMode", darkMode);
        commit("setMiniDrawer", miniDrawer);
        commit("setStartup", startup);
    },

    /**
     * Listen to all updater incoming events from main process.
     *
     * @param commit
     */
    registerUpdateEvents({commit}) {

        // Listen for a new update notification from main process
        window.api.receive("updateAvailable", () => {

            // A new update has been found
            commit("setUpdateFound", true);
        });

        // Listen for download progress
        window.api.receive("downloadProgress", (event, downloadData) => {

            // Download already starting
            commit("setUpdateDownloading", true);

            // Set download data
            commit("setDownloadData", {
                percentage: downloadData.percent.toFixed(0),
                currentSize: ((downloadData.transferred / 1000) / 1024).toFixed(1),
                totalSize: ((downloadData.total / 1000) / 1024).toFixed(1)
            });
        });

        // Listen for update downloaded event.
        window.api.receive("updateDownloaded", () => {

            // Download already finished
            commit("setUpdateDownloading", false);

            // Set download complete
            commit("setUpdateDownloaded", true);
        });
    },

    /**
     * Notify main process to start downloading the update.
     *
     * @param commit
     */
    downloadUpdate({commit}) {

        // Start downloading
        window.api.send("downloadUpdates");

        // Remove the new update flag
        commit("setUpdateFound", false);
    },

    /**
     * Send a message to main process indicating that user has confirmed restart.
     */
    installUpdate() {

        // Install update and restart application
        window.api.send("installUpdates");
    }
};

// Export the module
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
