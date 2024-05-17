import http from "http"
import url from 'url'
import fs from "fs/promises"

let port = 8080;

let server = http.createServer(async (req, res) => {
    // to log the IP address of clients   --> req.socket.remoteAddress
    console.log(`request received from Client : `, req.socket.remoteAddress);    // retrieving the IP address of the client's machine that made the http request

    // to log Request HTTP method  --> type of request made by client to server
    console.log(req.method);

    // Request URL
    console.log(req.url);    //  It contains the path name and query parameters 

    // URL object 
    const parsedURL = url.parse(req.url, true)   //  extract its components such as the pathname and query parameters
    console.log(parsedURL.pathname);
    console.log(parsedURL.query);   // query params

    //---------------------------------
    // headers --> more info about client side to server
    console.log(req.headers);  
     //  host (machine that's hosting the server)
     // user-agent  --> medium of making a request to server
    console.log(req.headers.host);
    res.setHeader('Content-Type', 'application/json' )  // data in json


    //-------------------------------------------
    // res.end("hello")
    let data = await fs.readFile("3_data.js");

    res.end(data)
})

server.listen(port, () => {
    console.log("server running at ", port);
})
