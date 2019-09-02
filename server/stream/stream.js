//https://tomkersten.com/articles/server-sent-events-with-node/

function Stream(req, res) {
	this.req = req;
	this.res = res;
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
	});
}

Stream.prototype = {
	on(event, callback) {
		this.req.on(event, callback);
	},
	send(data) {
		res.write(JSON.stringify(data) + '\n');
	}
}

module.exports = Stream;