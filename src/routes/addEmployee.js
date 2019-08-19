const uuidv1 = require('uuid/v1');
const { TARGET_COLLECTION, ENDPOINT_URL } = require('../constants');
const { checkToken } = require('../utils/authorization');
const dotenv = require('dotenv');
dotenv.config();

const { DB_NAME } = process.env;

module.exports = (app, client) => {
	app.post(ENDPOINT_URL, async (req, res) => {
		const employee = { ...req.body, id: uuidv1() }; // adding id to simplify searching item
		const token = req.get('Authorization'); // get Authorization header
		const db = client.db(DB_NAME);

		try {
			const { status } = await checkToken(token)

			if (status === 200) {
				db.collection(TARGET_COLLECTION)
					.insertOne(employee, error => {
						if (error) {
							res.send({ error });
						} else {
							res.send({ employee }); // responding with created entity
						}
				});
			}
		} catch (error) {
			const status = error.response && error.response.status
			res.sendStatus(status);
		}
	})
}
