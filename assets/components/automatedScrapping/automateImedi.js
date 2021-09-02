import request from "request";
import cheerio from "cheerio";
import writeToSource from "../writingData/writeToSource.js";
import checkFile from "../writingData/checkIfFileIsEmpty.js";
import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

const GirchiKeywords = ['გირჩი', 'იაგო ხვიჩია', 'ვახტანგ მეგრელიშვილი', 'სანდრო რაქვიაშვილი'];

function writeToFile(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const siteHeading = $(".detail-wrap");
      const dataInfo = $(".dateandsource").children("span").first().text();
      const title = siteHeading.find("h1").text();
      const text = siteHeading.find("p").text();
      const imgUrl = siteHeading.find("img").attr("src");
      const logoUrl = "https://www.imedi.ge/m/i/logo@2x.png";

      let isAboutGirchi = GirchiKeywords.some(keyword => title.includes(keyword));

      if (isAboutGirchi) {
        writeDataToGirchi("imedinews.json", title, dataInfo, text, imgUrl, logoUrl, url);
        writeToSource("imedinews.json", "Imedi", title, dataInfo, text, imgUrl, logoUrl, url);
      } else {
        writeToSource("imedinews.json", "Imedi", title, dataInfo, text, imgUrl, logoUrl, url);
      }
    }
  });
}

export default function automateImedi() {
  request("https://imedinews.ge/ge/archive", (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let obj = $(".row").find(".single-item");

      for (let i = 0; i < 10; i++) {
        checkFile('./assets/data/imedinews.json', writeToFile(obj[i].attribs.href));
      }
    } else {
      console.log("Something has failed!");
    }
  });
}
