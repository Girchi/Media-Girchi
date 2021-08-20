import request from 'request';
import cheerio from 'cheerio';
import writeToSource from '../writingData/writeToSource.js';
import checkFile from '../writingData/checkIfFileIsEmpty.js';
import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

function writeToFile(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);

      const newsDiv = $(".id__Content-bhuaj0-13");
      const title = $(".id__Title-bhuaj0-10").text();
      const dataInfo = $(".id__PublishedAndUpdated-bhuaj0-15").find("time").attr("title");
      const text = $(".EditorContent__EditorContentWrapper-ygblm0-0").find("p").text();
      const imgUrl = newsDiv.find("img").attr("src");

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
          "mtavari.json",
          title,
          dataInfo,
          text,
          imgUrl,
          "https://www.televizia.org/img/tv_mtavariarxi.png",
          url
        );
        // Write in Source  Json
        writeToSource("mtavari.json", "Mtavari", title, dataInfo, text, imgUrl, 'https://www.televizia.org/img/tv_mtavariarxi.png', url);
      } else {
        // console.log("არ მოიძებნა");
        // Write in Source Json
        writeToSource("mtavari.json", "Mtavari", title, dataInfo, text, imgUrl, 'https://www.televizia.org/img/tv_mtavariarxi.png', url);
      }

      
    }
  });
}


export default function automateMtavari() {
  request('https://mtavari.tv/news/archive', (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let obj = $('.cjXGyg').children('div').first('div').find('a');

      for (let i = 0; i < obj.length; i++) {
        if (`https://mtavari.tv${obj[i].attribs.href}`.length > 65) {
          checkFile('./assets/data/mtavari.json', writeToFile(`https://mtavari.tv${obj[i].attribs.href}`));
        }
      }
    } else {
      console.log("Something failed!");
    }
  })
}
