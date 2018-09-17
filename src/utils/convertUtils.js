const _ = require('lodash');

const removeUndefinedProps = (obj) => {
  _.keys(obj).forEach(key => {
    if (_.isUndefined(obj[key])) {
      delete obj[key];
    }
  });
  return obj;
};

const convertFacebookResponse = (response) => {
  const converted = _.assign({}, response);
  converted.email = decodeURI(response.email);
  converted.facebookId = response.id;
  converted.firstName = response.first_name;
  converted.lastName = response.last_name;

  delete converted.id;
  delete converted.first_name;
  delete converted.last_name;

  return removeUndefinedProps(converted);
};

module.exports = {
  convertFacebookResponse
};
