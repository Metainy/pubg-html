/*
|--------------------------------------------------------------------------
| Navigation Items
|--------------------------------------------------------------------------
|
| Contains all the application tabs which are used as vue routes and navigation items.
|
*/

const navItems = [
    {
        path: "/next-map",
        name: "NextMap",
        title: "Next Map",
        icon: "mdi-format-list-bulleted",
        enabled: true,
    },
    {
        path: "/top-fraggers",
        name: "TopFraggers",
        title: "Top Fraggers",
        icon: "mdi-format-list-bulleted",
        enabled: true,
    },
    {
        path: "/prediction",
        name: "Prediction",
        title: "Prediction",
        icon: "mdi-format-list-bulleted",
        enabled: false,
    },
    {
        path: "/standings",
        name: "Standings",
        title: "Standings",
        icon: "mdi-format-list-bulleted",
        enabled: true,
    },
    {
        path: "/today-summary",
        name: "TodaySummary",
        title: "Today Summary",
        icon: "mdi-format-list-bulleted",
        enabled: true,
    },
    {
        path: "/in-game-stats",
        name: "InGameStats",
        title: "In-Game Stats",
        icon: "mdi-format-list-bulleted",
        enabled: true,
    },
    {divider: true},
    {
        path: "/card-game",
        name: "CardGame",
        title: "Card Game",
        icon: "mdi-format-list-bulleted",
        enabled: true,
    },
];

export default navItems;
