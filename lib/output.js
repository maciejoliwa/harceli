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
    console.log("Your watched files:");

    watchedFiles.forEach(({ files }) => {
        if (typeof(files) === "string") {
            console.log(files);
        } else {
            files.forEach(file => console.log(file));
        }
    });
}

export {
    greeting,
    displayWatchedFiles
}