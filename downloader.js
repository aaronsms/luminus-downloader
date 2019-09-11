const path = require('path');
const fs = require('fs');
const os = require('os');

const { readDirectoryPath } = require('./configParser');
const { downloadAPI } = require('./api');

const DIRECTORY_PATH = path.join(os.homedir(), readDirectoryPath());

async function downloadFile(auth, file_id, file_name) {
    const FILE_PATH = path.join(DIRECTORY_PATH, file_name);
    const content = await downloadAPI(auth, file_id);
    return new Promise((resolve, reject) => {
        fs.writeFile(FILE_PATH, content, (err) => {
            if (err) reject(err);
            console.log('Done!');
            resolve();
        });
    });
}

// For testing only
async function main() {
    const AUTH = '';
    const file_id = 'cfe83093-d8f1-4669-b921-abeaf747af7a';
    const file_name = 'T02_Parallel_Solved.c';
    await downloadFile(AUTH, file_id, file_name);
}

main();
