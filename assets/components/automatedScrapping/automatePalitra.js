import request from 'request';
import cheerio from 'cheerio';
import writeToSource from '../writingData/writeToSource.js';
import checkFile from '../writingData/checkIfFileIsEmpty.js';
import writeDataToGirchi from "../writingData/writeDataToGirchi.js";

function writeToFile(url, image) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        const newText = $(".video_block_title_desc");
        const title = $(".video_block_desc").text();
        const dataInfo = $(".newsblockdate_video_page").text();
        const text = newText.find("p").text();

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
            "palitra.json",
            title,
            dataInfo,
            text,
            imgUrl,
            "https://www.tdi.ge/sites/default/files/tv_palitra_1.jpg",
            url
          );
          // Write in Source  Json
          writeToSource("palitra.json", "Palitra", title, dataInfo, text, image, 'https://www.tdi.ge/sites/default/files/tv_palitra_1.jpg', url);
        } else {
          console.log("არ მოიძებნა");
          // Write in Source Json
          writeToSource("palitra.json", "Palitra", title, dataInfo, text, image, 'https://www.tdi.ge/sites/default/files/tv_palitra_1.jpg', url);
        }
        
    }
  });
}

export default function automatePalitra() {
    request('https://palitranews.ge/category/news', (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let obj = $('.newsblockin').find('.newsblockcol');
      let imageObj = obj.find(".card").find(".card-img-top");

      for (let i = 3; i < 16; i++) {
        checkFile("./assets/data/palitra.json", writeToFile(obj[i].attribs.href, `https://palitranews.ge${imageObj[i].attribs.src}`));
      }
    } else {
      console.log("Something failed!");
    }
  })
}
