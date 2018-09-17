const mongoose = require('mongoose');
const _ = require('lodash');

const validId = id => mongoose.Types.ObjectId.isValid(id);

const validEmail = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

class Validation {
  constructor(values) {
    this.values = values;
    this.errors = {};
  }

  getErrors() {
    return this.errors;
  }

  passErrors(next) {
    _.isEmpty(this.errors) ? next() : next({status: 400, errors: this.errors});
  }

  validateField(field, message, validate) {
    if (this.values[field] && !this.errors[field]) {
      if (!validate(this.values[field])) {
          this.errors[field] = message;
      }
    }
    return this;
  }

  validEmail(field, message) {
    return this.validateField(field, message, validEmail);
  }

  validPhone(field, message) {
    return this.validateField(field, message, value => /^0[0-9]{9}$/.test(value));
  }

  validPassword(field, message) {
    return this.validateField(field, message, value => value.length >= 5);
  }

  validId(field, message) {
    return this.validateField(field, message || 'invalid id', validId);
  }

  validLocation(field, message) {
    return this.validateField(field, message || 'invalid location', location =>
      location.type === 'Point'
      && location.coordinates
      && location.coordinates[0] >= -90 && location.coordinates[0] <= 90
      && location.coordinates[1] >= -180 && location.coordinates[1] <= 180
    );
  }

  validRectangle(field, message) {
    return this.validateField(field, message || 'invalid rectangle', regtangle =>
      regtangle.type === 'Polygon'
      && regtangle.coordinates
      && regtangle.coordinates.length === 1
      && regtangle.coordinates[0].length === 5
      && _.isEqual(regtangle.coordinates[0][0], regtangle.coordinates[0][4])
    );
  }

  validInteger(field, message) {
    return this.validateField(field, message || 'invalid integer', _.isInteger);
  }

  maxLength(field, maxLength, message) {
    return this.validateField(field, message, value => value.length <= maxLength);
  }

  containsOnly(propList, message) {
    if (!_.keys(this.values).every(key => propList.indexOf(key) >= 0)) {
        this.errors.body = message || `body should only contain ${propList.join(', ')}`;
    }
    return this;
  }

  require(field, message) {
    if (field === '/' && _.isEmpty(this.values)) {
      this.errors.body = message || 'body is missing';
    } else if (field !== '/' && !this.values[field]) {
      this.errors[field] = message || `${field} is missing`;
    }
    return this;
  }
}

module.exports = {
  validId,
  validEmail,
  validation: values => new Validation(values)
};
