#!/usr/bin/env node

import { readFileSync, watchFile } from 'fs';
import { Worker, isMainThread } from 'node:worker_threads';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { displayWatchedFiles, greeting } from './output.js';

const __fname = fileURLToPath(import.meta.url);
const __directoryName = dirname(__fname);

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
                if (isMainThread) {
                    new Worker(resolve(__directoryName, "watcher.js"), { workerData: { command: on_write, file: watchedFile } });
                }
            })
        });
    }

}

new Harceli();