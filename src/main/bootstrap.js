/*
|--------------------------------------------------------------------------
| Bootstrap
|--------------------------------------------------------------------------
|
| Handle the application services, components and data flow.
|
*/

// Imports
import "./helpers/startup";
import Updater from "./services/updater";
import network from "./services/network";
import Socket from "./services/Socket";
import appBus from "./app/appBus";
import eventBus from "./app/eventBus";

function init(mainWindow) {

    // Check and handle updates
    new Updater(mainWindow);

    // Network
    network();

    // Start Socket server
    const IO = new Socket(mainWindow).startServer();

    // App controls communication and setting
    appBus(mainWindow);

    // Socket events handler
    eventBus(mainWindow, IO);
}

export default init;
