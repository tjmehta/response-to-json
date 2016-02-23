var IncomingMessage = require('http').IncomingMessage

var Code = require('code')
var Lab = require('lab')
var set = require('101/set')

const resToJSON = require('../index.js')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var beforeEach = lab.beforeEach
var expect = Code.expect

describe('response-to-json', function () {
  var ctx
  beforeEach(function (done) {
    ctx = {}
    var mockSocket = {}
    ctx.headers = {
      'user-agent': 'curl/7.22.0',
      host: '127.0.0.1:8000',
      accept: '*/*'
    }
    ctx.rawHeaders = [
      'user-agent',
      'this is invalid because there can be only one',
      'User-Agent',
      'curl/7.22.0',
      'Host',
      '127.0.0.1:8000',
      'ACCEPT',
      '*/*'
    ]
    ctx.trailers = {
      'x-trailer': 'hai'
    }
    ctx.rawTrailers = [
      'X-Trailer',
      'hai'
    ]
    ctx.res = new IncomingMessage(mockSocket)
    set(ctx.res, {
      method: 'GET',
      statusCode: 200,
      statusMessage: 'OK',
      headers: ctx.headers,
      body: 'body',
      trailers: ctx.trailers,
      rawHeaders: ctx.rawHeaders,
      rawTrailers: ctx.rawTrailers,
      httpVersion: '1.1',
      url: '',
      custom: 'custom'
    })
    done()
  })

  it('should toJSON an IncomingMessage (no additional)', function (done) {
    expect(resToJSON(ctx.res)).to.deep.equal({
      method: 'GET',
      statusCode: 200,
      statusMessage: 'OK',
      headers: ctx.headers,
      body: 'body',
      trailers: ctx.trailers,
      url: '',
      httpVersion: '1.1'
    })
    done()
  })

  it('should toJSON an IncomingMessage and include raw (additional=true)', function (done) {
    expect(resToJSON(ctx.res, true)).to.deep.equal({
      method: 'GET',
      statusCode: 200,
      statusMessage: 'OK',
      headers: ctx.headers,
      body: 'body',
      trailers: ctx.trailers,
      url: '',
      httpVersion: '1.1',
      rawHeaders: ctx.rawHeaders,
      rawTrailers: ctx.rawTrailers
    })
    done()
  })

  it('should toJSON an IncomingMessage and include custom (additional=[\'custom\'])', function (done) {
    expect(resToJSON(ctx.res, ['custom'])).to.deep.equal({
      method: 'GET',
      statusCode: 200,
      statusMessage: 'OK',
      headers: ctx.headers,
      body: 'body',
      trailers: ctx.trailers,
      url: '',
      httpVersion: '1.1',
      custom: 'custom'
    })
    done()
  })
})
