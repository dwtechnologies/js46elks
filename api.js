"use strict"

// Exported function will setup the API object with a USERNAME and PASSWORD before use.
// Username and/or Password is optional, only needed for operation that posts to 46elks.
// Arguments:
//  username (string) Username for 46elks.
//  password (string) Password for 46elks.
module.exports = function (username, password) {
	this.auth = {
		username: username || "",
		password: password || ""
	}

	this.elks = {
		host: "api.46elks.com",
		port: 443,

		smsURI: "/a1/SMS",
		callURI: "/a1/Calls"
	}

	// Implement the API modules.
	// this.call = require("./lib/call.js")
	this.connect = require("./lib/connect.js")
	this.hangup = require("./lib/hangup.js")
	this.ivr = require("./lib/ivr.js")
	// this.mms = require("./lib/mms.js")
	this.play = require("./lib/play.js")
	this.record = require("./lib/record.js")
	// this.sms = require("./lib/sms.js")
}
