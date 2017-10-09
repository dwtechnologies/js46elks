"use strict"

// Exported function will check that username and password is set. Otherise an error will be returned.
// Arguments:
//  username (string) Username.
//  password (string) Password.
// Returns:
//  errpor (object).
module.exports = function (username, password) {
	return omit(username, password)
}

function omit(username, password) {
	if (!username) {
		return new Error("Invalid value of mandatory field (username) in api")
	}

	if (!password) {
		return new Error("Invalid value of mandatory field (password) in api")
	}

	return null
}
