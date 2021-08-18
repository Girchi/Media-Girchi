import request from 'request';
import cheerio from 'cheerio';
import automatedWriteToMtavari from '../writingData/automatedWriteToMtavari.js';


export default function automateMtvari() {
  request('https://mtavari.tv/news/archive', (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);

      let obj = $('.cjXGyg').children('div').first('div').find('a');


      for (let i = 0; i < obj.length; i++) {
          if(`https://mtavari.tv${obj[i].attribs.href}`.length>65){
            automatedWriteToMtavari(`https://mtavari.tv${obj[i].attribs.href}`, "mtavari.json", "mtavari", "https://www.televizia.org/img/tv_mtavariarxi.png");
        }
    }
    } else {
      console.log("Something failed!");
    }
  })
}
