import fs from "fs";
import request from "request";
import cheerio from "cheerio";

import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

export default function automatedWriteToMtavari(
  url,
  fileName,
  sourceName,
  logoUrl
) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);

      const newsDiv = $(".id__Content-bhuaj0-13");
      const title = $(".id__Title-bhuaj0-10").text();
      const dataInfo = $(".id__PublishedAndUpdated-bhuaj0-15")
        .find("time")
        .attr("title");
      const text = $(".EditorContent__EditorContentWrapper-ygblm0-0")
        .find("p")
        .text();
      const imgUrl = newsDiv.find("img").attr("src");

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
          "https://www.televizia.org/img/tv_mtavariarxi.png",
          url
        );
        // Write in Mtavari Json
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
        // Write in Mtavari news Json
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
