import request from 'request';
import cheerio from 'cheerio';
import writeToSource from '../writingData/writeToSource.js';
import checkFile from '../writingData/checkIfFileIsEmpty.js';
import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

function writeToFile(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        const title = $("*[itemprop='name']").first().text();
        const dataInfo = $("time").first().text();
        const text = $("*[itemprop='description']").text();
        const imgUrl = $("*[itemprop='image']").attr("data-src");

        if (
          title.includes("გირჩი") ||
          title.includes("იაგო ხვიჩია") ||
          title.includes("ვახტანგ მეგრელიშვილი") ||
          title.includes("ვახტანგ მეგრელიშვილი") ||
          title.includes("სანდრო რაქვიაშვილი")
        ) {
          console.log("მოიძებნა");
  
          // Write in Girchi Json
          writeDataToGirchi(
            "ipn.json",
            title,
            dataInfo,
            text,
            imgUrl,
            "https://www.interpressnews.ge/static/img/logofixed.svg",
            url
          );
          // Write in Source  Json
          writeToSource("ipn.json", "ipn", title, dataInfo, text, imgUrl, 'https://www.interpressnews.ge/static/img/logofixed.svg', url);
        } else {
          // console.log("არ მოიძებნა");
          // Write in Source Json
          writeToSource("ipn.json", "ipn", title, dataInfo, text, imgUrl, 'https://www.interpressnews.ge/static/img/logofixed.svg', url);
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
        //   console.log(`https://www.interpressnews.ge${obj[i].attribs.href}`);
        checkFile('./assets/data/on.json', writeToFile(`https://www.interpressnews.ge${obj[i].attribs.href}`));
      }
    } else {
      console.log("Something failed!");
    }
  })
}
