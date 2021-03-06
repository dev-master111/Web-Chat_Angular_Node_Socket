import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
//import logger from './api/common/log';
import cors from 'cors';
import bodyParser from 'body-parser';
import { messageSocketStart } from './api/utils/socketManager';

let env = process.env.NODE_ENV || 'development';
console.log("Environment: ", env);

let config = require('./config/config')[env];
let app = express();

app.set('superSecret', config.secret);
//app.use(morgan('short', {stream: logger.asStream('info')}));

app.use(express.static('./public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(cors());

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({limit: '50mb'}));
app.use(bodyParser.text({type: 'application/text-enriched', limit: '50mb'}));

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Acncess-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.set(`X-Powered-By`, `WebChat`);
  next();
});

// WebSocker Server Management
messageSocketStart();

require('./config/routes')(app, passport);

app.use(function (err, req, res, next) {
  if (err) {
    console.log(err);
    if (typeof err.status != "undefined") res.status(err.status);
    res.send(err);
  }
});

app.get('/', function (req, res) {
});

app.listen(process.env.PORT || 5000);

if (process.env.PORT === undefined) {
  console.log("Server Started at port : " + 5000);
}
else {
  console.log("Server Started at port : " + process.env.PORT);
}
