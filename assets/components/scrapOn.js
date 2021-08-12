import fs from 'fs';
import request from 'request'
import cheerio from 'cheerio'

export default function scrapOn(url,accept,sourceImgUrl) {
  try {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        
        const newsDiv = $('.col-article-content x-border-right')
        const title = $('.article-title').text();
        const dataInfo = $('.date').first().text();
        const text = $('.article-body').text();
        const imgUrl = `https:${$('.global-figure-image  ').attr("src")}`;
        
        if(accept==="on"){
          fs.readFile('./assets/data/important.json', (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl
            };
            newsData = JSON.stringify(newsData)
            fs.writeFileSync("./assets/data/important.json", newsData, (error) => {
              if (error) console.log(error)
            })
          });
          fs.readFile('./assets/data/on.json', (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl
            };
            
            newsData = JSON.stringify(newsData)
            fs.writeFileSync("./assets/data/on.json", newsData, (error) => {
              if (error) console.log(error)
            })
          });
        }else{
          fs.readFile('./assets/data/on.json', (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl
            };
            newsData = JSON.stringify(newsData)
            fs.writeFileSync("./assets/data/on.json", newsData, (error) => {
              if (error) console.log(error)
            })
          });
        }
      }
    });
  } catch(err) {
    console.log(err);
  }
  
}
