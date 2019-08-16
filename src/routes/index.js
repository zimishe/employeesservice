const addEmployeeRoute = require('./addEmployee');
const editEmployeeRoute = require('./editEmployee');
const getEmployeesRoute = require('./getEmployees');

module.exports = (app, db) => {
	addEmployeeRoute(app, db);
	editEmployeeRoute(app, db);
	getEmployeesRoute(app, db);
}
