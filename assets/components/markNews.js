import fs from 'fs';


export default function markNews(obj) {
    fs.readFile('./assets/data/important.json', (err, data) => {
        if (err) throw err;
        let newsData = JSON.parse(obj);
        newsData[obj.articleDate] = {
          ...newsData[obj.articleDate],obj
        };
        newsData = JSON.stringify(newsData)
        fs.writeFileSync("./assets/data/important.json", newsData, (error) => {
          if (error) console.log(error)
        })
      });
}
