import fs from 'fs';

export default function checkFile(path, callback) {
    fs.readFile(`./assets/data/${path}.json`, (err, data) => {
        if (data.length == 0) {
          fs.writeFile(`./assets/data/${path}.json`, '{}', 'utf-8', (err) => {
            if(err) throw err;
            callback;
          });
        } else {
          callback;
        }
    })
}