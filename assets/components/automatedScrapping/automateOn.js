import request from "request";
import cheerio from "cheerio";
import writeToSource from "../writingData/writeToSource.js";
import checkFile from "../writingData/checkIfFileIsEmpty.js";
import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

function writeToFile(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);

      const title = $(".article-title").text();
      const dataInfo = $(".date").first().text();
      const text = $(".article-body").text();
      const imgUrl = `https:${$(".global-figure-image  ").attr("src")}`;

      if (
        title.includes("გირჩი") ||
        title.includes("იაგო ხვიჩია") ||
        title.includes("ვახტანგ მეგრელიშვილი") ||
        title.includes("ვახტანგ მეგრელიშვილი") ||
        title.includes("სანდრო რაქვიაშვილი")
      ) {
        console.log("მოიძებნა");

        // Write in Girchi Json
        writeDataToGirchi(
          "on.json",
          title,
          dataInfo,
          text,
          imgUrl,
          "http://gip.ge/wp-content/uploads/2017/10/apple-touch-icon.png",
          url
        );
        // Write in Source  Json
        writeToSource(
          "on.json",
          "On",
          title,
          dataInfo,
          text,
          imgUrl,
          "http://gip.ge/wp-content/uploads/2017/10/apple-touch-icon.png",
          url
        );
      } else {
        // console.log("არ მოიძებნა");
        // Write in Source Json
        writeToSource(
          "on.json",
          "On",
          title,
          dataInfo,
          text,
          imgUrl,
          "http://gip.ge/wp-content/uploads/2017/10/apple-touch-icon.png",
          url
        );
      }
    }
  });
}

export default function automateOn() {
  request("https://on.ge", (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let obj = $(".row").find("section").find("a.overlay-link");

      for (let i = 0; i < 10; i++) {
        checkFile('./assets/data/on.json', writeToFile(obj[i].attribs.href));
      }
    } else {
      console.log("Something failed!");
    }
  });
}
