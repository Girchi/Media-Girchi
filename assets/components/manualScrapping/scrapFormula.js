import request from 'request';
import cheerio from 'cheerio'; 
import writeDataToGirchi from '../writingData/writeDataToGirchi.js';
import writeDataToImportants from '../writingData/writeDataToImportants.js';
import writeToSource from '../writingData/writeToSource.js';

export default function scrapFormula(url, accept, accept1, sourceImgUrl) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $(".article");
      const title = $(".news__inner__desc__title").text();
      const dataInfo = $(".news__inner__images_created").text();
      const text = newsDiv.find("p").text();
      const imgUrl = `https://formulanews.ge${$(".news__inner__main__image").find("img").attr("src")}`;

      const writeGirchi = () => writeDataToGirchi("formula.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
      const writeImportants = () => writeDataToImportants("formula.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
      const writeSource = () => writeToSource("formula.json", "Formula", title, dataInfo, text, imgUrl, sourceImgUrl, url);


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
}
