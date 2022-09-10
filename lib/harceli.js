#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { validateConfigurationObject } from './config.js';
import { Worker, isMainThread } from 'node:worker_threads';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { displayWatchedFiles, greeting, fileDoesNotExist } from './output.js';

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

    doesFileExist(file, callback) {
        if (typeof(file) === "string" && existsSync(file)) {
            callback(file);
        } else {
            fileDoesNotExist(file);
        }
    }

    constructor() {
        greeting();
        const config = JSON.parse(Harceli.readConfigToJSON());
        const isConfigFileValid = validateConfigurationObject(config);

        if (!isConfigFileValid) {
            console.error("The config file is invalid. Check the docs!");
            return;
        }

        const { watched } = config;

        displayWatchedFiles(watched);
        watched.forEach(({ files, on_write }) => {

            if (typeof(files) === "string") {
                this.doesFileExist(files, f => {
                    if (isMainThread) {
                        new Worker(resolve(__directoryName, "watcher.js"), { workerData: { command: on_write, file: files } });
                    }
                });
            } else {   
                files.forEach(watchedFile => {
                    this.doesFileExist(watchedFile, f => {
                        if (isMainThread) {
                            new Worker(resolve(__directoryName, "watcher.js"), { workerData: { command: on_write, file: f } });
                        }
                    })
                })
            }
        });
    }

}

new Harceli();