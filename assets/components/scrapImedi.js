import fs from 'fs';
import request from 'request'
import cheerio from 'cheerio'

export default function scrapImedi(url,accept) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const siteHeading = $('.detail-wrap')
      const dataInfo = $('.dateandsource').children('span').first().text();
      const title = siteHeading.find('h1').text();
      const text = siteHeading.find('p').text();
      const imgUrl = siteHeading.find('img').attr("src");
      
      if(accept==="on"){
        fs.readFile('./assets/data/important.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            title: title,
            text: text,
            articleDate: dataInfo,
            imgUrl: imgUrl
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/important.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
        fs.readFile('./assets/data/imedinews.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            title: title,
            text: text,
            articleDate: dataInfo,
            imgUrl: imgUrl
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/imedinews.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else{
        fs.readFile('./assets/data/imedinews.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            title: title,
            text: text,
            articleDate: dataInfo,
            imgUrl: imgUrl
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/imedinews.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }
      
    }
  });
}
