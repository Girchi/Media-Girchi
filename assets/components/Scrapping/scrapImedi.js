import request from 'request';
import cheerio from 'cheerio'; 
import writeDataToGirchi from '../writingData/writeDataToGirchi.js';
import writeDataToImportants from '../writingData/writeDataToImportants.js';
import writeToSource from '../writingData/writeToSource.js';

export default function scrapImedi(url, accept, accept1, sourceImgUrl) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const siteHeading = $('.detail-wrap')
      const dataInfo = $('.dateandsource').children('span').first().text();
      const title = siteHeading.find('h1').text();
      const text = siteHeading.find('p').text();
      const imgUrl = siteHeading.find('img').attr("src");

      const writeGirchi = () => writeDataToGirchi("imedinews.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
      const writeImportants = () => writeDataToImportants("imedinews.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
      const writeSource = () => writeToSource("imedinews.json", "ImediNews", title, dataInfo, text, imgUrl, sourceImgUrl, url);

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
