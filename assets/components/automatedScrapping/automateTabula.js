import request from "request";
import cheerio from "cheerio";
import automatedWriteToTabula from "../writingData/automatedWriteToTabula.js";

export default function automateOn() {
  request("https://tabula.ge/ge/news", (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);

      let obj = $(".PagedNewsItemList_listWrap__Jr25w")
        .find(".news-item-list-item")
        .find("a");
      //   let text = obj[3].children[0].data;
      //   let url = obj[3].attribs.href;
      for (let i = 0; i < obj.length; i++) {
        automatedWriteToTabula(
            `https://tabula.ge${obj[i].attribs.href}`,
          "tabula.json",
          "tabula",
          "https://upload.wikimedia.org/wikipedia/ka/c/c0/Tabula_logo.png"
        );
      }
    } else {
      console.log("Something failed!");
    }
  });
}
