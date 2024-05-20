import http from "http"
import {readFile, appendFile} from "fs/promises"
import https from "https"
import fsSync from "fs"

const port = 80;
const httpsport = 443;

// the callback is middle ware
const httpServer = http.createServer((req, res) => {
    // redirected to https
    const httpsUrl = `https://${req.headers.host}${req.url}`;
    res.writeHead(301, { Location: httpsUrl });
    res.end();

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


    await appendFile("logs.txt", data);

    if(url == "/logs"){
        let data = await readFile("logs.txt", "utf-8");
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


