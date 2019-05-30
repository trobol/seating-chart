const next = require('next');
const express = require('express');
const mysql = require('mysql');
const uuid = require('uuid/v4');
const passport = require('passport');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const devcert = require('devcert');
const https = require('https');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// const flash = require('connect-flash');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

require('dotenv').config();

const {
  MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DATABASE, FILESTORE_SECRET,
} = process.env;

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    const sess = {
      genid: (req) => {
        console.log('inside session');
        console.log(req.sessionID);
        return uuid();
      },
      store: new FileStore(),
      secret: FILESTORE_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: !dev },
    };

    server.use(session(sess));
    // server.use(flash());
    server.use(cors());
    server.use(fileUpload());

    server.pool = mysql.createPool({
      host: MYSQL_HOST,
      user: 'root',
      password: '',
      database: MYSQL_DATABASE,
    });

    // eslint-disable-next-line global-require
    require('./util/passport')(passport, server);

    server.use(passport.initialize());
    server.use(passport.session());
    // eslint-disable-next-line global-require
    require('./routes')(server, passport);

    server.get('/user/*', (req, res) => {
      if (req.isAuthenticated()) {
        handle(req, res);
      } else {
        res.redirect('/login');
      }
    });

    server.get('/login', (req, res) => {
      if (req.isAuthenticated()) {
        res.redirect('/');
      } else {
        handle(req, res);
      }
    });

    server.get('*', (req, res) => {
      // console.log(req.sessionID);
      handle(req, res);
    });
    if (dev) {
      // Creates secure development server
      devcert.certificateFor('localhost', { skipCertutil: true }).then((ssl) => {
        https.createServer(ssl, server).listen(3000, (err) => {
          if (err) throw err;
          // eslint-disable-next-line no-console
          console.log('> Ready on http://localhost:3000');
        });
      });
    } else {
      server.listen(3000, (err) => {
        if (err) throw err;
        // eslint-disable-next-line no-console
        console.log('> Ready on http://localhost:3000');
      });
    }
  })
  .catch((ex) => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });
