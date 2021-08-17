const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const writeDataToGirchi = require('./writeDataToGirchi');
const writeDataToImportants = require('./writeDataToImportants');
const writeToSource = require('./writeToSource');


function scrapPalitraNews(url, accept, accept1, sourceImgUrl) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $(".video_block");
      const newText = $(".video_block_title_desc");
      const title = $(".video_block_desc").text();
      const dataInfo = $(".newsblockdate_video_page").text();
      const text = newText.find("p").text();
      const imgUrl = newsDiv.find("source").attr("src");

      const writeGirchi = () => writeDataToGirchi("palitra.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
      const writeImportants = () => writeDataToImportants("palitra.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
      const writeSource = () => writeToSource("palitra.json", "Palitra", title, dataInfo, text, imgUrl, sourceImgUrl, url);

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

module.exports = scrapPalitraNews;
