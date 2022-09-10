const reset = "\x1b[0m";
const green = "\x1b[42m";
const blue = "\x1b[44m";
const cyan = "\x1b[36m";
const red = "\x1b[41m";

function greeting() {
    console.log(`${green}Welcome to Watcherino!${reset}`);
}

function fileDoesNotExist(file) {
    console.log(red + file + " does not exist or is unreachable" + reset);
}

function displayWatchedFiles(watchedFiles = []) {
    console.log("Your watched files:");

    watchedFiles.forEach(({ files }) => {
        if (typeof(files) === "string") {
            console.log(cyan + files + reset);
        } else {
            files.forEach(file => console.log(cyan + file + reset));
        }
    });

    console.log("\n" + blue + "Waiting for changes..." + reset);
}

export {
    greeting,
    fileDoesNotExist,
    displayWatchedFiles
}