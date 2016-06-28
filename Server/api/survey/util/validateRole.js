'use strict';

module.exports = (Roles) => {
	let validRoles = ['frontend', 'backend', 'project manager'];
	// TODO: allow multiple roles
	if (validRoles.indexOf(Roles.toLowerCase())) {
		return Roles;
	}else {
		return '';
	}
}