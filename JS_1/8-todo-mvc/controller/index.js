import { Router } from "../routes/index.js"
import url from "url"
import fs from "fs/promises"

function httpServer(req, res){
    let method = req.method;
    let parsedURL = url.parse(req.url, true);
    let routeName = parsedURL.pathname
    let query = parsedURL.query
    let body = ""
    req.on("data", (chunk) => {
        body+= chunk;
    })
    req.on("end", ()=> {
        req.data = {method, routeName, body, query}
        let route = `/${routeName.split("/")[1]}`
        if(Router[route]?.[method]?.[routeName]){
            Router[route][method][routeName](req, res);
        }
        else{
            NotFoundController(req, res)
        }
    })
}

/*
    API : /
    Method : GET
    Desc : Home Route
*/
function homeGETController(req, res) {
    res.writeHead(200, {"Content-Type" : "application/json"})
    res.end(JSON.stringify({ message: "Welcome to Home Route" }));
}


/*
    API : /user/data
    Method : GET
    Desc : Access users.json file and send the data as response
*/
async function userDataGetController(req, res){
    try{
        res.writeHead(200, {"Content-Type" : "application/json"})
        let  {method, routeName, body, query} = req.data
        let data = await fs.readFile("./models/user.json")
        data = JSON.parse(data);
        res.end(JSON.stringify(data))
    }
    catch(err){
        catchErr(err, req, res)
    }
}


/*
    API : /user?id=12345
    Method : GET
    Desc : Access users.json file  and send the data as response based on the id
*/
async function userGetController(req, res){
    try{
        let  {method, routeName, body, query} = req.data
        let data = await fs.readFile("./models/user.json")
        data = JSON.parse(data);
        data = data.find((obj) => obj.id == query.id);
        if(!data){
                return invalidId(req,res);
            }
        res.writeHead(200, {"Content-Type" : "application/json"})
        res.end(JSON.stringify(data));
    }
    catch(err){
        catchErr(err, req, res)
    }
}


/*
    API : /user/register
    Method : POST
    Body : { name : "John Doe", email : "", password : "" }
    Desc : 
        -> Access users.json file from models folder
        -> Add the data to the users.json file
        -> by default todos value should be empty array
        -> id is random number
        -> Send the response as "User Created" in JSON format
*/
async function userPostController(req, res){
    try{
        let  {method, routeName, body, query} = req.data
   
        let data = await fs.readFile("./models/user.json")
        data = JSON.parse(data);
        body = JSON.parse(body)
        if(!(body.name&& body.email && body.password && Object.keys(body).length == 3)){
            return invalidJSON(req, res);
        }
    
        body.id = generateID();
        body.Todo = [];
    
        data.push(body);
        await fs.writeFile("./models/user.json", JSON.stringify(data))
        res.writeHead(200, {"Content-Type" : "application/json"})
        res.end(JSON.stringify({message : "User Created!"}))
    }
    catch(err){
        catchErr(err, req, res)
    }
}

/*
    API : /user/update
    Method : PUT
    Body : { id : 12345, name : "John Doe", email : "", password : "" }
    Desc : 
        -> Access users.json file from models folder
        -> Update the data in the users.json file based on the id
        -> Send the response as "User Updated" in JSON format
        -> Handle invalid id
*/
async function userPutController(req, res){
    try{
        let  {method, routeName, body, query} = req.data
   
    
        let data = await fs.readFile("./models/user.json");
        data = JSON.parse(data);
    
        body = JSON.parse(body);
    
        let isValidId = data.some((obj) => obj.id == body.id);
        if(!isValidId) return invalidId(req, res);
    
        if(!(body.id && body.name && body.email && body.password && body.Todo && Object.keys(body).length == 5)){
            return invalidJSON(req, res);
        }
        data = data.map((obj) => obj.id == body.id ? body : obj)
        await fs.writeFile("./models/user.json", JSON.stringify(data));
        res.writeHead(200, {"Content-Type" : "application/json"})
        res.end(JSON.stringify({message : "User Updated!"}))
    }
    catch(err){
        catchErr(err, req, res)
    }
}

/*
    API : /user?id=12345
    Method : DELETE
    Desc : Access users.json file from models folder and delete the data based on the id
*/
async function userDeleteController(req, res){
    try{
        let  {method, routeName, body, query} = req.data
   
        let data = await fs.readFile("./models/user.json");
        data = JSON.parse(data);
        let newData =  data.filter((obj)=> obj.id !== query.id);
        if(newData.length === data.length){
            return invalidId(req,res)
        }
        await fs.writeFile("./models/user.json", JSON.stringify(newData));
        res.writeHead(200, {"Content-Type" : "application/json"})
        res.end(JSON.stringify({message : "User Deleted!"}))
    }
    catch(err){
        catchErr(err, req, res)
    }
}

function generateID(){
    let num = "1234567890abcdefghijklmnopqrstuvwxwz"
    let id = ""
    for(let i = 0; i<6; i++){
        id += num.charAt(Math.floor(Math.random() * num.length))
    }
    return id;
}

function invalidId(req, res) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid Id entered" }));
}

function invalidJSON(req, res) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid JSON payload!" }));
}

function NotFoundController(req, res) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
}

function catchErr(err, req, res) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
}

export {httpServer,homeGETController, userGetController,userDataGetController, userPostController, userPutController, userDeleteController}
