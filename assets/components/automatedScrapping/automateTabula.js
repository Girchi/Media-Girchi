import request from "request";
import cheerio from "cheerio";
import writeToSource from '../writingData/writeToSource.js';
import checkFile from '../writingData/checkIfFileIsEmpty.js';
import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

const GirchiKeywords = ['გირჩი', 'იაგო ხვიჩია', 'ვახტანგ მეგრელიშვილი', 'სანდრო რაქვიაშვილი'];

function writeToFile(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const newsDiv = $(".om-main");
      const title = newsDiv.find("h1").text();
      const dataInfo = $(".ArticleHeaderDefault_metaItem__1OQi4").text();
      const text = newsDiv.find("p").text();
      const imgUrl = newsDiv.find("img").attr("src");
      const logoUrl = "https://upload.wikimedia.org/wikipedia/ka/c/c0/Tabula_logo.png";

      let isAboutGirchi = GirchiKeywords.some(keyword => title.includes(keyword));

      if (isAboutGirchi) {
        // Write in Girchi Json
        writeDataToGirchi("tabula.json", title, dataInfo, text, imgUrl, logoUrl, url);
        // Write in Source  Json
        writeToSource("tabula.json", "Tabula", title, dataInfo, text, imgUrl, logoUrl, url);
      } else {
        // Write in Source Json
        writeToSource("tabula.json", "Tabula", title, dataInfo, text, imgUrl, logoUrl, url);
      }   
    }
  });
}


export default function automateOn() {
  request("https://tabula.ge/ge/news", (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let obj = $(".PagedNewsItemList_listWrap__Jr25w").find(".news-item-list-item").find("a");

      for (let i = 0; i < obj.length; i++) {
        checkFile('./assets/data/tabula.json', writeToFile(`https://tabula.ge${obj[i].attribs.href}`));
      }
    } else {
      console.log("Something failed!");
    }
  });
}
