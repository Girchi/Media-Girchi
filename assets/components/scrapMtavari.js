const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

function scrapMtavari(url,accept,accept1,sourceImgUrl) {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const newsDiv = $('.id__Content-bhuaj0-13')
      const title = $('.id__Title-bhuaj0-10').text();
      const dataInfo = $('.id__PublishedAndUpdated-bhuaj0-15').find('time').attr('title');
      const text = $('.EditorContent__EditorContentWrapper-ygblm0-0').find('p').text();
      const imgUrl = newsDiv.find('img').attr("src");

      if(accept==="on" && accept1==="on"){
        fs.readFile('./assets/data/girchi.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Mtavari",
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
            source: "Mtavari",
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
        fs.readFile('./assets/data/mtavari.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Mtavari",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/mtavari.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else if(accept==="on"){
        fs.readFile('./assets/data/important.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Mtavari",
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
        fs.readFile('./assets/data/mtavari.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Mtavari",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/mtavari.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else if(accept1==="on"){
        fs.readFile('./assets/data/girchi.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Mtavari",
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
        fs.readFile('./assets/data/mtavari.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Mtavari",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/mtavari.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }else{
        fs.readFile('./assets/data/mtavari.json', (err, data) => {
          if (err) throw err;
          let newsData = JSON.parse(data);
          newsData[dataInfo] = {
            ...newsData[dataInfo],
            source: "Mtavari",
            title: title,
            text: text,
            link: url,
            logo: sourceImgUrl,
            articleDate: dataInfo,
            imgUrl: imgUrl,
          };
          newsData = JSON.stringify(newsData)
          fs.writeFileSync("./assets/data/mtavari.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }
    }
  });
}

module.exports = scrapMtavari;