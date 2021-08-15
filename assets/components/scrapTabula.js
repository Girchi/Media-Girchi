const fs = require('fs');
const request = require('request')
const cheerio = request('cheerio');

function scrapTabula(url,accept,accept1,sourceImgUrl) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $('.om-main')
      const title = newsDiv.find('h1').text();
      const dataInfo = $('.ArticleHeaderDefault_metaItem__1OQi4').text();
      const text = newsDiv.find('p').text();
      const imgUrl = newsDiv.find('img').attr("src");

      if(accept==="on" && accept1==="on"){
        fs.readFile('./assets/data/girchi.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Tabula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
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
            source: "Tabula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/important.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
        fs.readFile('./assets/data/tabula.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Tabula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/tabula.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else if(accept==="on"){
        fs.readFile('./assets/data/important.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Tabula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/important.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
        fs.readFile('./assets/data/tabula.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Tabula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/tabula.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else if(accept1==="on"){
        fs.readFile('./assets/data/girchi.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Tabula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/girchi.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
        fs.readFile('./assets/data/tabula.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Tabula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/tabula.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else{
        fs.readFile('./assets/data/tabula.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Tabula",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/tabula.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }
    }
  });
}
module.exports=scrapTabula