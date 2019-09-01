const next = require('next'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	config = require('../config.js'),
	fs = require('fs'),
	https = require('https'),
	mongoose = require('mongoose');

process.stdout.write('> Connecting to database');
let connecting = true;
let dot = () => {
	if(!connecting) return;
	process.stdout.write(' .');
	setTimeout(dot, 100)
};
dot();
mongoose.connect(`mongodb+srv://${config.mondoUser}:${config.mondoPW}@${config.mondoUrl}`, { useNewUrlParser: true })
	.then(() => { 
		connecting = false;
		console.log('\x1b[32m Connected \x1b[0m')
	 })
	.catch(err => {
		connecting = false;
		console.log('\x1b[31m Failed \x1b[0m \n' + err);
		
	});

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
		
		if(fs.existsSync('server.key') && fs.existsSync('server.cert')) {
			https.createServer({
				key: fs.readFileSync('server.key'),
				cert: fs.readFileSync('server.cert')
			}, server).listen(3000, (err) => {
				if (err) throw err;
				console.log('> Ready on https://localhost:3000');
			});
		} else {
			console.log('>\x1b[33m Certificate not found. Starting server without HTTPS\x1b[0m');
			server.listen(3000, (err) => {
				if (err) throw err;
				console.log('>\x1b[32m Ready\x1b[0m on http://localhost:3000');
			});
		}
		
	})
	.catch((ex) => {
		console.error(ex.stack)
		process.exit(1)
	});


