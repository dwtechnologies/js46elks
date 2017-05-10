"use strict"

const omit = require("./omit.js")

// Exported function is used to create a connect object.
// Will throw any errors.
// Arguments:
//  connect (string)[mandatory] number to connect the call to in international format.
//  callerid (string) number to show when conencting to remote phone in international format, if empty will default to callers number.
//  busy (string or api-object) to execute if the called party is busy.
//  success (string or api-object) to execute when call has ended successfully.
//  failed (string or api-object) to execute if the call failed.
//  recordcall (string, url) url to send the url to the recorded wav file.
//  next (string or api-object) to be executed next regardless of call status.
module.exports = function (connect, callerid, busy, success, failed, recordcall, next) {
	if (!connect) {
		throw new Error("Invalid value of mandatory field (connect) in connect")
	}

	this.connect = connect
	this.callerid = callerid || null
	this.busy = busy || null
	this.success = success || null
	this.failed = failed || null
	this.recordcall = recordcall || null
	this.next = next || null

	this.exec = exec
}

// exec will return the connect object as a JSON-string that can be returned to 46elks.
// Returns:
//  String containing JSON.
function exec() {
	return JSON.stringify(omit(this))
}
