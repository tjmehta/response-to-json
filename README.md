# response-to-json [![Build Status](https://travis-ci.org/tjmehta/response-to-json.svg?branch=master)](https://travis-ci.org/tjmehta/response-to-json)
Returns a JSON representation of response

# Installation
```bash
npm i --save response-to-json
```

# Usage
```js
var http = require('http')
var resToJSON = require('response-to-json')

http.request({...}, function (res) {
  // Default behavior
  resToJSON(res)
  /*
  {
    statusCode: 200
    statusMessage: 'OK'
    headers: {}
    body: 'hello'
    trailers: {}
    method: 'GET'
    url: 'http://localhost:80'
    httpVersion: '1.1'
  }
  */
  // Pass true to include rawHeaders and rawTrailers
  resToJSON(res, true) // true will return raw headers and trailers
  /*
  {
    statusCode: 200
    statusMessage: 'OK'
    headers: {}
    body: 'hello'
    trailers: {}
    method: 'GET'
    url: 'http://localhost:80'
    httpVersion: '1.1',
    rawHeaders: [],
    rawTrailers: []
  }
  */
  // Pass array of strings to include custom properties (supports keypaths)
  res.customProp1 = 'hai'
  resToJSON(res, ['customProp1']) // true will return raw headers and trailers
  /*
  {
    statusCode: 200
    statusMessage: 'OK'
    headers: {}
    body: 'hello'
    trailers: {}
    method: 'GET'
    url: 'http://localhost:80'
    httpVersion: '1.1',
    customProp1: 'hai'
  }
  */
})
```
# License
MIT