import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
import fetch from 'node-fetch';
import request from 'request'
import cheerio from 'cheerio'
import bodyParser from 'body-parser';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("view engine", "pug");
app.use("/assets", express.static("assets"));

const host = '127.0.0.1';
const port = 3000;
app.listen(port, host, () => console.log(`Server running at http://${host}:${port}/\n`));


let globalParams = {}
const postSourcesArr = ['formula.json', 'imedinews.json', 'mtavari.json', 'on.json', 'palitra.json', 'tabula.json'];

function readFileToDisplayNews(path) {
    fs.readFile(`./assets/data/${path}`, (err, data) => {
        if (err) throw err;
        const response = JSON.parse(data);

        let object = Object.assign(globalParams, response);
        app.get("/", (req, res) => {
          res.render(__dirname + "/views/index", { object })
        });
    })
}
postSourcesArr.forEach(source => readFileToDisplayNews(source));


const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/add_news", (req, res) => {
  res.render(__dirname + "/views/add_news")
});

app.post("/add_news", urlencodedParser, (req, res) => {
  const url = req.body.link;
  const source = req.body.source;


  // ---------------------------TABULA--------------------------------
  if (source === "tabula" && url) {
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
      res.render('add_news');
    });
  }

  // ---------------------------ON--------------------------------
  if (source === "on" && url) {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const newsDiv = $('.col-article-content x-border-right')
        const title = $('.article-title').text();
        const dataInfo = $('.date').first().text();
        const text = $('.article-body').text();
        const imgUrl = `https:${$('.global-figure-image  ').attr("src")}`;

        fs.readFile('./assets/data/on.json', (err, data) => {
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
          fs.writeFileSync("./assets/data/on.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }
      res.render('add_news');
    });
  }

  // ---------------------------formula--------------------------------
  if (source === "formula" && url) {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const newsDiv = $('.arcticle')
        const title = $('.news__inner__desc__title').text();
        const dataInfo = $('.news__inner__images_created').text();
        const text = $('.article-content').text();
        const imgUrl = `https://formulanews.ge${$('.news__inner__main__image').find('img').attr("src")}`;
        console.log(dataInfo)



        fs.readFile('./assets/data/formula.json', (err, data) => {
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
          fs.writeFileSync("./assets/data/formula.json", newsData, (error) => {
            if (error) console.log(error)
          })
        });
      }
      res.render('add_news');
    });
  }
  // ---------------------------PalitraNews--------------------------------
  if (source === "palitranews" && url) {
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
      res.render('add_news');
    });
  }
  // ---------------------------Mtavari--------------------------------
  if (source === "mtavari" && url) {
    console.log("yes- mtavari")
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
      res.render('add_news');
    });
  }

  // ---------------------------Imedi News--------------------------------
  if (source === "imedi" && url) {
    console.log("imedi")
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const siteHeading = $('.detail-wrap')

        const dataInfo = $('.dateandsource').children('span').first().text();
        const title = siteHeading.find('h1').text();
        const text = siteHeading.find('p').text();
        const imgUrl = siteHeading.find('img').attr("src");

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

      res.render('add_news');

    });
  }

});







// async function scrapImedi(url) {
//     request(url, (error, response, html) => {
//       if (!error && response.statusCode === 200) {
//         const $ = cheerio.load(html);
//         const siteHeading = $('.details-wrap');
  
//         const dataInfo = $('.dateandsource').children('span').first().text();
//         const title = siteHeading.find('h1').text();
//         const text = siteHeading.find('p').text();
//         const imgUrl = siteHeading.find('img').attr("src");
  
//         fs.readFile('./assets/data/data.json', (err, data) => {
//           if (err) throw err;
//           let newsData = JSON.parse(data);
//           Object.assign(newsData, {
//             title: title,
//             text: text,
//             articleDate: dataInfo,
//             imgUrl: imgUrl
//           });
  
//           newsData = JSON.stringify(newsData);
//           fs.writeFile("./assets/data/data.json", newsData, (error) => {
//             if (error) console.log(error)
//           })
//         });
//       }
//     });
//   }
