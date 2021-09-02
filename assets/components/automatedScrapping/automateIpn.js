import request from 'request';
import cheerio from 'cheerio';
import writeToSource from '../writingData/writeToSource.js';
import checkFile from '../writingData/checkIfFileIsEmpty.js';
import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

const GirchiKeywords = ['გირჩი', 'იაგო ხვიჩია', 'ვახტანგ მეგრელიშვილი', 'სანდრო რაქვიაშვილი'];

function writeToFile(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);

      const title = $("*[itemprop='name']").first().text();
      const dataInfo = $("time").first().text();
      const text = $("*[itemprop='description']").text();
      const imgUrl = $("*[itemprop='image']").attr("data-src");
      const logoUrl = "https://www.interpressnews.ge/static/img/logofixed.svg";

      let isAboutGirchi = GirchiKeywords.some(keyword => title.includes(keyword));

      if(isAboutGirchi) {
        // Write in Girchi Json
        writeDataToGirchi("ipn.json", title, dataInfo, text, imgUrl, logoUrl, url);
        // Write in Source  Json
        writeToSource("ipn.json", "IPN", title, dataInfo, text, imgUrl, logoUrl, url);
      } else {
        // Write in Source Json
        writeToSource("ipn.json", "IPN", title, dataInfo, text, imgUrl, logoUrl, url);
      }
    }
  });
}


export default function automateIpn() {
  request('https://www.interpressnews.ge/ka/', (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let obj = $("div").children().find('a')
      for (let i = 26; i < 32; i++) {
        checkFile('./assets/data/ipn.json', writeToFile(`https://www.interpressnews.ge${obj[i].attribs.href}`));
      }
    } else {
      console.log("Something has failed!");
    }
  })
}
