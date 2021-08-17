import request from 'request';
import cheerio from 'cheerio';
import automatedWriteToImedi from '../writingData/automatedWriteToImedi.js';


export default function automateImedi() {
  request('https://imedinews.ge/ge/archive', (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);

      let obj = $('.row').find('.single-item');

    //   let text = obj[3].children[0].data;
    //   let url = obj[3].attribs.href;
      for (let i = 0; i < 10; i++) {
        automatedWriteToImedi(obj[i].attribs.href, "imedinews.json", "On", "https://www.imedi.ge/m/i/logo@2x.png");
      }
    } else {
      console.log("Something failed!");
    }
  })
}
