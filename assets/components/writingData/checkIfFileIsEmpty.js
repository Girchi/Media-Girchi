import fs from 'fs';

const defaultCallback = () => { console.log("Def callback"); }

export default function checkFile(path, callback = defaultCallback) {
  fs.readFile(path, (err, data) => {
    if (data.length === 0) {
      fs.writeFile(path, '{}', 'utf-8', (err) => {
        if (err) throw err;
        callback;
      });
    } else {
      callback;
    }
  })
}
