
// Node modules
import express from 'express';
import http from 'http';
import fs from 'fs';
import {Server, Socket} from 'socket.io';
import dirname from 'path';
import fileURLToPath from 'url'
import bodyParser from 'body-parser';
import isObject from 'util';


// JS Components
import scrapTabula from './assets/components/Scrapping/scrapTabula.js';
import scrapOn from './assets/components/Scrapping/scrapOn.js';
import scrapFormula from './assets/components/Scrapping/scrapFormula.js';
import scrapPalitraNews from './assets/components/Scrapping/scrapPalitraNews.js';
import scrapMtavari from './assets/components/Scrapping/scrapMtavari.js';
import scrapIpn from './assets/components/Scrapping/scrapIpn.js';
import scrapImedi from './assets/components/Scrapping/scrapImedi.js';
import parseRSSFeed from './assets/components/Scrapping/parseRSSFeed.js';


const app = express();
const server = http.createServer(app);

const io = new Server(server, { 
  cors: { 
    origin: "*" 
  } 
});

app.set("view engine", "pug");
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
  parseRSSFeed();
  let object = {};

  // Automatically reading JSON files filenames to iterate over them in app.get("/")
  let postSourcesArr = fs.readdirSync("./assets/data");

  postSourcesArr.forEach((source) => {
    let response = JSON.parse(
      fs.readFileSync(`./assets/data/${source}`, "utf-8")
    );

    Object.assign(object, response);
  });

  let importantNews = JSON.parse(
    fs.readFileSync("./assets/data/important.json", "utf-8")
  );
  res.render("index", { object, importantNews });
});

const host = "127.0.0.1";
const port = 3000;
server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}/\n`)
);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

io.on("connection", (socket) => {
  socket.on("message", (obj) => {
    const checkData = JSON.parse(obj);
    const importance = checkData.important;
    const important = !importance;
    const filename = checkData.fileName;
    console.log(filename);
    console.log(importance);
    if (importance === false) {
      fs.readFile("assets/data/important.json", (err, data) => {
        if (err) throw err;
        let oldData = JSON.parse(data);
        let newObj = JSON.parse(obj);
        newObj["important"] = important;
        oldData[newObj.articleDate] = {
          ...oldData[newObj.articleDate],
          ...newObj,
        };
        oldData = JSON.stringify(oldData);
        fs.writeFile("assets/data/important.json", oldData, (error) => {
          if (error) console.log(error);
        });
      });
      fs.readFile(`assets/data/${filename}`, (err, data) => {
        if (err) throw err;
        let oldData = JSON.parse(data);
        oldData[checkData.articleDate].important = true

        oldData = JSON.stringify(oldData);
        fs.writeFile(`assets/data/${filename}`, oldData, (error) => {
          if (error) console.log(error);
        });
      });
    } else {
      // const reverseImportant=!importance
      console.log("This news is already MARKED!!");
    }
  });
});

app.get("/add_news", (req, res) => {
  res.render(__dirname + "/views/add_news");
});

app.get("/girchi_news", (req, res) => {
  let object = {};

  let response = JSON.parse(
    fs.readFileSync(`./assets/data/girchi.json`, "utf-8")
  );

  Object.assign(object, response);
  res.render(__dirname + "/views/girchi_news", { object });
});

// Add news section
app.post("/add_news", urlencodedParser, (req, res) => {
  const url = req.body.link;
  let source;
  let sourceImgUrl;
  if (url.includes("https://on.ge")) {
    source = "on";
    sourceImgUrl =
      "http://gip.ge/wp-content/uploads/2017/10/apple-touch-icon.png";
  }

  if (url.includes("https://tabula.ge")) {
    source = "tabula";
    sourceImgUrl =
      "https://upload.wikimedia.org/wikipedia/ka/c/c0/Tabula_logo.png";
  }

  if (url.includes("https://formulanews.ge")) {
    source = "formula";
    sourceImgUrl =
      "https://upload.wikimedia.org/wikipedia/commons/7/7b/TV_Formula_-_Official_Logo.png";
  }

  if (url.includes("https://palitranews.ge")) {
    source = "palitranews";
    sourceImgUrl = "https://www.tdi.ge/sites/default/files/tv_palitra_1.jpg";
  }

  if (url.includes("https://mtavari.tv")) {
    source = "mtavari";
    sourceImgUrl = "https://www.televizia.org/img/tv_mtavariarxi.png";
  }

  if (url.includes("https://imedinews.ge")) {
    source = "imedi";
    sourceImgUrl = "https://www.imedi.ge/m/i/logo@2x.png";
  }

  if (url.includes("https://www.interpressnews.ge/")) {
    source = "ipn";
    sourceImgUrl = "https://www.interpressnews.ge/static/img/logofixed.svg";
  }

  const accept = req.body.accept;
  const accept1 = req.body.accept1;

  switch (source) {
    case "tabula":
      scrapTabula(url, accept, accept1, sourceImgUrl);
      res.render("add_news");
      break;

    case "on":
      scrapOn(url, accept, accept1, sourceImgUrl);
      res.render("add_news");
      break;

    case "formula":
      scrapFormula(url, accept, accept1, sourceImgUrl);
      res.render("add_news");
      break;

    case "palitranews":
      scrapPalitraNews(url, accept, accept1, sourceImgUrl);
      res.render("add_news");
      break;

    case "mtavari":
      scrapMtavari(url, accept, accept1, sourceImgUrl);
      res.render("add_news");
      break;

    case "imedi":
      scrapImedi(url, accept, accept1, sourceImgUrl);
      res.render("add_news");
      break;

    case "ipn":
      scrapIpn(url, accept, accept1, sourceImgUrl);
      res.render("add_news");
      break;
  }
});
