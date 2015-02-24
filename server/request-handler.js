/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url');

var fakeData = {results:[
  {createdAt: "2014-04-21T08:27:52.513Z", objectId: "vKSQLS08T1", roomname: "lobby", text: "jabroni1", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude1"},
  {createdAt: "2014-03-24T08:27:52.513Z", objectId: "vKSQLS08T2", roomname: "lobby", text: "jabroni2", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude2"},
  {createdAt: "2014-02-22T08:27:52.513Z", objectId: "vKSQLS08T3", roomname: "lobby", text: "jabroni3", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude3"},
  {createdAt: "2014-01-24T08:27:52.513Z", objectId: "vKSQLS08T4", roomname: "lobby", text: "jabroni4", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude4"},
  {createdAt: "2013-12-23T08:27:52.513Z", objectId: "vKSQLS08T5", roomname: "lobby", text: "jabroni5", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude5"},
  {createdAt: "2013-11-24T08:27:52.513Z", objectId: "vKSQLS08T6", roomname: "lobby", text: "jabroni6", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude6"},
  {createdAt: "2013-10-24T08:27:52.513Z", objectId: "vKSQLS08T7", roomname: "lobby", text: "jabroni7", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude7"},
  {createdAt: "2013-09-25T08:27:52.513Z", objectId: "vKSQLS08T8", roomname: "lobby", text: "jabroni8", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude"},
  {createdAt: "2013-08-24T08:27:52.513Z", objectId: "vKSQLS08T9", roomname: "lobby", text: "jabroni9", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude"},
  {createdAt: "2013-07-26T08:27:52.513Z", objectId: "vKSQLS08T2", roomname: "lobby", text: "jabroni", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude"},
  {createdAt: "2013-06-24T08:27:52.513Z", objectId: "vKSQLS08T2", roomname: "lobby", text: "jabroni", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude"},
  {createdAt: "2013-05-27T08:27:52.513Z", objectId: "vKSQLS08T2", roomname: "lobby", text: "jabroni", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude"},
  {createdAt: "2013-04-28T08:27:52.513Z", objectId: "vKSQLS08T2", roomname: "lobby", text: "jabroni", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude"},
  {createdAt: "2013-03-24T08:27:52.513Z", objectId: "vKSQLS08T2", roomname: "lobby", text: "jabroni", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude"},
  {createdAt: "2013-02-24T08:27:52.513Z", objectId: "vKSQLS08T2", roomname: "lobby", text: "jabroni", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude"},
  {createdAt: "2013-01-24T08:27:52.513Z", objectId: "vKSQLS08T2", roomname: "lobby", text: "jabroni", updatedAt: "2015-02-24T08:27:52.513Z", username: "Dude"}
  ]};
var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  //
  //
  console.log("Serving request type " + request.method + " for url " + request.url);


  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "application/json";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  if (request.method === "OPTIONS"){
    // console.log('get method!');
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(fakeData));
  }else if (request.method === "GET"){
    // console.log('get method!');
    var path = request.url;
    var split = path.split("/");
    if (split[1] === "classes"){
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(fakeData));
    } else {
      statusCode = 404;
      response.writeHead(statusCode,headers);
      response.end();
    }
  }else if (request.method === "POST"){
    // console.log('get post!');
    statusCode = 201;
    response.writeHead(statusCode, headers);
    var body = '';
    request.on('data', function (data){
      body += data;
    });
    request.on('end', function (){
      var newInput = JSON.parse(body);
      newInput.createdAt = new Date();
      fakeData.results.unshift(newInput);
      // console.log(fakeData);
    });
    response.end("Hello World");
  }

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end(JSON.stringify(fakeData));
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


// createdAt: "2015-02-24T08:27:52.513Z"objectId: "vKSQLS08T2"roomname: "new room"text: "jabroni"updatedAt: "2015-02-24T08:27:52.513Z"username: "Dude"

module.exports.requestHandler = requestHandler;
