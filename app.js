// Node modules
import express from 'express';
import http from 'http';
import fs from 'fs';
import {Server, Socket} from 'socket.io';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// JS Components
import scrapTabula from './assets/components/manualScrapping/scrapTabula.js';
import scrapOn from './assets/components/manualScrapping/scrapOn.js';
import scrapFormula from './assets/components/manualScrapping/scrapFormula.js';
import scrapPalitraNews from './assets/components/manualScrapping/scrapPalitraNews.js';
import scrapMtavari from './assets/components/manualScrapping/scrapMtavari.js';
import scrapIpn from './assets/components/manualScrapping/scrapIpn.js';
import scrapImedi from './assets/components/manualScrapping/scrapImedi.js';
import parseRSSFeed from './assets/components/manualScrapping/parseRSSFeed.js';

import checkFile from './assets/components/writingData/checkIfFileIsEmpty.js';
import automateOn from './assets/components/automatedScrapping/automateOn.js';
import automateImedi from './assets/components/automatedScrapping/automateImedi.js';
import automateFormula from './assets/components/automatedScrapping/automateFormula.js';
import automatePalitra from './assets/components/automatedScrapping/automatePalitra.js'
import automateMtavari from './assets/components/automatedScrapping/automateMtavari.js';
import automateTabula from './assets/components/automatedScrapping/automateTabula.js';
import automateIpn from './assets/components/automatedScrapping/automateIpn.js';

const app = express();
const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const io = new Server(server, { 
  cors: { 
    origin: "*" 
  } 
});

app.set("view engine", "pug");
app.use("/assets", express.static("assets"));

let object = {};
app.get("/", (req, res) => {
  // parseRSSFeed();

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

  const arr = Object.entries(importantNews)
  const arrRess = arr.slice(arr.length - 6, arr.length)
  const slicedObj = Object.fromEntries(arrRess)

  
//               --------------- Pagination ---------------
// ========================== DO NOT TOUCH THIS ================================
  const newsPerPage = 20;

  let objLength = Math.round(Object.keys(object).length / newsPerPage);

  let objectToPass = JSON.stringify({ length: objLength });
  function writeObjectLength() {
    fs.writeFile("./assets/additional_data/newsCount.json", objectToPass, (err) => {
      if(err) throw err;
      console.log("Success");
    })
  }
  checkFile("./assets/additional_data/newsCount.json", writeObjectLength());
  
  
  let newObj = [];
  let objectAsArr = Object.entries(object);  
  let objArr = objectAsArr.map(arr => arr.pop());

  let startingSliceCount = 0;
  let endSliceCount = newsPerPage;

  for(let i = 1; i <= objLength; i++) {
    let arr = objArr.slice(startingSliceCount, endSliceCount);
    startingSliceCount += newsPerPage;
    endSliceCount += newsPerPage;
    newObj.push(arr);
  }

  for(let i = 1; i <= objLength; i++) {
    app.get(`/:page=${i}`, async(req, res) => {
      res.render("pages", { 
        object: newObj, 
        pageCount: i
      });
    })
  }

  res.render("index", { object: newObj[0], slicedObj });
//==============================================================================
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
  res.render("add_news");
});

app.get("/girchi_news", (req, res) => {
  let object = {};

  let response = JSON.parse(
    fs.readFileSync(`./assets/data/girchi.json`, "utf-8")
  );

  Object.assign(object, response);
  res.render("girchi_news", { object });
});
app.get("/important_news", (req, res) => {
  let object = {};

  let response = JSON.parse(
    fs.readFileSync(`./assets/data/important.json`, "utf-8")
  );

  Object.assign(object, response);
  res.render("important_news", { object });
});

// Add news section
app.post("/add_news", urlencodedParser, (req, res) => {
  const url = req.body.link;
  let source;
  let sourceImgUrl;
  if (url.includes("https://on.ge")) {
    source = "on";
    sourceImgUrl = "http://gip.ge/wp-content/uploads/2017/10/apple-touch-icon.png";
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

function callTheFunctions() {
  automateOn();
  automateImedi();
  automateFormula();
  automateMtavari();
  automateTabula();
  automatePalitra();
  automateIpn();
}

// In case if we want to change it, there are hours in milliseconds
let oneHour = 3600000;
let halfAnHour = 1800000;
let hourAndHalf = 5400000;

// Update the news in every 1 hour
setInterval(callTheFunctions, oneHour);

