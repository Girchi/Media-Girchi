import fs from "fs";
import request from "request";
import cheerio from "cheerio";
import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

export default function automatedWriteToTabula(
  url,
  fileName,
  sourceName,
  logoUrl
) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const newsDiv = $(".om-main");
      const title = newsDiv.find("h1").text();
      const dataInfo = $(".ArticleHeaderDefault_metaItem__1OQi4").text();
      const text = newsDiv.find("p").text();
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
          "tabula.json",
          title,
          dataInfo,
          text,
          imgUrl,
          "https://upload.wikimedia.org/wikipedia/ka/c/c0/Tabula_logo.png",
          url
        );
        // Write in Tabula news Json
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
        // Write in Tabula news Json
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
