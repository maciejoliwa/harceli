import { watchFile } from 'fs';
import { exec } from 'node:child_process';
import { workerData } from 'node:worker_threads';

watchFile(workerData.file, { interval: 100 }, (current, previous) => {
    exec(workerData.command, (error, stdout, stderr) => {
        console.log(stdout)
    });
});