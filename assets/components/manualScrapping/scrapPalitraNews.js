import request from 'request';
import cheerio from 'cheerio'; 
import writeDataToGirchi from '../writingData/writeDataToGirchi.js';
import writeDataToImportants from '../writingData/writeDataToImportants.js';
import writeToSource from '../writingData/writeToSource.js';


export default function scrapPalitraNews(url, isImportantCheckbox, isAboutGirchiCheckbox, sourceImgUrl) {
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
