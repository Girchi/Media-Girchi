import fs from 'fs';
import request from 'request'
import cheerio from 'cheerio'

export default function scrapOn(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $('.col-article-content x-border-right')
      const title = $('.article-title').text();
      const dataInfo = $('.date').first().text();
      const text = $('.article-body').text();
      const imgUrl = `https:${$('.global-figure-image  ').attr("src")}`;

      fs.readFile('./assets/data/on.json', (err, data) => {
        if (err) throw err;
        let newsData = JSON.parse(data);
        newsData[dataInfo] = {
          ...newsData[dataInfo],
          link: url,
          title: title,
          text: text,
          articleDate: dataInfo,
          imgUrl: imgUrl
        };
        newsData = JSON.stringify(newsData)
        fs.writeFileSync("./assets/data/on.json", newsData, (error) => {
          if (error) console.log(error)
        })
      });
    }
  });
}
