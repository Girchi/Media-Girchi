import fs from 'fs';
import request from 'request'
import cheerio from 'cheerio'

export default function scrapIpn(url, accept, accept1, sourceImgUrl) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const container = $('.container').html();
      const title = $('.articletitle').text();
      const dataInfo = $('.articledate').find('span').text();
      const text = $('.articlecontent_in').find('p').text();
      const imgUrl = $('.articleimg').find('img').attr("src");


      
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
        fs.readFile('./assets/data/ipn.json', (err, data) => {
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
          fs.writeFileSync("./assets/data/ipn.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else{
        fs.readFile('./assets/data/ipn.json', (err, data) => {
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
          fs.writeFileSync("./assets/data/ipn.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }
    }
  });
}
