const next = require('next'),
	express = require('express'),
	cookieParser = require('cookie-parser');


const app = next({ dev: true });

const handle = app.getRequestHandler();

app
	.prepare()
	.then(() => {
		const server = express();

	});


//check if user is logged in
app.use(cookieParser());
app.use(require('./authentication.js'));

