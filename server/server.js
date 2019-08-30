const next = require('next'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	config = require('../config.js'),
	fs = require('fs'),
	https = require('https'),
	mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${config.mondoUser}:${config.mondoPW}@${config.mondoUrl}`, { useNewUrlParser: true })
	.then(() => { console.log('> Connected to database') })
	.catch(err => console.log('> Failed to connect to database: ' + err));

const app = next({ dev: true });

const handle = app.getRequestHandler();

app.prepare()
	.then(() => {
		const server = express();

		//check if user is logged in
		server.use(cookieParser());
		server.use(bodyParser.json());
		server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
			extended: true
		}));
		server.use(require('./authentication.js'));

		server.use('/api', require('./api'));

		server.get('*', (req, res) => {
			return handle(req, res);
		});
		https.createServer({
			key: fs.readFileSync('server.key'),
			cert: fs.readFileSync('server.cert')
		}, server).listen(3000, (err) => {
			if (err) throw err;
			// eslint-disable-next-line no-console
			console.log('> Ready on https://localhost:3000');
		});
	})
	.catch((ex) => {
		console.error(ex.stack)
		process.exit(1)
	});


