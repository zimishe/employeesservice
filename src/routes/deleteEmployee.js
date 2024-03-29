const {	TARGET_COLLECTION, ENDPOINT_URL } = require('../constants');
const { checkToken } = require('../utils/authorization');
const dotenv = require('dotenv');
dotenv.config();

const { DB_NAME } = process.env;

module.exports = (app, client) => {
	app.delete(ENDPOINT_URL, async (req, mainResult) => {
		const token = req.get('Authorization');
		const { id } = req.body;

		const db = client.db(DB_NAME);

		try {
			const { status } = await checkToken(token)

			if (status === 200) {
				db.collection(TARGET_COLLECTION).findOne({ id }, (error, result) => {
					if (error) {
						mainResult.send(error);
					} else {
						Boolean(result)
							? deleteEmployee({
									db,
									filter: result,
									mainResult
								})
							: mainResult.sendStatus(404)
						// check if such record is present, if not, respond with 404
					}
				});
			}
		} catch (error) {
			const status = error.response && error.response.status
			mainResult.sendStatus(status);
		}
	})
}

function deleteEmployee({ db, filter, mainResult }) {
	db.collection(TARGET_COLLECTION)
		.deleteOne(filter, error => {
			if (error) {
				mainResult.send({ error });
			} else {
				mainResult.sendStatus(200);
			}
	});
}
