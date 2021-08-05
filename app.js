import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs  from'fs';
import fetch from 'node-fetch';
import request  from 'request'
import cheerio from'cheerio'


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("view engine", "pug");
app.use("/assets", express.static("assets"));

const host = '127.0.0.1';
const port = 3000;
app.listen(port, host, () => console.log(`Server running at http://${host}:${port}/\n`));


request('https://imedinews.ge/ge/politika/212979/iago-khvichia-saertashoriso-partniorebs-qveknistvis-sanqtsiebis-datsesebisken-ar-movutsodebt',(error,response,html)=>{
    if(!error && response.statusCode ==200){
        const $ = cheerio.load(html);

        const siteHeading=$('.detail-wrap')

        const dataInfo=$('.dateandsource').children('span').first().text();
        const title = siteHeading.find('h1').text();
        const text = siteHeading.find('p').text();
        const imgUrl = siteHeading.find('img').attr("src");

        let obj = JSON.stringify({
            title: title,
            text: text,
            dataInfo: dataInfo,
            imgUrl: imgUrl
        });

        fs.writeFileSync('./assets/data/data.json', obj, (err) => {
            if(err) throw err;

            console.log("Success");
        })
    }
})


const fullHostName = "http://127.0.0.1:3000";
async function fetchData() {
    const response = await fetch(`${fullHostName}/assets/data/data.json`);
    const result = await response.json();

    console.log(result.imgUrl)    
    app.get("/", (req, res) => {
        res.render(__dirname + "/views/index",{result});
    })


}
fetchData();


