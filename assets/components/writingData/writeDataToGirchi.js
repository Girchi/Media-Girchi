import fs from 'fs';

export default function writeDataToGirchi(fileName, title, dataInfo, text, imgUrl, sourceImgUrl, url) {
  fs.readFile('./assets/data/girchi.json', (err, data) => {
    if (err) throw err;
    let newsData = JSON.parse(data);
    newsData[dataInfo] = {
      ...newsData[dataInfo],
      source: "Girchi",
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
    
    fs.writeFileSync("./assets/data/girchi.json", newsData, (error) => {
      if (error) console.log(error)
    })
  });
}
