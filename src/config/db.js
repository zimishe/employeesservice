const dbName = 'heroku_8r5trzxj';
const dbUser = 'admin';
const dbPassword = 'heroku_db_000';

module.exports = {
	dbName,
	URL: `mongodb://${dbUser}:${dbPassword}@ds163757.mlab.com:63757/${dbName}`
}
