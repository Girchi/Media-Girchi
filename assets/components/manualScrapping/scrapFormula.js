import request from 'request';
import cheerio from 'cheerio'; 
import writeDataToGirchi from '../writingData/writeDataToGirchi.js';
import writeDataToImportants from '../writingData/writeDataToImportants.js';
import writeToSource from '../writingData/writeToSource.js';

export default function scrapFormula(url, isImportantCheckbox, isAboutGirchiCheckbox, sourceImgUrl) {
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


      if (isImportantCheckbox === "on" && isAboutGirchiCheckbox === "on") {
        writeGirchi();
        writeImportants();
        writeSource();

      } else if (isImportantCheckbox === "on") {
        writeImportants();
        writeSource();
      } else if (isAboutGirchiCheckbox === "on") {
        writeGirchi();
        writeSource();
      } else {
        writeSource();
      }
    }
  });
}
