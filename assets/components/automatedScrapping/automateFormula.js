import request from "request";
import cheerio from "cheerio";
import writeToSource from "../writingData/writeToSource.js";
import checkFile from "../writingData/checkIfFileIsEmpty.js";
import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

function writeToFile(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const newsDiv = $(".article");
      const title = $(".news__inner__desc__title").text();
      const dataInfo = $(".news__inner__images_created").text();
      const text = newsDiv.find("p").text();
      let imgUrl = `https://formulanews.ge${$(".news__inner__main__image")
        .find("img")
        .attr("src")}`;

      if (imgUrl === "https://formulanews.geundefined") {
        imgUrl ="https://formulanews.ge/uploads_script2/articles/2021/08/21/yjupldlo82izpkc.jpg";
      }
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
          "formula.json",
          title,
          dataInfo,
          text,
          imgUrl,
          "https://upload.wikimedia.org/wikipedia/commons/7/7b/TV_Formula_-_Official_Logo.png",
          url
        );
        // Write in Source  Json
        writeToSource(
          "formula.json",
          "Formula",
          title,
          dataInfo,
          text,
          imgUrl,
          "https://upload.wikimedia.org/wikipedia/commons/7/7b/TV_Formula_-_Official_Logo.png",
          url
        );
      } else {
        // console.log("არ მოიძებნა");
        // Write in Source Json
        writeToSource(
          "formula.json",
          "Formula",
          title,
          dataInfo,
          text,
          imgUrl,
          "https://upload.wikimedia.org/wikipedia/commons/7/7b/TV_Formula_-_Official_Logo.png",
          url
        );
      }
    }
  });
}

export default function automateFormula() {
  request("https://formulanews.ge/Category/All", (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let obj = $("#news__box").find(".main__new__slider__desc").find("a");

      for (let i = 0; i < 10; i++) {
        checkFile(
          "./assets/data/formula.json",
          writeToFile(`https://formulanews.ge${obj[i].attribs.href}`)
        );
      }
    } else {
      console.log("Something failed!");
    }
  });
}
