"use strict"

const omit = require("./omit.js")
const isnumeric = require("./isnumeric.js")

// Exported function is used to create a ivr object.
// Will throw any errors.
// Arguments:
//  play (string, url)[mandatory] URL to the menu file to be played.
//  timeout (int) time before either repeating menu or giving up on call when no digits has been pressed after menu has been played, default is 10.
//  repeat (int) number of times to repeast the IVR menu when no digits are pressed, default is 3.
//  digits (int) number of digits to collect and POST to the URL specified in next as a POST variable called "result".
//  next (string, url) if digits is set we will post to the specified URL. The digits will be in a POST variable called "result".
module.exports = function (play, timeout, repeat, digits, next) {
	if (!play) {
		throw new Error("Invalid value of mandatory field (play) in ivr")
	}

	this.ivr = play
	this.timeout = timeout || 10
	this.repeat = repeat || 3
	this.digits = digits || null
	this.next = next || null

	this.addDestination = addDestination

	this.exec = exec
}

// addDestination will add a destination to a ivr object.
// If there is any errors an Error will be thrown.
// Arguments:
//  digit (int)[mandatory] which digit the destination should be triggered on.
//  destination (string or api-object)[mandatory] the destination to be executed when the specified digit is pressed.
// Throws:
//  Any Errors.
function addDestination(digit, destination) {
	if (!isnumeric(digit)) {
		throw new Error("Error calling addDestination(), first argument (digit) is mandatory and must be a int")
	}

	if (!destination) {
		throw new Error("Error calling addDestination(), second argument (destination) is mandatory and must be a string or object")
	}

	this[digit] = omit(destination)
}

// exec will return the ivr object as a JSON-string that can be returned to 46elks.
// Returns:
//  String containing JSON of the data part of the object.
function exec() {
	return JSON.stringify(omit(this))
}
