const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

function scrapOn(url, accept, accept1, sourceImgUrl) {
  try {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const newsDiv = $('.col-article-content x-border-right')
        const title = $('.article-title').text();
        const dataInfo = $('.date').first().text();
        const text = $('.article-body').text();
        const imgUrl = `https:${$('.global-figure-image  ').attr("src")}`;

        if (accept === "on" && accept1 === "on") {
          fs.readFile('./assets/data/girchi.json', (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "On",
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
              source: "On",
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
          fs.readFile('./assets/data/on.json', (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "On",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
            };
            newsData = JSON.stringify(newsData)
            fs.writeFileSync("./assets/data/on.json", newsData, (error) => {
              if (error) console.log(error)
            })
          });
        } else if (accept === "on") {
          fs.readFile('./assets/data/important.json', (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "On",
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
          fs.readFile('./assets/data/on.json', (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "On",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
            };
            newsData = JSON.stringify(newsData)
            fs.writeFileSync("./assets/data/on.json", newsData, (error) => {
              if (error) console.log(error)
            })
          });
        } else if (accept1 === "on") {
          fs.readFile('./assets/data/girchi.json', (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "On",
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
          fs.readFile('./assets/data/on.json', (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "On",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
            };
            newsData = JSON.stringify(newsData)
            fs.writeFileSync("./assets/data/on.json", newsData, (error) => {
              if (error) console.log(error)
            })
          });
        } else {
          fs.readFile('./assets/data/on.json', (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "On",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
            };
            newsData = JSON.stringify(newsData)
            fs.writeFileSync("./assets/data/on.json", newsData, (error) => {
              if (error) console.log(error)
            })
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }

}

module.exports = scrapOn;