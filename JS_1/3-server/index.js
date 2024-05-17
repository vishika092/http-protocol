
import http from "http";

const port = 8080;


const server = http.createServer((req, res) => {
    console.log('Request Received From Client : ', req.socket.remoteAddress);
    console.log(req.method);
    res.statusCode = 200;
    res.end("Hello bro are u")
});


server.listen(port, () => {
    console.log(`Server running at ${port}`);
})

