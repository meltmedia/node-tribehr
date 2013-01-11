var xml2js = require('xml2js');

function parseResponse(response, cb) {
  var headers = response.headers;
  var contentType = headers['content-type'].split(';').shift();
  var parsedResponse;

  if(!response.hasOwnProperty('body')) {
    return cb(false);
  }

  switch(contentType) {
    case 'application/xml':

    var parser = new xml2js.Parser({
      mergeAttrs: true
    });

    parser.addListener('end', function(result) {
      cb(result);
    });

    parser.parseString(response.body);

    break;
    case 'application/json':

    var body;

    try {
      body = JSON.parse( response.body.replace(/[\r\n]/ig, ' ') );
    } catch(err) {
      body = response.body;
    }

    cb(body);

    break;
    default:
    cb(response.body);
    break;
  }
}

module.exports = parseResponse;