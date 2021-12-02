/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| This file is responsible for handling all the routing in our application
| and defining the template for routes middleware.
|
*/

// Imports
import Vue from "vue";
import VueRouter from "vue-router";

// Routes
import routes from "./routes";

// Extend Vue to use Vue Router
Vue.use(VueRouter);

// Create VueRouter instance
const router = new VueRouter({
    routes
});

// Export the router
export default router;
