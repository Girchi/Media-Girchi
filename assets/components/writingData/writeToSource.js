import fs from 'fs';

export default function writeToSource(fileName, name, title, dataInfo, text, imgUrl, sourceImgUrl, url) {
  fs.readFile(`./assets/data/${fileName}`, (err, data) => {
    if (err) throw err;
    let newsData = JSON.parse(data);
    newsData[dataInfo] = {
      ...newsData[dataInfo],
      source: name,
      title: title,
      text: text,
      link: url,
      logo: sourceImgUrl,
      articleDate: dataInfo,
      imgUrl: imgUrl,
      important: false,
      fileName: fileName
    };
    newsData = JSON.stringify(newsData)
    fs.writeFileSync(`./assets/data/${fileName}`, newsData, (error) => {
      if (error) console.log(error)
    })
  });
}
