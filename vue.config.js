/*
|--------------------------------------------------------------------------
| Vue Configuration
|--------------------------------------------------------------------------
|
| Custom configuration for webpack and electron builder.
| Also adding custom aliases and disabling esModule by doing so enabling loader's
| commonJS module syntax, which webpack will resolve directly to the module itself.
|
*/

// Imports
const path = require("path");

module.exports = {

    pluginOptions: {

        // Builder configuration
        electronBuilder: {

            externals: [],

            // Where the production build files will be generated when running build
            // outputDir: "dist_electron",

            // Main process entry file
            mainProcessFile: "src/main/index.js",

            // Watching file that will recompile the main process and restart Electron
            mainProcessWatch: ["src/main"],

            // Preload script
            preload: "src/main/preload.js",

            builderOptions: {
                productName: "PUBG HTML",
                appId: "com.gamerslounge.pubg-html",
                artifactName: "${productName}-setup-${version}.${ext}",
                copyright: "Copyright ©2021 GL",
                extends: null,
                files: ["!later/*"],
                directories: {
                    buildResources: "build",
                    output: "dist_electron/release"
                },
                win: {
                    target: ["nsis"],
                    icon: "build/icons/icon.ico"
                },
                nsis: {
                    artifactName: "${productName}-${version}-Setup.${ext}",
                    oneClick: true,
                    allowElevation: true,
                    perMachine: true,
                    allowToChangeInstallationDirectory: false,
                    deleteAppDataOnUninstall: true,
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true,
                    installerIcon: "build/icons/icon.ico",
                    uninstallerIcon: "build/icons/icon.ico",
                    installerHeaderIcon: "build/icons/icon.ico",
                    uninstallDisplayName: "${productName}"
                },
                portable: {
                    splashImage: "build/images/splash.png",
                    artifactName: "${productName}-${version}-Portable.${ext}",
                    unpackDirName: "Temp-PUBG-HTML"
                },
                publish: [
                    {
                        "provider": "github",
                        "private": true,
                        "owner": "Metainy",
                        "repo": "pubg-html",
                        "token": "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"
                    }
                ]
            }
        }
    },

    pages: {
        index: {

            // Renderer entry file
            entry: "src/renderer/main.js",

            // System bar title
            title: "PUBG HTML",
        }
    },

    configureWebpack: {
        resolve: {
            extensions: [".js", ".vue"],
            alias: {
                "@": path.resolve(__dirname, "src/renderer"),
                "@components": path.resolve(__dirname, "src/renderer/components"),
                "@views": path.resolve(__dirname, "src/renderer/views"),
                "@assets": path.resolve(__dirname, "src/renderer/assets")
            }
        }
    }
}
