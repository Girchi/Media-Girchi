// Node modules
import express from 'express';
import {
  dirname
} from "path";
import {
  fileURLToPath
} from "url";
import fs from 'fs';
import bodyParser from 'body-parser';
import Parser from 'rss-parser';



// JS Components
import scrapTabula from './assets/components/scrapTabula.js';
import scrapOn from './assets/components/scrapOn.js';
import scrapFormula from './assets/components/scrapFormula.js';
import scrapPalitraNews from './assets/components/scrapPalitraNews.js';
import scrapMtavari from './assets/components/scrapMtavari.js';
import scrapImedi from './assets/components/scrapImedi.js';


const app = express();
const __filename = fileURLToPath(
  import.meta.url);
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
      res.render(__dirname + "/views/index", {
        object
      })
    });
  })
}
// Display news from every JSON file
postSourcesArr.forEach(source => readFileToDisplayNews(source));


const urlencodedParser = bodyParser.urlencoded({
  extended: false
});
app.get("/add_news", (req, res) => {
  res.render(__dirname + "/views/add_news")
});

// Add news section
app.post("/add_news", urlencodedParser, (req, res) => {
  const url = req.body.link;
  let source;
  let sourceImgUrl;
  if (url.includes('https://on.ge')) {
    source = 'on';
    sourceImgUrl = 'http://gip.ge/wp-content/uploads/2017/10/apple-touch-icon.png'
  }
  if (url.includes('https://tabula.ge')) {
    source = 'tabula'
    sourceImgUrl = 'https://upload.wikimedia.org/wikipedia/ka/c/c0/Tabula_logo.png'
  }
  if (url.includes('https://formulanews.ge')) {
    source = 'formula'
    sourceImgUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/TV_Formula_-_Official_Logo.png'
  }
  if (url.includes('https://palitranews.ge')) {
    source = 'palitranews'
    sourceImgUrl = 'https://www.tdi.ge/sites/default/files/tv_palitra_1.jpg'
  }
  if (url.includes('https://mtavari.tv')) {
    source = 'mtavari'
    sourceImgUrl = 'https://www.televizia.org/img/tv_mtavariarxi.png'
  }
  if (url.includes('https://imedinews.ge')) {
    source = 'imedi'
    sourceImgUrl = 'https://www.imedi.ge/m/i/logo@2x.png'
  }
  const accept = req.body.accept;

  switch (source) {
    case "tabula":
      scrapTabula(url, accept, sourceImgUrl);
      res.render('add_news');
      break;

    case "on":
      scrapOn(url, accept, sourceImgUrl);
      res.render('add_news');
      break;

    case "formula":
      scrapFormula(url, accept, sourceImgUrl);
      res.render('add_news');
      break;

    case "palitranews":
      scrapPalitraNews(url, accept, sourceImgUrl);
      res.render('add_news');
      break;

    case "mtavari":
      scrapMtavari(url, accept, sourceImgUrl);
      res.render('add_news');
      break;

    case "imedi":
      scrapImedi(url, accept, sourceImgUrl);
      res.render('add_news');
      break;
  }
});




const parser = new Parser();

// Parsing RSS Feed 



