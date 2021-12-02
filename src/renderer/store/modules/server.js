/*
|--------------------------------------------------------------------------
| Vuex Module
|--------------------------------------------------------------------------
|
| Vuex module for Socket.io server status attributes.
|
*/

/*
|---------------------------------------------
| States
|---------------------------------------------
*/
const state = {
    localIP: null,
    localPort: null,
    serverURI: "",
    clientsCount: 0,
};

/*
|---------------------------------------------
| Getters
|---------------------------------------------
*/
const getters = {

    getLocalIP: (state) => state.localIP,
    getLocalPort: (state) => state.localPort,
    getServerURI: (state) => state.serverURI,
    getClientsCount: (state) => state.clientsCount
};

/*
|---------------------------------------------
| Mutations
|---------------------------------------------
*/
const mutations = {

    setLocalIP(state, localIP) {
        state.localIP = localIP;
    },

    setLocalPort(state, localPort) {
        state.localPort = localPort;
    },

    setServerURI(state, serverURI) {
        state.serverURI = serverURI;
    },

    setClientsCount(state, clientsCount) {
        state.clientsCount = clientsCount;
    }
};

/*
|---------------------------------------------
| Actions
|---------------------------------------------
*/
const actions = {

    /**
     * Request a list of network devices and listen for the response.
     *
     * @param commit
     */
    async loadStatus({commit}) {

        // Request a list of network devices from main process
        let clientsCount = await window.api.invoke("Server:clientsCount");
        let localIP = await window.api.invoke("Network:localIP");
        let localPort = await window.api.getStoreValue("server.port");
        let serverURI = await window.api.getStoreValue("server.namespace");

        // Listen to incoming notification about connected clients count
        window.api.receive("clientsCount", (clientsCount) => {

            commit("setClientsCount", clientsCount);
        });

        // Commit devices IP list to the store
        commit("setClientsCount", clientsCount);
        commit("setLocalIP", localIP);
        commit("setLocalPort", localPort);
        commit("setServerURI", serverURI);
    },
};

// Export the module
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
