import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';


function writeToSource(url, fileName, sourceName) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const title = $(".article-title").text();
      const dataInfo = $(".date").first().text();
      const text = $(".article-body").text();
      const imgUrl = `https:${$(".global-figure-image  ").attr("src")}`;


      let newsData = JSON.parse(fs.readFileSync(`./assets/data/${fileName}`, 'utf-8'));
      newsData[dataInfo] = {
        ...newsData[dataInfo],
        source: sourceName,
        title: title,
        text: text,
        link: url,
        logo: "http://gip.ge/wp-content/uploads/2017/10/apple-touch-icon.png",
        articleDate: dataInfo,
        imgUrl: imgUrl,
        important: false,
        fileName: fileName
      };
      newsData = JSON.stringify(newsData)
      fs.writeFileSync(`./assets/data/${fileName}`, newsData, (error) => {
        if (error) console.log(error)
      })
    }
  })
}


export default function automateOn() {
  request('https://on.ge', (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let obj = $('.row').find('section').find('a.overlay-link');

      // console.log(object[1].children[0].data)
      let text = obj[3].children[0].data;
      let url = obj[3].attribs.href;
      for (let i = 0; i < obj.length; i++) {
        writeToSource(obj[i].attribs.href, "on.json", "On");
      }
    } else {
      console.log("Something failed!");
    }
  })
}
