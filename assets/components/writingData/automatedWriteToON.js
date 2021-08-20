import fs from "fs";
import request from "request";
import cheerio from "cheerio";

import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

export default function automatedWriteToON(url, fileName, sourceName, logoUrl) {
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
        // Write in on Json
        let newsData = JSON.parse(
          fs.readFileSync(`./assets/data/${fileName}`, "utf-8")
        );
        newsData[dataInfo] = {
          ...newsData[dataInfo],
          source: sourceName,
          title: title,
          text: text,
          link: url,
          logo: logoUrl,
          articleDate: dataInfo,
          imgUrl: imgUrl,
          important: false,
          fileName: fileName,
        };
        newsData = JSON.stringify(newsData);
        fs.writeFileSync(`./assets/data/${fileName}`, newsData, (error) => {
          if (error) console.log(error);
        });
      } else {
        // console.log("არ მოიძებნა");
        // Write in on  Json
        let newsData = JSON.parse(
          fs.readFileSync(`./assets/data/${fileName}`, "utf-8")
        );
        newsData[dataInfo] = {
          ...newsData[dataInfo],
          source: sourceName,
          title: title,
          text: text,
          link: url,
          logo: logoUrl,
          articleDate: dataInfo,
          imgUrl: imgUrl,
          important: false,
          fileName: fileName,
        };
        newsData = JSON.stringify(newsData);
        fs.writeFileSync(`./assets/data/${fileName}`, newsData, (error) => {
          if (error) console.log(error);
        });
      }
    }
  });
}
