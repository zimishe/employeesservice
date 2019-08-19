const TARGET_COLLECTION = 'employees';
const AUTHORIZATION_SERVICE_URL = 'https://authservice00.herokuapp.com/auth';
const ENDPOINT_URL = '/employees';
// as far as we have only CRUD, endpoint URL is the same for all requests,
// with just different methods

module.exports = {
  TARGET_COLLECTION,
  AUTHORIZATION_SERVICE_URL,
  ENDPOINT_URL
}
