/*
|--------------------------------------------------------------------------
| Vue
|--------------------------------------------------------------------------
|
| Vue entry point and where we load all the ecosystem and other dependencies.
| Some dependencies and plugins which are not needed globally are being
| imported and used in the main layouts.
|
*/

// Imports
import Vue from "vue";
import router from "./router";
import store from "./store";

// Plugins
import vuetify from "./plugins/vuetify";

// Style
import "@assets/styles/master.scss";

// App main component
import AppView from "./App.vue";

// Make event bus and API available across all components
Object.defineProperty(Vue.prototype, "$eventBus", {value: new Vue()});
Object.defineProperty(Vue.prototype, "$API", {value: window.api});

Vue.config.productionTip = false;

// Create a new Vue instance and mount the app element
new Vue({
    router,
    store,
    vuetify,
    render: function (h) {
        return h(AppView)
    }
}).$mount("#app");
