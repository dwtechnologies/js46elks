# js46elks

js46elks is a javascript implementation of the 46elks REST API.
For now it only implements the following functions/constructors/calls.

For more info about the 46elks REST API please see: [46elks.com/api-docs](https://46elks.com/api-docs).

## Implemented constructors

- connect -> new api.connect()
- hangup -> new api.hangup()
- ivr -> new api.ivr()
- play -> new api.play()
- record -> new api.record()

## Things todo/implement

- call -> new api.call() (New outgoing call)
- mms -> recieve mms function
- sms -> new api.sms() (New outgoing sms) + recieve sms function

## How to use

You just chain constructors together and return the top object as JSON output by executing `obj.exec()`.

## Constructors

### connect(connect, callerid, busy, success, failed, recordcall, next)

This constructor will generate a connect constructor just for connecting calls from other constructors or voice_start

Arguments:

```text
connect (string)[mandatory] number to connect the call to in international format.
callerid (string) number to show when conencting to remote phone in international format, if empty will default to callers number.
busy (string or api-object) to execute if the called party is busy.
success (string or api-object) to execute when call has ended successfully.
failed (string or api-object) to execute if the call failed.
recordcall (string, url) url to send the url to the recorded wav file.
next (string or api-object) to be executed next regardless of call status.
```

Returns:

```text
Object (data + exec functions) or Error if there was any errors.
```

Functions:

```text
exec() = Returns JSON string of the object and all daisy chained constructors. Omitting empty values and functions.
```

### hangup(cause)

This constructor will generate a hangup constructor that hangups the call. Normally you don't need to specify a hangup. 46elks
will do this automatically in the last step. But with this function you can set the hangup cause (so that correct ringtone and logging can be achived)

Arguments:

```text
cause (string) Hangup cause, will default to "reject".
```

Returns:

```text
Object (data + exec functions).
```

Functions:

```text
exec() = Returns JSON string of the object and all daisy chained constructors. Omitting empty values and functions.
```

### ivr(play, timeout, repeat, digits, next)

This constructor will generate a ivr menu constructor.

Arguments:

```text
play (string, url)[mandatory] URL to the menu file to be played.
timeout (int) time before either repeating menu or giving up on call when no digits has been pressed after menu has been played, default is 10.
repeat (int) number of times to repeast the IVR menu when no digits are pressed, default is 3.
digits (int) number of digits to collect and POST to the URL specified in next as a POST variable called "result".
next (string, url) if digits is set we will post to the specified URL. The digits will be in a POST variable called "result".
```

Returns:

```text
Object (data + addDestination function + exec functions) or any Error.
```

Functions:

```text
addDestination(digit, action)
Where digit is the digit typed in the meny (0-9) and Destination is an api constructor (like connect etc). Will throw any errors.

exec() = Returns JSON string of the object and all daisy chained constructors. Omitting empty values and functions.
```

### play(play, next, failed)

This constructor will create a play object (playback audio file).

Arguments:

```text
play (string, url)[mandatory] URL to the menu file to be played.
next (string or api-object) if playback was successful continue with next after playback is done.
failed (string or api-object) if playback failed these actions will be executed.
```

Returns:

```text
Object (data + exec functions) or an Error.
```

Functions:

```text
exec() = Returns JSON string of the object and all daisy chained constructors. Omitting empty values and functions.
```

### record(record, timelimit)

This constructor will create a record object (record).

Arguments:

```text
record (string, url)[mandatory] URL to where to send the recording to.
timelimit (int) default is 120 seconds (2 minutes).
```

Returns:

```text
Object (data + exec functions) or an Error.
```

Functions:

```text
exec() = Returns JSON string of the object and all daisy chained constructors. Omitting empty values and functions.
```

## Installing the API

Over SSH: `npm install git+ssh://git@github.com:dwtechnologies/js46elks.git`

Over HTTPS: `npm install git+https://github.com/dwtechnologies/js46elks.git`

## Using the API

Import the API by importing the jsvictorops module.

```js
const jselks = require("js46elks")
```

Init the api with your `API USER` and `API PASSWORD`.

```js
const api = new jselks("API-USER", "API-PASSWORD")
```

You are now set to use the API.

## Examples

The example below till fetch all the phone numbers for the current user that is on call for the team teamName.

```js
const jselks = require("js46elks")

try {
    const api = new jselks("API-USER", "API-PASSWORD")

    let hg = new api.hangup()

    let choice1 = new api.connect("+1234567890")
    let choice2 = new api.connect("+0987654321")
    let open = new api.play("https://open.mp3", hg)

    let ivr = new api.ivr("https://menu.mp3")

    ivr.addDestination(1, choice1)
    ivr.addDestination(2, choice2)
    ivr.addDestination(3, open)

    console.log(ivr.exec())
}
catch (err) {
    console.log(err)
}
```