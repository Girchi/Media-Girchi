import request from 'request';
import cheerio from 'cheerio'; 
import writeDataToGirchi from '../writingData/writeDataToGirchi.js';
import writeDataToImportants from '../writingData/writeDataToImportants.js';
import writeToSource from '../writingData/writeToSource.js';

export default function scrapOn(url, accept, accept1, sourceImgUrl) {
  try {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const newsDiv = $(".col-article-content x-border-right");
        const title = $(".article-title").text();
        const dataInfo = $(".date").first().text();
        const text = $(".article-body").text();
        const imgUrl = `https:${$(".global-figure-image  ").attr("src")}`;

        const writeGirchi = () => writeDataToGirchi("on.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
        const writeImportants = () => writeDataToImportants("on.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
        const writeSource = () => writeToSource("on.json", "On", title, dataInfo, text, imgUrl, sourceImgUrl, url);


        if (accept === "on" && accept1 === "on") {
          writeGirchi();
          writeImportants();
          writeSource();
        } else if (accept === "on") {
          writeImportants();
          writeSource();
        } else if (accept1 === "on") {
          writeGirchi();
          writeSource();
        } else {
          writeSource();
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
}
