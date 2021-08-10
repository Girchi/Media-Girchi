import fs from 'fs';
import Parser from 'rss-parser';


const parser = new Parser();

function writeJSON(obj) {
  try {
    let newsData = JSON.parse(fs.readFileSync('./assets/data/fb.json', 'utf-8'));

    newsData[obj.pubDate] = {
        title: obj.title,
        link: obj.link,
        articleDate: obj.pubDate,
    };
    
    newsData = JSON.stringify(newsData);
    fs.writeFileSync("./assets/data/fb.json", newsData, (error) => {
      if (error) console.log(error)
      console.log("Success");
    });
  } catch(err) { throw err };
}

export default async function parseRSSFeed() {
  const feed = await parser.parseURL('https://rss.app/feeds/E4cHtYWoUj4jesXG.xml');
  feed.items.forEach(item => writeJSON(item));
};
