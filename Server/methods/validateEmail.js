var Joi = require('joi');
var schema = { email: Joi.string().email({minDomainAtoms: 2}) };
module.exports = (email) => {
  return ((Joi.validate({email: email}, schema).error === null) ? true : false);
};
