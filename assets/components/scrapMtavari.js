import fs from 'fs';
import request from 'request'
import cheerio from 'cheerio'

export default function scrapMtavari(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $('.id__Content-bhuaj0-13')
      const title = $('.id__Title-bhuaj0-10').text();
      const dataInfo = $('.id__PublishedAndUpdated-bhuaj0-15').find('time').attr('title');
      const text = $('.EditorContent__EditorContentWrapper-ygblm0-0').find('p').text();
      const imgUrl = newsDiv.find('img').attr("src");

      fs.readFile('./assets/data/mtavari.json', (err, data) => {
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
        fs.writeFileSync("./assets/data/mtavari.json", newsData, (error) => {
          if (error) console.log(error)
        })
      });
    }
  });
}
