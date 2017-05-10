"use strict"

const https = require("https")
const querystring = require("querystring")
const omit = require("./omit.js")

// get will fetch data from the 46elks API and send it as an object containing statusCode (http.statusCode) and data (JSON parsed object)
// If there is an error, first argument in callback will be of type Error.
// Arguments:
//  auth (object) Object containing auth information for the 46elks API.
//  elks (elks object) Object containing API url/paths for the 46elks API.
//  path (string) URL to fetch.
//  callback (function) Callback function.
// Callback:
//  Error, Object containing: statusCode (http.statusCode), raw (JSON data from the response).
function get(auth, elks, path, callback) {
	let options = {
		host: elks.host,
		port: elks.port,
		path: path,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Basic " + Buffer(auth.username + ":" + auth.password).toString("base64"),
		}
	}

	https.get(options, (res) => {
		let data = ""

		res.on("data", (chunk) => {
			data += chunk
		})

		res.on("end", () => {
			if (res.statusCode != 200) {
				callback(new Error("Error code", res.statusCode, data), null)
				return
			}

			let resobj = {
				statusCode: res.statusCode,
				raw: JSON.parse(data)
			}

			callback(null, resobj)
		})
	})
}

// post will post data to the 46elks API and send the response as an object containing statusCode (http.statusCode) and json (JSON parsed object).
// If there is an error, first argument in callback will be of type Error.
// Arguments:
//  auth (object) Object containing auth information for the 46elks API.
//  elks (elks object) Object containing API url/paths for the 46elks API.
//  path (string) URL to post to.
//  rawquery (object) object containing key-value pairs to be converted to a query string.
//  callback (function) Callback function.
// Callback:
//  Error, Object containing: statusCode (http.statusCode), raw (JSON data from the response).
function post(auth, elks, path, rawquery, callback) {
	let qs = querystring.stringify(omit(rawquery))

	let options = {
		host: elks.host,
		port: elks.port,
		method: "POST",
		path: path,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Basic " + Buffer(auth.username + ":" + auth.password).toString("base64")
		}
	}

	let req = https.request(options, (res) => {
		let data = ""

		res.on("data", (chunk) => {
			data += chunk
		})

		res.on("end", () => {
			if (res.statusCode != 200) {
				callback(new Error("Error code", res.statusCode, data), null)
				return
			}

			let resobj = {
				code: res.statusCode,
				raw: JSON.parse(data)
			}

			callback(null, resobj)
		})
	})

	// Write query strings to the request.
	req.write(qs)

	req.on("error", () => {
		callback(new Error("Error creating request for", options.host + option.path), null)
	})

	req.end()
}

// Export the get and post functions.
module.exports = {
	get: get,
	post: post
}
