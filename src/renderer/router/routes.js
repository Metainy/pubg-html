/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Defining all the application routes and associated middleware.
|
*/

// Static pages
import Setting from "@views/pages/Setting";
import About from "@views/pages/About";

// Dynamic pages
import navItems from "@/api/navItems";

// Defining routes
const routes = [

    /*
    |--------------------------------------------------------------------------
    | Application Routes
    |--------------------------------------------------------------------------
    */

    {
        path: "/",
        redirect: "/about",
    },
    {
        path: "/setting",
        name: "Setting",
        component: Setting
    },
    {
        path: "/about",
        name: "About",
        component: About
    }
];

// Add all the dynamic pages to routes array
navItems.forEach((item) => {

    // Skip divider and hidden pages
    if (!item.enabled) return;

    routes.push({
        path: item.path,
        name: item.name,
        component: () => import("@views/pages/" + item.name),
        meta: {
            title: item.title
        }
    });
});

// Export the routes
export default routes;
