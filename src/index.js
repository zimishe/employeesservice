const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const { DB_URL, PORT } = process.env;
const port = PORT || 8000;

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

MongoClient.connect(DB_URL,
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
