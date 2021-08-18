import request from 'request';
import cheerio from 'cheerio';
import writeToSource from '../writingData/writeToSource.js';

function writeToFile(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const siteHeading = $(".detail-wrap");
      const dataInfo = $(".dateandsource").children("span").first().text();
      const title = siteHeading.find("h1").text();
      const text = siteHeading.find("p").text();
      const imgUrl = siteHeading.find("img").attr("src");

      writeToSource('imedinews.json', "Imedi", title, dataInfo, text, imgUrl, 'https://www.imedi.ge/m/i/logo@2x.png', url);
    }
  });
}


export default function automateImedi() {
  request('https://imedinews.ge/ge/archive', (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let obj = $('.row').find('.single-item');
<<<<<<< HEAD

    //   let text = obj[3].children[0].data;
    //   let url = obj[3].attribs.href;
      for (let i = 0; i < obj.length; i++) {
        automatedWriteToImedi(obj[i].attribs.href, "imedinews.json", "On", "https://www.imedi.ge/m/i/logo@2x.png");
=======
      
      for (let i = 0; i < 10; i++) {
        writeToFile(obj[i].attribs.href);
>>>>>>> b3bdeeb7ddaa64904af5ee62fd1c16ebbe8eed73
      }
    } else {
      console.log("Something failed!");
    }
  })
}
