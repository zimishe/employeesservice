const { dbName } = require('../config/db');
const {	TARGET_COLLECTION, ENDPOINT_URL } = require('../constants');

module.exports = (app, client) => {
	app.get(ENDPOINT_URL, async (req, res) => {
		const db = client.db(dbName);

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
