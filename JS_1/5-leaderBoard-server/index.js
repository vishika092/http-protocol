import http from "http"
import url from "url"
import fs from "fs/promises"

let port = 8080;

let httpServer = http.createServer((req, res) => {
    leaderBoardDetails(req, res);
})

httpServer.listen(port, () => {
    console.log("Server running at port ", port);
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