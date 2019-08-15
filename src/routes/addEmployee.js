const uuidv1 = require('uuid/v1');
const axios = require('axios')
const { dbName } = require('../_config/db');

const TARGET_COLLECTION = 'employees'
const ENDPOINT_URL = '/employees'
const AUTHORIZATION_SERVICE_URL = 'https://authservice00.herokuapp.com/auth'

module.exports = (app, client) => {
	app.post(ENDPOINT_URL, async (req, res) => {
		const employee = { ...req.body, id: uuidv1() };
		const token = req.get('Authorization');
		const db = client.db(dbName);

		try {
			const { status } = await axios({
				method: 'post',
				url: AUTHORIZATION_SERVICE_URL,
				data: {
					token
				}
			});

			if (status === 200) {
				db.collection(TARGET_COLLECTION)
					.insertOne(employee, error => {
						if (error) {
							res.send({ error });
						} else {
							res.sendStatus(200);
						}
				});
			}
		} catch (error) {
			const status = error.response && error.response.status
			res.sendStatus(status);
		}
	})
}
