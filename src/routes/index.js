const addEmployeeRoute = require('./addEmployee');
const editRecipeRoute = require('./edit-recipe');
const getRecipesListRoute = require('./get-recipes-list');
const getRecipeHistoryRoute = require('./get-recipe-history');

module.exports = (app, db) => {
	addEmployeeRoute(app, db);
	editRecipeRoute(app, db);
	getRecipesListRoute(app, db);
	getRecipeHistoryRoute(app, db);
}
