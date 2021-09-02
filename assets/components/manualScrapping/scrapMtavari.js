import request from 'request';
import cheerio from 'cheerio';
import writeDataToGirchi from '../writingData/writeDataToGirchi.js';
import writeDataToImportants from '../writingData/writeDataToImportants.js';
import writeToSource from '../writingData/writeToSource.js';

export default function scrapMtavari(url, isImportantCheckbox, isAboutGirchiCheckbox, sourceImgUrl) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $(".id__Content-bhuaj0-13");
      const title = $(".id__Title-bhuaj0-10").text();
      const dataInfo = $(".id__PublishedAndUpdated-bhuaj0-15").find("time").attr("title");
      const text = $(".EditorContent__EditorContentWrapper-ygblm0-0").find("p").text();
      const imgUrl = newsDiv.find("img").attr("src");

      const writeGirchi = () => writeDataToGirchi("mtavari.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
      const writeImportants = () => writeDataToImportants("mtavari.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
      const writeSource = () => writeToSource("mtavari.json", "Mtavari", title, dataInfo, text, imgUrl, sourceImgUrl, url);

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
