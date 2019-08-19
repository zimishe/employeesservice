const axios = require('axios');
const { AUTHORIZATION_SERVICE_URL } = require('../constants');

// helper util, request Auth service to check token
const checkToken = token => axios({
  method: 'post',
  url: AUTHORIZATION_SERVICE_URL,
  data: { token }
});

module.exports = {
  checkToken
}
