import fs from 'fs';
import request from 'request'
import cheerio from 'cheerio'

export default function scrapFormula(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $('.article')
      const title = $('.news__inner__desc__title').text();
      const dataInfo = $('.news__inner__images_created').text();
      const text = newsDiv.find('p').text();
      const imgUrl = `https://formulanews.ge${$('.news__inner__main__image').find('img').attr("src")}`;


      fs.readFile('./assets/data/formula.json', (err, data) => {
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
        fs.writeFileSync("./assets/data/formula.json", newsData, (error) => {
          if (error) console.log(error)
        })
      });
    }
  });
}
