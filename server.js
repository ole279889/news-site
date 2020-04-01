const express = require('express');
const cors = require('cors')
const webPush = require('web-push');
const bodyParser = require('body-parser');
var fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const publicVapidKey = 'BDqsXGOcgoovaVzcTJfecn-QkMg0nt4y4MfYEZG6S4Wo_erPGrNMt19X_N_1ZfAdgTMrN-XeOYySNxFBTM1sNUM';
const privateVapidKey = 'zuIk_uvlAfMWo7DD6AY4gnHSBN6p03rHGOLwtEMIWyk';

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

var _news = [];
fs.readFile( __dirname + '/db.json', 'utf8', function (err, data) {
  _news = data;
});

var USER_SUBSCRIPTIONS = [];

function newsIDMax() {
  var news = JSON.parse(_news);
  return news.reduce(function (p, v) {
    return ( p.id > v.id ? p.id : v.id );
  });
}

app.post('/notifications', function (req, res) {
  const sub = req.body.notification;
  console.log('Received Subscription on the server: ', sub);
  if (USER_SUBSCRIPTIONS
    .findIndex(_sub => _sub.endpoint === sub.endpoint
    && _sub.keys.p256dh === sub.keys.p256dh
    && _sub.keys.auth === sub.keys.auth) === -1) {
    USER_SUBSCRIPTIONS.push(sub);
  }
  res.status(200).json({message: 'Subscription added successfully.'});
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
  const _id = newsIDMax() + 1;
  var newsItem = {
    'id': _id,
    'preview'  : req.body.preview,
    'shortDescription'  : req.body.shortDescription,
    'fullDescription' : req.body.fullDescription,
  };
  news.push(newsItem);
  _news = JSON.stringify(news);
  const notificationPayload = {
    notification: {
      title: 'News!',
      body: `New news article added: ${req.body.preview} - click to show`,
      icon: 'assets/images/icons/notification.png',
      vibrate: [100, 50, 100],
      data: {
        url: `http://localhost:8080/#/news-detail/${_id}`
      }
    }
  };
  Promise.all(USER_SUBSCRIPTIONS.map(sub => webPush.sendNotification(sub, JSON.stringify(notificationPayload))))
    .then(() => console.log('Notifications sent successfully.'))
    .catch(err => {
      console.error('Error sending notification, reason: ', err);
    });
  res.end();
});

app.set('port', 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
