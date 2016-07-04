'use strict';

function checkArrayLength (role, role_level) {
  if (role.length !== role_level.length) {
    return false;
  }else {
    return true;
  }
}

function roleCompare (role, role_level) {
  let arr = [];
  for (var i = 0; i < role.length; i++) {
    arr.push({user: role[i], role: role_level[i]});
  }
  return arr;
}
// return true if the arrays are the same lenght
// otherwise return false
function arrayChecker (role, role_level) {
  if (checkArrayLength(role, role_level)) {
    for (var i = 0; i < role.length; i++) {
      if (!checkArrayLength(role[i], role_level[i])) {
        return false;
      }
    }
    return true;
  }
}
module.exports = {
  arrayChecker: arrayChecker,
  getRoles: roleCompare
};
