const { dbName } = require('../config/db');
const {	TARGET_COLLECTION, ENDPOINT_URL } = require('../constants');
const { checkToken } = require('../utils/authorization');

module.exports = (app, client) => {
	app.put(ENDPOINT_URL, async (req, mainResult) => {
		const token = req.get('Authorization');
		const { id, ...employee } = req.body;

		const db = client.db(dbName);

		try {
			const { status } = await checkToken(token)

			if (status === 200) {
				db.collection(TARGET_COLLECTION).findOne({ id }, (error, result) => {
					if (error) {
						mainResult.send(error);
					} else {
						updateEmployee({
							db,
							filter: result,
							mainResult,
							employee: { ...result, ...employee }
						});
					}
				});
			}
		} catch (error) {
			const status = error.response && error.response.status
			mainResult.sendStatus(status);
		}
	})
}

function updateEmployee({ db, filter, mainResult, employee }) {
	db.collection(TARGET_COLLECTION)
		.updateOne(filter, {
			$set: employee
		}, error => {
			if (error) {
				mainResult.send({ error });
			} else {
				mainResult.sendStatus(200);
			}
	});
}
