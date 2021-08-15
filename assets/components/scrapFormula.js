const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

function scrapFormula(url,accept,accept1,sourceImgUrl) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $('.article')
      const title = $('.news__inner__desc__title').text();
      const dataInfo = $('.news__inner__images_created').text();
      const text = newsDiv.find('p').text();
      const imgUrl = `https://formulanews.ge${$('.news__inner__main__image').find('img').attr("src")}`;


      if(accept==="on" && accept1==="on"){
        fs.readFile('./assets/data/girchi.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Formula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/girchi.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
        fs.readFile('./assets/data/important.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Formula",
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
        fs.readFile('./assets/data/formula.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Formula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/formula.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else if(accept==="on"){
        fs.readFile('./assets/data/important.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Formula",
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
        fs.readFile('./assets/data/formula.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Formula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/formula.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else if(accept1==="on"){
        fs.readFile('./assets/data/girchi.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Formula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/girchi.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
        fs.readFile('./assets/data/formula.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Formula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/formula.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else{
        fs.readFile('./assets/data/formula.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Formula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/formula.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }
    }
  });
}

module.exports = scrapFormula;