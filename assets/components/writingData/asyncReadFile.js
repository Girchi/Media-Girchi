// For later
const readFileAsync = (path, enc) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, enc, (err, data) => {
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
};
