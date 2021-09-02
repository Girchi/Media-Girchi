import request from 'request';
import cheerio from 'cheerio'; 
import writeDataToGirchi from '../writingData/writeDataToGirchi.js';
import writeDataToImportants from '../writingData/writeDataToImportants.js';
import writeToSource from '../writingData/writeToSource.js';

export default function scrapOn(url, isImportantCheckbox, isAboutGirchiCheckbox, sourceImgUrl) {
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
  } catch (err) {
    console.log(err);
  }
}
