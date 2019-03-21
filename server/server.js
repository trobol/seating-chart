const next = require('next');
const express = require('express');
const mysql = require('mysql');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.urlencoded({ extended: true }));
    server.pool = mysql.createPool({
      host: 'localhost',
      user: 'seatingchart',
      password: 'seatingchart',
      database: 'seatingchart',
    });

    // eslint-disable-next-line global-require
    require('./routes')(server);

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });
