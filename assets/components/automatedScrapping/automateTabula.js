import request from "request";
import cheerio from "cheerio";
import writeToSource from '../writingData/writeToSource.js';
import checkFile from '../writingData/checkIfFileIsEmpty.js';

function writeToFile(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const newsDiv = $(".om-main");
      const title = newsDiv.find("h1").text();
      const dataInfo = $(".ArticleHeaderDefault_metaItem__1OQi4").text();
      const text = newsDiv.find("p").text();
      const imgUrl = newsDiv.find("img").attr("src");

        writeToSource("tabula.json", "Tabula", title, dataInfo, text, imgUrl, 'https://upload.wikimedia.org/wikipedia/ka/c/c0/Tabula_logo.png', url);
    }
  });
}


export default function automateOn() {
  request("https://tabula.ge/ge/news", (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let obj = $(".PagedNewsItemList_listWrap__Jr25w").find(".news-item-list-item").find("a");

      for (let i = 0; i < obj.length; i++) {
        checkFile('tabula', writeToFile(`https://tabula.ge${obj[i].attribs.href}`));
      }
    } else {
      console.log("Something failed!");
    }
  });
}
