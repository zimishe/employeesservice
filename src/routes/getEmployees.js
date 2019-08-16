const { dbName } = require('../config/db');
const {	TARGET_COLLECTION, ENDPOINT_URL } = require('../constants');
const { checkToken } = require('../utils/authorization');

module.exports = (app, client) => {
	app.get(ENDPOINT_URL, async (req, res) => {
		const token = req.get('Authorization');
		const db = client.db(dbName);

		try {
			const { status } = await checkToken(token);

			if (status === 200) {
				db.collection(TARGET_COLLECTION)
					.find()
					.toArray((error, result) => {
						if (error) {
							res.send({ error });
						} else {
							Boolean(result) ? res.send(result) : res.sendStatus(404)
						}
				});
			}
		} catch (error) {
			const status = error.response && error.response.status
			res.sendStatus(status);
		}
	})
}
