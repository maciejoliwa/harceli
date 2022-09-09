#!/usr/bin/env node

import { readFileSync, watchFile } from 'fs';
import { Worker, isMainThread } from 'node:worker_threads';
import { displayWatchedFiles, greeting } from './output.js';

class Harceli {

    static readConfigToJSON(fallbackConfigObject = {}) {
        const configContents = readFileSync('harceli.config.json', {
            encoding: 'utf-8'
        }).toString();

        if (configContents === undefined) {
            return fallbackConfigObject;
        }

        return configContents;
    }

    constructor() {
        greeting();
        const config = JSON.parse(Harceli.readConfigToJSON());
        const { watched } = config;

        displayWatchedFiles(watched.files);
        watched.forEach(({ files, on_write }) => {

            files.forEach(watchedFile => {
                console.log(watchedFile);
                watchFile(watchedFile, { interval: 100 }, () => {
                    if (isMainThread) {
                        new Worker("./watcher.js", { workerData: { command: on_write, file: watchedFile } });
                    }
                });
            })
        });
    }

}

new Harceli();