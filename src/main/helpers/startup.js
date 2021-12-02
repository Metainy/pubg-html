// Imports
import AutoLaunch from "auto-launch";
import Store from "../config/store";

let autoLaunch = new AutoLaunch({name: "pubg-html"});

// Configure auto launch based on setting
if (Store.getValue("startup")) {

    autoLaunch.enable();
} else {

    autoLaunch.disable();
}

/**
 * Return the current state of auto launch.
 *
 * @returns {Promise}
 */
function getLaunchState() {

    return autoLaunch.isEnabled();
}

/**
 * Enable or disable auto launch.
 *
 * @param {Boolean} state
 */
function setLaunchState(state) {

    if (state) autoLaunch.enable();
    else autoLaunch.disable();

}

export default {
    getLaunchState,
    setLaunchState
}
