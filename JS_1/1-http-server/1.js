import http from "http"

let port = 8080;

let server = http.createServer((req, res) => {
    console.log(req.socket.remoteAddress);
    console.log(req.headers);
    console.log(req.url);
    res.end("hello");
})


server.listen(port, ()=> {
    console.log("server Running at ", port);
})