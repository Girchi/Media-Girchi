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
      content: obj.content,
      logo: "./assets/img/icons/facebook.png",
      important: false
    };

    newsData = JSON.stringify(newsData);
    fs.writeFileSync("./assets/data/fb.json", newsData, (error) => {
      if (error) console.log(error)
      console.log("Success");
    });
  } catch (err) {
    throw err
  };
}

export default async function parseRSSFeed() {
  const feed = await parser.parseURL('https://rss.app/feeds/E4cHtYWoUj4jesXG.xml');
  /* 
  * The writeJSON() function wont't work if the file is empty or it doesn't have a curly brackets
  * (for the JSON format), so this function handles this to read the file, and if it is empty it'll write curly braces in it.
  */ 
  fs.readFile('./assets/data/fb.json', (err, data) => {
    if (data.length == 0) {
      fs.writeFile('./assets/data/fb.json', '{}', 'utf-8', (err) => {
        if(err) throw err;
        feed.items.forEach(item => writeJSON(item));
      });
    } else {
      feed.items.forEach(item => writeJSON(item));
    }
  })
};
