"use strict"

const omit = require("./omit.js")

// Exported function is used to create a play object.
// Will throw any errors.
// Arguments:
//  play (string, url)[mandatory] URL to the menu file to be played.
//  next (string or api-object) if playback was successful continue with next after playback is done.
//  failed (string or api-object) if playback failed these actions will be executed.
module.exports = function (play, next, failed) {
	if (!play) {
		throw new Error("Invalid value of mandatory field (play) in play")
	}

	this.play = play
	this.next = next || null
	this.failed = failed || null

	this.exec = exec
}

// exec will return the play object as a JSON-string that can be returned to 46elks.
// Returns:
//  String containing JSON of the data part of the object.
function exec() {
	return JSON.stringify(omit(this))
}
