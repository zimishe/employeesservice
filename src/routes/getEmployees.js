const {	TARGET_COLLECTION, ENDPOINT_URL } = require('../constants');

const dotenv = require('dotenv');
dotenv.config();

const { DB_NAME } = process.env;

module.exports = (app, client) => {
	app.get(ENDPOINT_URL, async (req, res) => {
		const db = client.db(DB_NAME);

		try {
			db.collection(TARGET_COLLECTION)
				.find()
				.toArray((error, result) => {
					if (error) {
						res.send({ error });
					} else {
						Boolean(result) ? res.send(result) : res.sendStatus(404)
					}
			});
		} catch (error) {
			const status = error.response && error.response.status
			res.sendStatus(status);
		}
	})
}
