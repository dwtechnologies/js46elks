"use strict"

const omit = require("./omit.js")
const isnumeric = require("./isnumeric.js")

// Exported function is used to create a record object.
// Will throw any errors.
// Arguments:
//  record (string, url)[mandatory] URL to where to send the recording to.
//  timelimit (int) default is 120 seconds (2 minutes).
module.exports = function (record, timelimit) {
	if (!record) {
		throw new Error("Invalid value of mandatory field (record) in record")
	}

	if (timelimit) {
		if (!isnumeric(timelimit)) {
			throw new Error("Invalid value of field (timelimit) in record")
		}
	}

	this.record = record
	this.timelimit = timelimit || null

	this.exec = exec
}

// exec will return the record object as a JSON-string that can be returned to 46elks.
// Returns:
//  String containing JSON of the data part of the object.
function exec() {
	return JSON.stringify(omit(this))
}
