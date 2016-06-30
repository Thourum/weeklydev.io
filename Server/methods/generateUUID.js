var uuid = require('node-uuid');

module.exports = () => {
  return uuid.v4(uuid.nodeRNG);
};
