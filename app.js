// Node modules
import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
import bodyParser from 'body-parser';

// JS Components
import scrapTabula from './assets/components/scrapTabula.js';
import scrapOn from './assets/components/scrapOn.js';
import scrapFormula from './assets/components/scrapFormula.js';
import scrapPalitraNews from './assets/components/scrapPalitraNews.js';
import scrapMtavari from './assets/components/scrapMtavari.js';
import scrapImedi from './assets/components/scrapImedi.js';
import parseRSSFeed from './assets/components/parseRSSFeed.js';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("view engine", "pug");
app.use("/assets", express.static("assets"));

const host = '127.0.0.1';
const port = 3000;
app.listen(port, host, () => console.log(`Server running at http://${host}:${port}/\n`));


app.get("/", (req, res) => {
  let object = {};
  
  // Automatically reading JSON files filenames to iterate over them in app.get("/")
  let postSourcesArr = fs.readdirSync('./assets/data');
  
  postSourcesArr.forEach(source => {
    let response = JSON.parse(fs.readFileSync(`./assets/data/${source}`, 'utf-8'));

    Object.assign(object, response);
  });

  res.render(__dirname + "/views/index", { object })
});


const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/add_news", (req, res) => {
  res.render(__dirname + "/views/add_news")
});


app.get("/girchi_news", (req, res) => {
  let object = {};
  
  let response = JSON.parse(fs.readFileSync(`./assets/data/girchi.json`, 'utf-8'));

  Object.assign(object, response);

  res.render(__dirname + "/views/girchi_news",{ object })
});

// Add news section
app.post("/add_news", urlencodedParser, (req, res) => {
  const url = req.body.link;
  let source;
  let sourceImgUrl;
  if (url.includes('https://on.ge')) {
    source = 'on';
    sourceImgUrl = 'http://gip.ge/wp-content/uploads/2017/10/apple-touch-icon.png'
  }

  if (url.includes('https://tabula.ge')) {
    source = 'tabula'
    sourceImgUrl = 'https://upload.wikimedia.org/wikipedia/ka/c/c0/Tabula_logo.png'
  }

  if (url.includes('https://formulanews.ge')) {
    source = 'formula'
    sourceImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/TV_Formula_-_Official_Logo.png'
  }

  if (url.includes('https://palitranews.ge')) {
    source = 'palitranews'
    sourceImgUrl = 'https://www.tdi.ge/sites/default/files/tv_palitra_1.jpg'
  }

  if (url.includes('https://mtavari.tv')) {
    source = 'mtavari'
    sourceImgUrl = 'https://www.televizia.org/img/tv_mtavariarxi.png'
  }

  if (url.includes('https://imedinews.ge')) {
    source = 'imedi'
    sourceImgUrl = 'https://www.imedi.ge/m/i/logo@2x.png'
  }

  const accept = req.body.accept;
  const accept1 = req.body.accept1;

  switch (source) {
    case "tabula":
      scrapTabula(url, accept,accept1, sourceImgUrl);
      res.render('add_news');
      break;

    case "on":
      scrapOn(url, accept,accept1, sourceImgUrl);
      res.render('add_news');
      break;

    case "formula":
      scrapFormula(url, accept,accept1, sourceImgUrl);
      res.render('add_news');
      break;

    case "palitranews":
      scrapPalitraNews(url, accept,accept1, sourceImgUrl);
      res.render('add_news');
      break;

    case "mtavari":
      scrapMtavari(url, accept,accept1, sourceImgUrl);
      res.render('add_news');
      break;

    case "imedi":
      scrapImedi(url, accept,accept1,sourceImgUrl);
      res.render('add_news');
      break;
  }
});

// Parsing Girchi's RSS Feed for getting Facebook's feed posts 
parseRSSFeed();

