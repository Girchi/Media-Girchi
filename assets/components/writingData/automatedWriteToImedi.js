import fs from "fs";
import request from "request";
import cheerio from "cheerio";

import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

export default function automatedWriteToImedi(
  url,
  fileName,
  sourceName,
  logoUrl
) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);

      const siteHeading = $(".detail-wrap");
      const dataInfo = $(".dateandsource").children("span").first().text();
      const title = siteHeading.find("h1").text();
      const text = siteHeading.find("p").text();
      const imgUrl = siteHeading.find("img").attr("src");

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
          "imedinews.json",
          title,
          dataInfo,
          text,
          imgUrl,
          "https://www.imedi.ge/m/i/logo@2x.png",
          url
        );
        // Write in Imedi news Json
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
        // Write in Imedi news Json
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
