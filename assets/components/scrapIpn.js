const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");

function scrapIpn(url, accept, accept1, sourceImgUrl) {
  try {
    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const title = $("*[itemprop='name']").first().text();
        const dataInfo = $("time").first().text();
        const text = $("*[itemprop='description']").text();
        const imgUrl = $("*[itemprop='image']").attr("data-src");

        if (accept === "on" && accept1 === "on") {
          fs.readFile("./assets/data/girchi.json", (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "IPN",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
              fileName: "ipn.json",
              important: false,
            };
            newsData = JSON.stringify(newsData);
            fs.writeFileSync("./assets/data/girchi.json", newsData, (error) => {
              if (error) console.log(error);
            });
          });
          fs.readFile("./assets/data/important.json", (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "IPN",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
              fileName: "ipn.json",
              important: false,
            };
            newsData = JSON.stringify(newsData);
            fs.writeFileSync(
              "./assets/data/important.json",
              newsData,
              (error) => {
                if (error) console.log(error);
              }
            );
          });
          fs.readFile("./assets/data/ipn.json", (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "IPN",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
              fileName: "ipn.json",
              important: false,
            };
            newsData = JSON.stringify(newsData);
            fs.writeFileSync("./assets/data/ipn.json", newsData, (error) => {
              if (error) console.log(error);
            });
          });
        } else if (accept === "on") {
          fs.readFile("./assets/data/important.json", (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "IPN",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
              fileName: "ipn.json",
              important: false,
            };
            newsData = JSON.stringify(newsData);
            fs.writeFileSync(
              "./assets/data/important.json",
              newsData,
              (error) => {
                if (error) console.log(error);
              }
            );
          });
          fs.readFile("./assets/data/ipn.json", (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "IPN",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
              fileName: "ipn.json",
              important: false,
            };
            newsData = JSON.stringify(newsData);
            fs.writeFileSync("./assets/data/ipn.json", newsData, (error) => {
              if (error) console.log(error);
            });
          });
        } else if (accept1 === "on") {
          fs.readFile("./assets/data/girchi.json", (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "IPN",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
              fileName: "ipn.json",
              important: false,
            };
            newsData = JSON.stringify(newsData);
            fs.writeFileSync("./assets/data/girchi.json", newsData, (error) => {
              if (error) console.log(error);
            });
          });
          fs.readFile("./assets/data/ipn.json", (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "IPN",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
              fileName: "ipn.json",
              important: false,
            };
            newsData = JSON.stringify(newsData);
            fs.writeFileSync("./assets/data/ipn.json", newsData, (error) => {
              if (error) console.log(error);
            });
          });
        } else {
          fs.readFile("./assets/data/ipn.json", (err, data) => {
            if (err) throw err;
            let newsData = JSON.parse(data);
            newsData[dataInfo] = {
              ...newsData[dataInfo],
              source: "IPN",
              title: title,
              text: text,
              link: url,
              logo: sourceImgUrl,
              articleDate: dataInfo,
              imgUrl: imgUrl,
              fileName: "ipn.json",
              important: false,
            };
            newsData = JSON.stringify(newsData);
            fs.writeFileSync("./assets/data/ipn.json", newsData, (error) => {
              if (error) console.log(error);
            });
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = scrapIpn;
