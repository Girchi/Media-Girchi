import fs from 'fs';
import request from 'request'
import cheerio from 'cheerio'

export default function scrapTabula(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $('.om-main')
      const title = newsDiv.find('h1').text();
      const dataInfo = $('.ArticleHeaderDefault_metaItem__1OQi4').text();
      const text = newsDiv.find('p').text();
      const imgUrl = newsDiv.find('img').attr("src");

      fs.readFile('./assets/data/tabula.json', (err, data) => {
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
        fs.writeFileSync("./assets/data/tabula.json", newsData, (error) => {
          if (error) console.log(error)
        })
      });
    }
  });
}
