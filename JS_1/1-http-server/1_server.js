import http from "http";

const port = 8080;

//   http.createServer()   --> takes a callback  --> accepts 2 parameters
// when hitting the ip --> this callback will go to event loop and process concurrently the requests
const server = http.createServer((req, res) => {
    console.log('Request Received From Client : ', req.socket.remoteAddress);
    console.log(req.method);
    res.statusCode = 200;
    res.end("Hello World")
});

server.listen(port, () => {
    console.log(`Server running at ${port}`);
})

// access the server using LocalIP with port not public IP

/*

Client-Server Architecture  -->  one server serving many clients  using http protocol to communicate

client  -->  browser / postman
server  --> this program (machine)

Client-Server  also known as Request-Response Cycle
    --> HTTP protocol  rules : 
    --> Client sends a request to server
    --> Server processess the request and sends a response back to client
    --> server cannot send a response without a request from client
    --> Server cannot send multiple responses for a single request
    --> every request must have a response (sent by server)

for every request from client there will be one reponse --> which means completing the one cycle

*/




//--------------------------------------------
/*
100  - Continue 
101 - Switching Protocols
200 - OK
204 - No Content
301 - moved permenantly / redirection
307 - Temporary Redirect
400 - Bad request
401 - unauthorized
402 - Payment required
403 - forbidden
404 - not found
405 - Method Not Allowed
500 - Internal Server Error
502 - Bad Gateway

*/



/* 
400 range is client mistake
500 range is server mistake
100 / 200 ranges for everything well

*/


/* 
Http Methods --> 
GET : only receive the data
POST : CLIENT wants to send something  (payload)
PUT : edit

*/