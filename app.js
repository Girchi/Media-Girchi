import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs  from'fs';
import fetch from 'node-fetch';
import request  from 'request';
import cheerio from'cheerio';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("view engine", "pug");
app.use("/assets", express.static("assets"));


const host = '127.0.0.1';
const port = 3000;
app.listen(port, host, () => console.log(`Server running at http://${host}:${port}/\n`));


let indexCounter = 0;
request('https://imedinews.ge/ge/politika/212979/iago-khvichia-saertashoriso-partniorebs-qveknistvis-sanqtsiebis-datsesebisken-ar-movutsodebt',(error,response,html)=>{
    if(!error && response.statusCode ==200){
        const $ = cheerio.load(html);

        const siteHeading=$('.detail-wrap')

        const dataInfo = $('.dateandsource').children('span').first().text();
        const title = siteHeading.find('h1').text();
        const text = siteHeading.find('p').text();
        const imgUrl = siteHeading.find('img').attr("src");

        let obj = JSON.stringify({
            title: title,
            id: indexCounter,
            text: text,
            articleDate: dataInfo,
            imgUrl: imgUrl
        });

        fs.writeFileSync('./assets/data/data.json', obj, (err) => {
            if(err) throw err;
            console.log("Success");
            indexCounter += 1;
        })
    }    
});

const fullHostName = "http://127.0.0.1:3000";
async function fetchData() {
    const response = await fetch(`${fullHostName}/assets/data/data.json`);
    const result = await response.json();

    request('https://on.ge/story/84484-%E1%83%9B%E1%83%AF%E1%83%94%E1%83%A0%E1%83%90-%E1%83%A0%E1%83%9D%E1%83%9B-%E1%83%9E%E1%83%9D%E1%83%9A%E1%83%98%E1%83%AA%E1%83%98%E1%83%90-%E1%83%A8%E1%83%94%E1%83%AB%E1%83%9A%E1%83%94%E1%83%91%E1%83%A1-%E1%83%AC%E1%83%94%E1%83%A1%E1%83%A0%E1%83%98%E1%83%92%E1%83%98%E1%83%A1-%E1%83%A3%E1%83%96%E1%83%A0%E1%83%A3%E1%83%9C%E1%83%95%E1%83%94%E1%83%9A%E1%83%A7%E1%83%9D%E1%83%A4%E1%83%90%E1%83%A1-%E1%83%AE%E1%83%95%E1%83%98%E1%83%A9%E1%83%98%E1%83%90-%E1%83%A6%E1%83%98%E1%83%A0%E1%83%A1%E1%83%94%E1%83%91%E1%83%98%E1%83%A1-%E1%83%9B%E1%83%90%E1%83%A0%E1%83%A8%E1%83%96%E1%83%94',(error,response,html)=>{
        if(!error && response.statusCode == 200){
            const $ = cheerio.load(html);

            let obj = {};
            obj.title = $('.article-title').html();
            obj.id = indexCounter;
            obj.imgUrl = $('.global-figure-image').attr('src');
            obj.article = $('.global-text-content').text();
            obj.articleDate = $('.onge-date').html();

            const dataToPass = JSON.stringify(obj);

            fs.appendFile('./assets/data/data.json', dataToPass, (err) => {
                if(err) throw err;
                console.log("Success");
                indexCounter += 1;
            })
            

            app.get("/", (req, res) => {
                res.render(__dirname + "/views/index", { 
                    params: {
                        result, 
                        obj
                    } 
                })
            });
        }  
    });
}

fetchData();
