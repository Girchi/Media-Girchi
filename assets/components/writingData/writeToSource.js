import fs from "fs";
import request from 'request';


export default function writeToSource(fileName, name, title, dataInfo, text, imgUrl, sourceImgUrl, url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      let newsData = JSON.parse(
        fs.readFileSync(`./assets/data/${fileName}`, "utf-8")
      );
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
        fileName: fileName,
        voteCount: 0
      };
      newsData = JSON.stringify(newsData);
      fs.writeFileSync(`./assets/data/${fileName}`, newsData, (error) => {
        if (error) console.log(error);
      });
    }    
  })
}
