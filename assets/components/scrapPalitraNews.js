import fs from 'fs';
import request from 'request'
import cheerio from 'cheerio'

export default function scrapPalitraNews(url) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $('.video_block')
      const newText = $(".video_block_title_desc")
      const title = $('.video_block_desc').text();
      const dataInfo = $('.newsblockdate_video_page').text();
      const text = newText.find('p').text();
      const imgUrl = newsDiv.find('source').attr("src");

      fs.readFile('./assets/data/palitra.json', (err, data) => {
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
        fs.writeFileSync("./assets/data/palitra.json", newsData, (error) => {
          if (error) console.log(error)
        })
      });
    }
  });
}
