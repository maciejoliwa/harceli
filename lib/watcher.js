import { watchFile } from 'fs';
import { exec } from 'node:child_process';
import { workerData } from 'node:worker_threads';

watchFile(workerData.file, { interval: 500 }, (current, previous) => {
    exec(workerData.command, (error, stdout, stderr) => {
        if (error) {
            throw new Error(error);
        }

        if (stdout) {   
            console.log(stdout);
        }
        if (stderr) {
            console.log(stderr);
        }
    });
});