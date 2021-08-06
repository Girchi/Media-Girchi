import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs  from'fs';
import fetch from 'node-fetch';
import request  from 'request'
import cheerio from'cheerio'
import bodyParser from 'body-parser';
import { check,validationResult } from 'express-validator';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("view engine", "pug");
app.use("/assets", express.static("assets"));


const host = '127.0.0.1';
const port = 3000;
app.listen(port, host, () => console.log(`Server running at http://${host}:${port}/\n`));


// request('https://imedinews.ge/ge/politika/212979/iago-khvichia-saertashoriso-partniorebs-qveknistvis-sanqtsiebis-datsesebisken-ar-movutsodebt',(error,response,html)=>{
//     if(!error && response.statusCode ==200){
//         const $ = cheerio.load(html);

//         const siteHeading=$('.detail-wrap')

//         const dataInfo = $('.dateandsource').children('span').first().text();
//         const title = siteHeading.find('h1').text();
//         const text = siteHeading.find('p').text();
//         const imgUrl = siteHeading.find('img').attr("src");

//         fs.readFile('./assets/data/data.json', (err, data) => {
//             if (err) throw err;
//             let newsData = JSON.parse(data);
//             newsData.on={...newsData.on,
//                 title: title,
//                 text: text,
//                 articleDate: dataInfo,
//                 imgUrl: imgUrl
//             };
//             newsData=JSON.stringify(newsData)
//             fs.writeFile("./assets/data/data.json", newsData,(error)=>{
//                 if(error) console.log(error)
//             })
//         });
//     }
// });

const fullHostName = "http://127.0.0.1:3000";
async function fetchData() {
    const response = await fetch(`${fullHostName}/assets/data/data.json`);
    const result = await response.json();
    app.get("/", (req, res) => {
        res.render(__dirname + "/views/index", {
            object:{...result}
        })
    })
}
fetchData();


const urlencodedParser=bodyParser.urlencoded({extended:false})

app.get("/add_news", (req, res) => {
    res.render(__dirname + "/views/add_news")
});
app.post("/add_news",urlencodedParser, (req, res) => {
    // res.json(req.body)
    const url=req.body.link;
    const source=req.body.source
    request(url,(error,response,html)=>{
        if(!error && response.statusCode ==200){
            const $ = cheerio.load(html);

            const siteHeading=$('.detail-wrap')

            const dataInfo = $('.dateandsource').children('span').first().text();
            const title = siteHeading.find('h1').text();
            const text = siteHeading.find('p').text();
            const imgUrl = siteHeading.find('img').attr("src");

            fs.readFile('./assets/data/data.json', (err, data) => {
                if (err) throw err;
                let newsData = JSON.parse(data);
                newsData[source]={...newsData[source],
                    title: title,
                    text: text,
                    articleDate: dataInfo,
                    imgUrl: imgUrl
                };
                newsData=JSON.stringify(newsData)
                fs.writeFile("./assets/data/data.json", newsData,(error)=>{
                    if(error) console.log(error)
                })
            });
    }
    res.render('add_news');
});
});

fetchData(); 