let array = [{
    creator: 'გირჩი • Girchi',
    title: '🗣 შეიძლება ქართულმა ოცნებამ ნაციონალური მოძრაობის წინააღმდეგ რამე მოიფიქროს, რასაც არ მივესალმები, მინდა კონსტიტუციური...',
    link: 'https://www.facebook.com/GirchiParty/posts/4699425670108855',
    pubDate: 'Mon, 09 Aug 2021 10:53:15 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t15.5256-10/p280x280/233652011_316227786915902_6708483366002751839_n.jpg?_nc_cat=105&ccb=1-4&_nc_sid=08861d&_nc_ohc=gLbc9m3mo9IAX-UowhW&_nc_ht=scontent.fcxh2-1.fna&oh=cc00ce321ec23bd37bf3d755ccac454e&oe=611555F0" style="width: 100%;"><div>🗣 შეიძლება ქართულმა ოცნებამ ნაციონალური მოძრაობის წინააღმდეგ რამე მოიფიქროს, რასაც არ მივესალმები, მინდა კონსტიტუციური ცვლილებები ბოლომდე მივიდეს</div></div>',
    contentSnippet: '🗣 შეიძლება ქართულმა ოცნებამ ნაციონალური მოძრაობის წინააღმდეგ რამე მოიფიქროს, რასაც არ მივესალმები, მინდა კონსტიტუციური ცვლილებები ბოლომდე მივიდეს',
    guid: '5a4b95361d8fe4715b638861d0c91035',
    isoDate: '2021-08-09T10:53:15.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: 'დაუჯერებელი ამბები - ვახო მეგრელიშვილი, თეკლა მებურიშვილი, სალომე ნასყიდაშვილი',
    link: 'https://www.facebook.com/GirchiParty/videos/375898443947810/',
    pubDate: 'Mon, 09 Aug 2021 08:02:21 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t15.5256-10/p280x280/232890494_375910030613318_615280146755835100_n.jpg?_nc_cat=101&ccb=1-4&_nc_sid=08861d&_nc_ohc=TCUAlRLxGbwAX8gQt6k&_nc_ht=scontent.fcxh2-1.fna&oh=8cde4ab861f5b34526cf26a716a9174e&oe=61170B15" style="width: 100%;"><div>დაუჯერებელი ამბები - ვახო მეგრელიშვილი, თეკლა მებურიშვილი, სალომე ნასყიდაშვილი</div></div>',
    contentSnippet: 'დაუჯერებელი ამბები - ვახო მეგრელიშვილი, თეკლა მებურიშვილი, სალომე ნასყიდაშვილი',
    guid: '3e4af7717db7cac42cb8393291834b3f',
    isoDate: '2021-08-09T08:02:21.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: 'როცა ადამიანებს შეუზღუდავი ძალაუფლება აქვთ და ხვდებიან, რომ შეიძლება მთლიანად დაკარგონ ან ვინმესთან უნდა ითანამშრომლონ,...',
    link: 'https://www.facebook.com/GirchiParty/posts/4693730834011672',
    pubDate: 'Sat, 07 Aug 2021 16:30:09 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t1.6435-9/p526x296/232491693_4693725234012232_8551989458942066659_n.jpg?_nc_cat=111&ccb=1-4&_nc_sid=8024bb&_nc_ohc=eTF4rmO6jl0AX--w7Lm&_nc_ht=scontent.fcxh2-1.fna&oh=b770a320a48e6f57e5a19e6efdbe5649&oe=6134DA7C" style="width: 100%;"><div>როცა ადამიანებს შეუზღუდავი ძალაუფლება აქვთ და ხვდებიან, რომ შეიძლება მთლიანად დაკარგონ ან ვინმესთან უნდა ითანამშრომლონ, განსხვავებული სტიმულები აქვთ - Iago Khvichia</div></div>',
    contentSnippet: 'როცა ადამიანებს შეუზღუდავი ძალაუფლება აქვთ და ხვდებიან, რომ შეიძლება მთლიანად დაკარგონ ან ვინმესთან უნდა ითანამშრომლონ, განსხვავებული სტიმულები აქვთ - Iago Khvichia',
    guid: 'ec3ad95b1194b9daa1ead52669775e56',
    isoDate: '2021-08-07T16:30:09.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: '🗣 რაც მეტს ილაპარაკებს გახარია, ნაკლები რეიტინგი ექნება',
    link: 'https://www.facebook.com/GirchiParty/posts/4693692034015552',
    pubDate: 'Sat, 07 Aug 2021 15:30:00 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t15.5256-10/p280x280/233193804_558135881981908_7718198651034677706_n.jpg?_nc_cat=108&ccb=1-4&_nc_sid=08861d&_nc_ohc=0vZe_qx16RsAX9Hn4d6&_nc_ht=scontent.fcxh2-1.fna&oh=cc53766d25aa809400702fb1978c939b&oe=6116A051" style="width: 100%;"><div>🗣 რაც მეტს ილაპარაკებს გახარია, ნაკლები რეიტინგი ექნება</div></div>',
    contentSnippet: '🗣 რაც მეტს ილაპარაკებს გახარია, ნაკლები რეიტინგი ექნება',
    guid: 'f446261c75a9f556d13433e57b791ce7',
    isoDate: '2021-08-07T15:30:00.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: 'გირჩი ',
    link: 'https://www.facebook.com/GirchiParty/posts/4693826624002093',
    pubDate: 'Sat, 07 Aug 2021 14:50:47 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fcxh2-1.fna.fbcdn.net/v/t1.6435-9/p526x296/231349154_4693818130669609_8663348425733192767_n.jpg?_nc_cat=110&ccb=1-4&_nc_sid=8024bb&_nc_ohc=7uoTplSGndIAX_sNXME&_nc_ht=scontent.fcxh2-1.fna&oh=ec10e05dd3b5d36fa01b36edfecf3d34&oe=61350B9C" style="width: 100%;"></div>',
    contentSnippet: '',
    guid: '6e3f7cc4ce8e35b7fd1b5f022b53c28d',
    isoDate: '2021-08-07T14:50:47.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: '🗣 ქოცები ადგილს გვინახავენ ოპოზიციას',
    link: 'https://www.facebook.com/GirchiParty/posts/4693620777356011',
    pubDate: 'Sat, 07 Aug 2021 14:00:01 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.flap2-1.fna.fbcdn.net/v/t15.5256-10/p280x280/221725212_375858310776114_7202935540783617565_n.jpg?_nc_cat=109&ccb=1-4&_nc_sid=08861d&_nc_ohc=Cz4f77P1Yl8AX98j-cy&_nc_ht=scontent.flap2-1.fna&oh=f0cefa9c8ae1715ac0b7c0f880336ff3&oe=6115F79E" style="width: 100%;"><div>🗣 ქოცები ადგილს გვინახავენ ოპოზიციას</div></div>',
    contentSnippet: '🗣 ქოცები ადგილს გვინახავენ ოპოზიციას',
    guid: 'fdfe68419099a0d101da16f26a316910',
    isoDate: '2021-08-07T14:00:01.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: '🗣 გვინდა რასაც ადრე მხოლოდ თბილისში ვლაპარაკობდით, ისმოდეს ყველა საკრებულოდან',
    link: 'https://www.facebook.com/GirchiParty/posts/4693474864037269',
    pubDate: 'Sat, 07 Aug 2021 12:07:42 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fsyd7-1.fna.fbcdn.net/v/t15.5256-10/p280x280/233337927_543051446846973_1235703020111065872_n.jpg?_nc_cat=104&ccb=1-4&_nc_sid=08861d&_nc_ohc=-XnaZOd1iO8AX_q3C6Z&_nc_ht=scontent.fsyd7-1.fna&oh=6d48d30d62ac31e2ee01af57b70a5fa9&oe=6114E4F8" style="width: 100%;"><div>🗣 გვინდა რასაც ადრე მხოლოდ თბილისში ვლაპარაკობდით, ისმოდეს ყველა საკრებულოდან</div></div>',
    contentSnippet: '🗣 გვინდა რასაც ადრე მხოლოდ თბილისში ვლაპარაკობდით, ისმოდეს ყველა საკრებულოდან',
    guid: '9386a170c1f52c7f388a7e1e236957e5',
    isoDate: '2021-08-07T12:07:42.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: 'შემოგვიერთდით გირჩის თბილისის კანდიდატების ZoomდაZoom-ში: https://zoom.us/j/95190558037… 🔻ჰერმან საბო 🔻როლანდი ნაჭყები...',
    link: 'https://www.facebook.com/GirchiParty/posts/4691371567580932',
    pubDate: 'Fri, 06 Aug 2021 18:13:40 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div>შემოგვიერთდით გირჩის თბილისის კანდიდატების ZoomდაZoom-ში: https://zoom.us/j/95190558037… 🔻ჰერმან საბო 🔻როლანდი ნაჭყებია 🔻ოთო ზაკალაშვილიშემოგვიერთდით Zoom - ში: https://zoom.us/j/95190558037… 📣 დღეს, 22:00 საათზე, შემოგვიერთდით ZoomდაZoom - ში და გაიცანით გირჩის თბილისის კანდიდატები: - ჰერმან სა...ბო - როლანდ ნაჭყებია - ოთო ზაკალაშვილი</div>',
    contentSnippet: 'შემოგვიერთდით გირჩის თბილისის კანდიდატების ZoomდაZoom-ში: https://zoom.us/j/95190558037… 🔻ჰერმან საბო 🔻როლანდი ნაჭყებია 🔻ოთო ზაკალაშვილიშემოგვიერთდით Zoom - ში: https://zoom.us/j/95190558037… 📣 დღეს, 22:00 საათზე, შემოგვიერთდით ZoomდაZoom - ში და გაიცანით გირჩის თბილისის კანდიდატები: - ჰერმან სა...ბო - როლანდ ნაჭყებია - ოთო ზაკალაშვილი',
    guid: '05d87e326f2e3683e4c1a98c9c455a5d',
    isoDate: '2021-08-06T18:13:40.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: 'პროცესი პარლამენტში - სტუმრები: ლევან იოსელიანი, ვახო მეგრელიშვილი',
    link: 'https://www.facebook.com/GirchiParty/videos/842708273034872/',
    pubDate: 'Fri, 06 Aug 2021 13:00:04 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fmel14-1.fna.fbcdn.net/v/t15.5256-10/p280x280/230675934_842713169701049_6664610211623131596_n.jpg?_nc_cat=111&ccb=1-4&_nc_sid=08861d&_nc_ohc=O_BY47-YOsIAX9eAwmM&_nc_ht=scontent.fmel14-1.fna&oh=ad16abc5e9a9f9fdd72b8b111cf7bcd1&oe=6112A7A8" style="width: 100%;"><div>პროცესი პარლამენტში - სტუმრები: ლევან იოსელიანი, ვახო მეგრელიშვილი</div></div>',
    contentSnippet: 'პროცესი პარლამენტში - სტუმრები: ლევან იოსელიანი, ვახო მეგრელიშვილი',
    guid: 'f2bc1a0a034303febc5d19ea59c6b00e',
    isoDate: '2021-08-06T13:00:04.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: '🗣თუ ქართული ოცნება 43%-ს ვერ მიიღებს არჩევნებში, პოლიტიკურად წააგებს',
    link: 'https://www.facebook.com/GirchiParty/posts/4690212304363525',
    pubDate: 'Fri, 06 Aug 2021 10:21:59 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent-dfw5-2.xx.fbcdn.net/v/t15.5256-10/p280x280/229605425_1003805533688568_2811661645530320252_n.jpg?_nc_cat=108&ccb=1-4&_nc_sid=08861d&_nc_ohc=TVNHNtekR40AX89brCB&_nc_ht=scontent-dfw5-2.xx&oh=1eb33f44c3d49d5476adce0c83126f9b&oe=6112C48B" style="width: 100%;"><div>🗣თუ ქართული ოცნება 43%-ს ვერ მიიღებს არჩევნებში, პოლიტიკურად წააგებს</div></div>',
    contentSnippet: '🗣თუ ქართული ოცნება 43%-ს ვერ მიიღებს არჩევნებში, პოლიტიკურად წააგებს',
    guid: '51b3d0935f630d580a624f28bcd0b893',
    isoDate: '2021-08-06T10:21:59.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: 'გირჩი ',
    link: 'https://www.facebook.com/events/890908881769508/',
    pubDate: 'Fri, 06 Aug 2021 08:09:09 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent-yyz1-1.xx.fbcdn.net/v/t1.6435-9/p261x260/231520673_4689928537725235_4895594836024964667_n.jpg?_nc_cat=102&ccb=1-4&_nc_sid=b386c4&_nc_ohc=PL8ndKB7u-0AX-P9Zrd&_nc_ht=scontent-yyz1-1.xx&oh=b14551a3d30fc794ba1422811ae9ff8d&oe=6132526A" style="width: 100%;"></div>',
    contentSnippet: '',
    guid: 'cd89d7c3848065cac168fce29c44eb44',
    isoDate: '2021-08-06T08:09:09.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: 'დაუჯერებელი ამებები - ვახო მეგრელიშვილი, სანდრო რაქვიაშვილი, იაგო ხვიაჩია',
    link: 'https://www.facebook.com/GirchiParty/videos/340553497776363/',
    pubDate: 'Fri, 06 Aug 2021 08:06:56 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fybz2-1.fna.fbcdn.net/v/t15.5256-10/p280x280/221764024_340554441109602_828367358366996152_n.jpg?_nc_cat=109&ccb=1-4&_nc_sid=08861d&_nc_ohc=5XZuamHqhCMAX9arw_9&_nc_ht=scontent.fybz2-1.fna&oh=f96f3323b8c88d9e5418af045b5daf3a&oe=61133987" style="width: 100%;"><div>დაუჯერებელი ამებები - ვახო მეგრელიშვილი, სანდრო რაქვიაშვილი, იაგო ხვიაჩია</div></div>',
    contentSnippet: 'დაუჯერებელი ამებები - ვახო მეგრელიშვილი, სანდრო რაქვიაშვილი, იაგო ხვიაჩია',
    guid: '7ef4f0f264bdd421f4c3538b4b72284b',
    isoDate: '2021-08-06T08:06:56.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: '2021 წლის 2 ოქტომბრის ადგილობრივი თვითმმართველობის არჩევნებისთვის გირჩი ოფიციალურად დარეგისტრირდა ცესკოში! ბიულეტენებში...',
    link: 'https://www.facebook.com/GirchiParty/posts/4688013741250048',
    pubDate: 'Thu, 05 Aug 2021 17:13:46 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fyto1-2.fna.fbcdn.net/v/t1.6435-9/p480x480/232609589_4687972354587520_8846552829471579574_n.jpg?_nc_cat=101&ccb=1-4&_nc_sid=8024bb&_nc_ohc=DnDViVUVFVIAX-DU9KF&_nc_ht=scontent.fyto1-2.fna&oh=11540ab9219a758d4455bea867bfd9d8&oe=613261D4" style="width: 100%;"><div>2021 წლის 2 ოქტომბრის ადგილობრივი თვითმმართველობის არჩევნებისთვის გირჩი ოფიციალურად დარეგისტრირდა ცესკოში! ბიულეტენებში 36-ის გასწვრივ გვიპოვით ^_^ #მეტითავისუფლება და #მეტიპასუხისმგებლობა საკრებულოებში!</div></div>',
    contentSnippet: '2021 წლის 2 ოქტომბრის ადგილობრივი თვითმმართველობის არჩევნებისთვის გირჩი ოფიციალურად დარეგისტრირდა ცესკოში! ბიულეტენებში 36-ის გასწვრივ გვიპოვით ^_^ #მეტითავისუფლება და #მეტიპასუხისმგებლობა საკრებულოებში!',
    guid: 'eef38681394a9aef928f9a7637859756',
    isoDate: '2021-08-05T17:13:46.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: '📣 6 აგვისტოს, 22:00 საათზე, Hermann Szabó-ს, Oto Zakalashvili-სა და Rolandi Nachkebia-ს, გირჩის კანდიდატების თბილისში,...',
    link: 'https://www.facebook.com/GirchiParty/posts/4687571221294300',
    pubDate: 'Thu, 05 Aug 2021 16:00:43 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent-yyz1-1.xx.fbcdn.net/v/t1.6435-9/p526x296/232345446_4687524414632314_6698364701098302890_n.png?_nc_cat=104&ccb=1-4&_nc_sid=8024bb&_nc_ohc=OdmTEqWsXEwAX856mKU&_nc_oc=AQkhfDjbzslsv6_nPoKrsz_VuMNlocErimESJ4-EopeLfs5mTpiSumY1uSgjE5QfuJY&_nc_ht=scontent-yyz1-1.xx&oh=fc2128ffa8e9ac8224c665c25f068297&oe=61317CE7" style="width: 100%;"><div>📣 6 აგვისტოს, 22:00 საათზე, Hermann Szabó-ს, Oto Zakalashvili-სა და Rolandi Nachkebia-ს, გირჩის კანდიდატების თბილისში, ZoomდაZoom-ი!</div></div>',
    contentSnippet: '📣 6 აგვისტოს, 22:00 საათზე, Hermann Szabó-ს, Oto Zakalashvili-სა და Rolandi Nachkebia-ს, გირჩის კანდიდატების თბილისში, ZoomდაZoom-ი!',
    guid: 'ee8261949ca69976f414308111a23f38',
    isoDate: '2021-08-05T16:00:43.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: 'ეკონომიკა პარლამენტარისთვის (შესავალი) - სანდრო რაქვიაშვილი, იაგო ხვიჩია',
    link: 'https://www.facebook.com/GirchiParty/videos/1018882982212589/',
    pubDate: 'Thu, 05 Aug 2021 13:00:02 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fcjs4-1.fna.fbcdn.net/v/t15.5256-10/p280x280/217968095_1018888432212044_4289704766550178036_n.jpg?_nc_cat=109&ccb=1-4&_nc_sid=08861d&_nc_ohc=X0NMnekAQg0AX8D3KLc&_nc_ht=scontent.fcjs4-1.fna&oh=9bcf44b2302041851d16bc842edbc9bf&oe=61120BAE" style="width: 100%;"><div>ეკონომიკა პარლამენტარისთვის (შესავალი) - სანდრო რაქვიაშვილი, იაგო ხვიჩია</div></div>',
    contentSnippet: 'ეკონომიკა პარლამენტარისთვის (შესავალი) - სანდრო რაქვიაშვილი, იაგო ხვიჩია',
    guid: '83898837845e3352ac71216cd1d06cc1',
    isoDate: '2021-08-05T13:00:02.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: '🎬 დღეს, 5 აგვისტოს, 17:00 საათზე, გირჩის ახალი გადაცემა "ეკონომიკა პარლამენტარისთვის" ალექსანდრე რაქვიაშვილთან და იაგო...',
    link: 'https://www.facebook.com/GirchiParty/posts/4687248877993201',
    pubDate: 'Thu, 05 Aug 2021 11:51:39 GMT',
    'dc:creator': 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fmel12-1.fna.fbcdn.net/v/t15.5256-10/p280x280/231746297_600727380917744_4516383545095028456_n.jpg?_nc_cat=104&ccb=1-4&_nc_sid=08861d&_nc_ohc=wNT8biSzvvwAX-c0cHE&_nc_ht=scontent.fmel12-1.fna&oh=cba68139dc0969d98b733355cfbc0b56&oe=61124BCC" style="width: 100%;"><div>🎬 დღეს, 5 აგვისტოს, 17:00 საათზე, გირჩის ახალი გადაცემა "ეკონომიკა პარლამენტარისთვის" ალექსანდრე რაქვიაშვილთან და იაგო ხვიჩიასთან ერთად</div></div>',
    contentSnippet: '🎬 დღეს, 5 აგვისტოს, 17:00 საათზე, გირჩის ახალი გადაცემა "ეკონომიკა პარლამენტარისთვის" ალექსანდრე რაქვიაშვილთან და იაგო ხვიჩიასთან ერთად',
    guid: '3bca1565ee30609a5baf0f1448cf84e0',
    isoDate: '2021-08-05T11:51:39.000Z'
  },
  {
    creator: 'გირჩი • Girchi',
    title: '🗣ძალიან ხშირად ვაჩვენებთ ჩვენს პარტნიორებს, რომ არც კი გვაქვს სურვილი ევროპელები გავხდეთ',
    link: 'https://www.facebook.com/GirchiParty/posts/4686912974693458',
    pubDate: 'Thu, 05 Aug 2021 10:00:05 GMT',
    creator: 'გირჩი • Girchi',
    content: '<div><img src="https://scontent.fmel12-1.fna.fbcdn.net/v/t15.5256-10/p280x280/230865193_1752572898258912_5899153170241489118_n.jpg?_nc_cat=101&ccb=1-4&_nc_sid=08861d&_nc_ohc=xKcFwHfdQMQAX-d3nxf&_nc_ht=scontent.fmel12-1.fna&oh=1ae4cac01ff6e0a7d1dd29bcd0bbdfbb&oe=611240B2" style="width: 100%;"><div>🗣ძალიან ხშირად ვაჩვენებთ ჩვენს პარტნიორებს, რომ არც კი გვაქვს სურვილი ევროპელები გავხდეთ</div></div>',
    contentSnippet: '🗣ძალიან ხშირად ვაჩვენებთ ჩვენს პარტნიორებს, რომ არც კი გვაქვს სურვილი ევროპელები გავხდეთ',
    guid: '91764d8264e97650e8b2872ca29f8f13',
    isoDate: '2021-08-05T10:00:05.000Z'
  }
]



