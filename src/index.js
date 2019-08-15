const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const { URL } = require('./_config/db');
const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

MongoClient.connect(URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	(err, database) => {
		if (err) return console.log(err);
		require('./routes')(app, database);

		app.listen(port, () => {
			console.log('Server is live at ', port);
		});
});
