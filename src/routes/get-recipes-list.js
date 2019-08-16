const { dbName } = require('../config/db');

module.exports = (app, client) => {
	app.get('/recipes', (req, res) => {
		const db = client.db(dbName);

		db.collection('recipes').find().toArray((error, result) => {
			if (error) {
				res.send({ error });
				console.log('228')
		}   else {
				res.send(result);
			}
		});
	})
}