let globalArr = [];
// function parseRSSFeed() {
//     // const feed = await parser.parseURL('https://rss.app/feeds/E4cHtYWoUj4jesXG.xml');
//     // feed.items.forEach(item => globalArr.push(item));

//     array.forEach(obj => {
//         // console.log(obj.title);
//         fs.readFile('./assets/data/fb.json', (err, data) => {
//         if (err) throw err;
//         let newsData = JSON.parse(data);
//         newsData[obj.link] = {
//             ...newsData[obj.link],
//             link: obj.link,
//             title: obj.title,
//             text: obj.contentSnippet,
//             articleDate: obj.pubDate,
//             content: obj.content
//         };

//         fbPostCounter += 1;
//         newsData = JSON.stringify(newsData)
//         console.log(newsData);
//         fs.writeFileSync("./assets/data/fb.json", newsData, (error) => {
//             if (error) console.log(error)
//             console.log('success');
//         })

//         })
//     })

// };

// parseRSSFeed();

// async function writeTheData() {
//   const feed = await parser.parseURL('https://rss.app/feeds/E4cHtYWoUj4jesXG.xml');
//   fs.readFile('./assets/data/fb.json', (err, data) => {
//     if (err) throw err;

//     const newsData = JSON.parse(data);
//     console.log(newsData);

//     for(const obj of feed.items) {
//       newsData.push({
//         ...newsData,
//         link: obj.link,
//         title: obj.title,
//         text: obj.contentSnippet,
//         articleDate: obj.pubDate,
//         content: obj.content
//       })
//     }

//     const passableObject = JSON.stringify({ newsData });
//     // newsData = JSON.stringify(newsData)

//     console.log(typeof newsData);
//     fs.writeFile("./assets/data/fb.json", passableObject, (error) => {
//       if (error) console.log(error)
//       console.log('success');
//     })
//   })
// }


// writeTheData();
