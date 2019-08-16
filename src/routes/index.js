const addEmployeeRoute = require('./addEmployee');
const editEmployeeRoute = require('./editEmployee');
const getRecipesListRoute = require('./get-recipes-list');
const getRecipeHistoryRoute = require('./get-recipe-history');

module.exports = (app, db) => {
	addEmployeeRoute(app, db);
	editEmployeeRoute(app, db);
	getRecipesListRoute(app, db);
	getRecipeHistoryRoute(app, db);
}
