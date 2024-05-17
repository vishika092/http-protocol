import http from "http"
import fs from "fs/promises"


let server = http.createServer(async (req, res) => {
    try{
        if(req.method == "GET"){
            res.statusCode = 200;
            let data = await fs.readFile("todo.json")
            res.setHeader("Content-Type", "application/json")
            res.end(data);
        }
        else if(req.method === "POST"){
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            })
            req.on("end", async()=> {
                res.statusCode = 200;
                res.end(JSON.stringify({message : "Todo added Successfully!!"}))

                let data = await fs.readFile("todo.json");
                data = JSON.parse(data)
                data.push(JSON.parse(body));
                await fs.writeFile("todo.json", JSON.stringify(data));
               
            })
        }
    }
    catch(err){
         res.statusCode = 500;
        res.end("error")
    }
})


server.listen(8080, ()=> {
    console.log("server Running at 8080");
})