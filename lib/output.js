const reset = "\x1b[0m";
const green = "\x1b[42m";
const cyan = "\x1b[36m";

function greeting() {
    console.log(`${green}Welcome to Watcherino!${reset}`);
}

function noWatchedPropertyError() {
    console.log("No \"watched\" property in your harceli.config.js");
}

function displayWatchedFiles(watchedFiles = []) {
    console.log("Your watched files:\n");

    watchedFiles.forEach(file => {
        console.log(`${cyan+file+reset}`);
    });
}

export {
    greeting,
    displayWatchedFiles
}