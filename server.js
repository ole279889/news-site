const express = require('express');
const cors = require('cors')
const webPush = require('web-push');
const bodyParser = require('body-parser');
var fs = require("fs");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const publicVapidKey = 'BDqsXGOcgoovaVzcTJfecn-QkMg0nt4y4MfYEZG6S4Wo_erPGrNMt19X_N_1ZfAdgTMrN-XeOYySNxFBTM1sNUM';
const privateVapidKey = 'zuIk_uvlAfMWo7DD6AY4gnHSBN6p03rHGOLwtEMIWyk';

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

var _news = [];
fs.readFile( __dirname + "/db.json", 'utf8', function (err, data) {
  _news = data;
});

function newsIDMax() {
  var news = JSON.parse(_news);
  return news.reduce(function (p, v) {
    return ( p.id > v.id ? p.id : v.id );
  });
}

app.post('/notifications', (req, res) => {
  const subscription = req.body.notification;
  console.log(`Subscription received`);
  res.status(201).json({});
  const payload = JSON.stringify({
    notification: {
      title: 'Notification',
      body: 'Know how to send notifications through Angular with this article!',
      icon: 'https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png',
      vibrate: [100, 50, 100],
      data: {
        url: 'https://medium.com/@arjenbrandenburgh/angulars-pwa-swpush-and-swupdate-15a7e5c154ac'
      }
    }
  });
  webPush.sendNotification(subscription, payload)
    .catch(error => console.error(error));
});

app.get('/news', function (req, res) {
  res.end( _news );
});

app.get('/news/:id', function (req, res) {
  var news = JSON.parse(_news);
  var newsItem = news.find((item) => item.id.toString() === req.params.id.toString());
  res.end(JSON.stringify(newsItem));
});

app.patch('/news/:id', function (req, res) {
  var news = JSON.parse( _news );
  for (var i = 0; i < news.length; i++) {
    if(news[i].id.toString() === req.params.id.toString()){
      news[i].preview = req.body.preview;
      news[i].shortDescription = req.body.shortDescription;
      news[i].fullDescription = req.body.fullDescription;
    }
  }
  _news = JSON.stringify(news)
  res.end(_news);
});

app.post('/news', function (req, res) {
  var news = JSON.parse( _news );
  var newsItem = {
    "id": newsIDMax() + 1,
    "preview"  : req.body.preview,
    "shortDescription"  : req.body.shortDescription,
    "fullDescription" : req.body.fullDescription,
  };
  news.push(newsItem);
  _news = JSON.stringify(news);
  res.end(JSON.stringify(newsItem));
});

app.set('port', 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
