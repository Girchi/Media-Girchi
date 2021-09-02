import request from 'request';
import cheerio from 'cheerio'; 
import writeDataToGirchi from '../writingData/writeDataToGirchi.js';
import writeDataToImportants from '../writingData/writeDataToImportants.js';
import writeToSource from '../writingData/writeToSource.js';


export default function scrapIpn(url, isImportantCheckbox, isAboutGirchiCheckbox, sourceImgUrl) {
  try {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const title = $("*[itemprop='name']").first().text();
        const dataInfo = $("time").first().text();
        const text = $("*[itemprop='description']").text();
        const imgUrl = $("*[itemprop='image']").attr("data-src");

        const writeGirchi = () => writeDataToGirchi("ipn.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
        const writeImportants = () => writeDataToImportants("ipn.json", title, dataInfo, text, imgUrl, sourceImgUrl, url);
        const writeSource = () => writeToSource("ipn.json", "IPN", title, dataInfo, text, imgUrl, sourceImgUrl, url);

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
