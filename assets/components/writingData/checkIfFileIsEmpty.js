import fs from 'fs';

export default function checkFile(path, callback) {
    fs.readFile(path, (err, data) => {
        if (data.length === 0) {
          fs.writeFile(path, '{}', 'utf-8', (err) => {
            if(err) throw err;
            callback;
          });
        } else {
          callback;
        }
    })
}