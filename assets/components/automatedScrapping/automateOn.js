import request from 'request';
import cheerio from 'cheerio';
import automatedWriteToON from '../writingData/automatedWriteToON.js';


export default function automateOn() {
  request('https://on.ge', (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);

      let obj = $('.row').find('section').find('a.overlay-link');

      let text = obj[3].children[0].data;
      let url = obj[3].attribs.href;
      for (let i = 0; i < 10; i++) {
        automatedWriteToON(obj[i].attribs.href, "on.json", "On", "http://gip.ge/wp-content/uploads/2017/10/apple-touch-icon.png");
      }
    } else {
      console.log("Something failed!");
    }
  })
}
