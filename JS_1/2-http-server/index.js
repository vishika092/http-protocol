import http from "http"
import fs from "fs/promises"
import https from "https"
import fsSync from "fs"

const port = 8080;
const httpsport = 443;

// the callback is middle ware
const httpServer = http.createServer((req, res) => {
    logRequestDetails(req, res);
});

// every packet that goes throug this http server is encrypted
const httpsServer = https.createServer({
    key : fsSync.readFileSync("./certs/privkey.pem"),
    cert : fsSync.readFileSync("./certs/fullchain.pem")
}, (req, res)=> {
    logRequestDetails(req, res)
})


async function logRequestDetails(req, res){
    try{
    const remoteAddress = req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"]
    const dateTime = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    let data = `${remoteAddress} ${userAgent} ${dateTime} ${method} ${url} \n`


    await fs.appendFile("logs.txt", data);

    if(url == "/logs"){
        let data = await fs.readFile("logs.txt", "utf-8");
        res.end((data));
    }
    else{
        res.end("data added successfully!!");
    }
    
    }
    catch(err){
        res.end("server Error");
    }
    
}

httpServer.listen(port, ()=> {
    console.log(`Server is running at ${port}`);
})

httpsServer.listen(httpsport, ()=> {
    console.log("https server running at ", httpsport);
})


// club the info in one line  and log it into logs.txt


// 100  - Continue
// 101 - Switching Protocols
// 200 - OK
// 204 - No Content
// 301 - moved permenantly / redirection
// 307 - Temporary Redirect
// 400 - Bad request
// 401 - unauthorized
// 402 - Payment required
// 403 - forbidden
// 404 - not found
// 405 - Method Not Allowed
// 500 - Internal Server Error
// 502 - Bad Gateway