const pick = require('101/pick')

module.exports = resToJSON

/**
 * return a json representation of a response
 * @param  {IncomingMessage} res response (client incoming-message or server-response)
 * @param  {Array} additional additional properties to pick from response
 * @return {Object} resJSON
 */
function resToJSON (res, additional) {
  additional = additional || []
  if (additional === true) {
    additional = [
      'rawHeaders',
      'rawTrailers'
    ]
  }
  return pick(res, [
    'statusCode',
    'statusMessage',
    'headers',
    'body',
    'trailers',
    'method',
    'url',
    'httpVersion'
  ].concat(additional))
}
