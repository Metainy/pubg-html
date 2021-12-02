/**
 * Fixing Electron bug in production mode: https://github.com/electron/electron/issues/23757.
 * When webSecurity is disabled and the file is loaded via http: the file: url scheme is not enabled as a url scheme.
 * So we register a file protocol for handling local files.
 *
 * @param request
 * @param callback
 */
function fileProtocol(request, callback) {

    let pathname;

    if (request.url.slice(0, 7) === "file:///") {

        pathname = decodeURI(request.url.replace("file:///", ""));
    } else {

        pathname = decodeURI(request.url.replace("file://", "//"));
    }

    return callback(pathname);
}

export default fileProtocol;
