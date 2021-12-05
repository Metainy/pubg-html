/*
|--------------------------------------------------------------------------
| Vuetify
|--------------------------------------------------------------------------
|
| Configuring Vue to use Vuetify and set Vuetify configuration and styles.
| We can easily have different instances of Vuetify for each section of our
| front-end.
|
*/

// Imports
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

// Fonts
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

// Extend Vue to use Vuetify
Vue.use(Vuetify);

// Vuetify custom configuration
const options = {

    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                background: "#d2d2d2",
                darkBackground: "#657079",
                foreground: "#e5e5e5",

                lightText: "#17202c",
                darkText: "#131b25",
                contrastText: "#cecece",

                primary: "#194c8f",
                secondary: "#424242",
                accent: "#82B1FF",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FFC107"
            },
            dark: {
                background: "#1e1e1e",
                darkBackground: "#171717",
                foreground: "#2B2B2B",

                lightText: "#cecece",
                darkText: "#a6a6a6",
                contrastText: "#424242",

                primary: "#C78014",
                secondary: "#424242",
                accent: "#82B1FF",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FFC107"
            },
        },
        dark: false
    },
    icons: {
        iconfont: "mdi",
        values: {
            icon: {}
        }
    }
};

export default new Vuetify(options);
