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
// Display news from every JSON file
postSourcesArr.forEach(source => readFileToDisplayNews(source));


const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.get("/add_news", (req, res) => {
  res.render(__dirname + "/views/add_news")
});

app.post("/add_news", urlencodedParser, (req, res) => {
  const url = req.body.link;
  const source = req.body.source;
  
  switch(source) {
    case "tabula":
        scrapTabula(url);
        res.render('add_news');
        break;

    case "on":
        scrapOn(url);
        res.render('add_news');
        break;

    case "formula":
        scrapFormula(url);
        res.render('add_news');
        break;

    case "palitranews":
        scrapPalitraNews(url);
        res.render('add_news');
        break;

    case "mtavari":
        scrapMtavari(url);
        res.render('add_news');
        break;

    case "imedi":
        scrapImedi(url);  
        res.render('add_news');
        break;
    }
});
