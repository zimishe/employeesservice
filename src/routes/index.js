const addEmployeeRoute = require('./addEmployee');
const editEmployeeRoute = require('./editEmployee');
const getEmployeesRoute = require('./getEmployees');
const deleteEmployeeRoute = require('./deleteEmployee');

module.exports = (app, db) => {
	addEmployeeRoute(app, db);
	editEmployeeRoute(app, db);
	getEmployeesRoute(app, db);
	deleteEmployeeRoute(app, db);
}
