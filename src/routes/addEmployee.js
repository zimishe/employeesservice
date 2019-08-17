const uuidv1 = require('uuid/v1');
const { dbName } = require('../config/db');
const { TARGET_COLLECTION, ENDPOINT_URL } = require('../constants');
const { checkToken } = require('../utils/authorization');

module.exports = (app, client) => {
	app.post(ENDPOINT_URL, async (req, res) => {
		const employee = { ...req.body, id: uuidv1() };
		const token = req.get('Authorization');
		const db = client.db(dbName);

		try {
			const { status } = await checkToken(token)

			if (status === 200) {
				db.collection(TARGET_COLLECTION)
					.insertOne(employee, error => {
						if (error) {
							res.send({ error });
						} else {
							res.send({ employee });
						}
				});
			}
		} catch (error) {
			const status = error.response && error.response.status
			res.sendStatus(status);
		}
	})
}
