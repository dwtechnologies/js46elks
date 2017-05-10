"use strict"

// Exported function generates a hangup object. If no cause is supplied it will default to "reject".
// Arguments:
//  cause (string) Hangup cause, will default to "reject".
// Returns:
//  Object containing: hangup.
module.exports = function (cause) {
	return { hangup: cause || "reject" }
}
