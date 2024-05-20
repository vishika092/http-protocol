import http from "http"
import url from "url"
import fs from "fs/promises"
import https from "https"
import fsSync from "fs"

let port = 8080;
let httpsport = 443;

let httpServer = http.createServer((req, res) => {
    const httpsUrl = `https://${req.headers.host}${req.url}`;
    res.writeHead(301, { Location: httpsUrl });
    res.end();
})

let httpsServer = http.createServer({
    key : fsSync.readFileSync("./keys/privkey.pem"),
    cert : fsSync.readFileSync("./keys/fullchain.pem")
}, (req, res) => {
    leaderBoardDetails(req, res);
})

httpServer.listen(port, () => {
    console.log("Server running at port ", port);
})

httpsServer.listen(httpsport, ()=> {
    console.log("https server running at ", httpsport);
})



async function leaderBoardDetails(req, res){
    let parsedURL = url.parse(req.url, true);
    res.setHeader("Content-Type", "application/json");

    if(req.method === "GET" && parsedURL.pathname === "/leaderboard"){
        let data = await fs.readFile("data.json");
        data = JSON.parse(data);
        if(parsedURL.query.studentname){
            let studentDetails = data.filter((obj) => parsedURL.query.studentname === obj.studentname)

            if(studentDetails.length == 0){
                res.end("Not Found!")
            }
            else{
                let [obj]  = studentDetails;
                 res.end(JSON.stringify(obj));
            }
        }
        else{
            res.end(JSON.stringify(data));
        }
    }
    else{
        res.statusCode = 404;
        res.end("Not Found");
    }
}