import http from "http";
import url from "url";


let port = 80;

let server = http.createServer((req, res) => {
  try {
    if (req.method === "GET") {
      const parsedURL = url.parse(req.url, true);
      let obj = parsedURL.query;

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      if (obj.name && parsedURL.pathname == "/greet") {
        res.end(JSON.stringify({ message: ` Hello, ${obj.name}` }));
      } else if (parsedURL.pathname == "/greet") {
        res.end(JSON.stringify({ message: "Hello, Guest!" }));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "NOT found !" }));
      }


    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const data = JSON.parse(body);
        res.statusCode = 200;
        if (data.name && data.age) {
          res.end(
            JSON.stringify({
              message: `Received data for ${data.name} who is ${data.age} years old.`,
            })
          );
        } 
        
        else {
          res.statusCode = 404;
          res.end(
            JSON.stringify({ error: "Missing name or age in request body." })
          );
        }


      });
    }
    else{
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Internal Server Error!" }));
    }
  } 
  catch(err){
    res.statusCode = 500;
      res.end(JSON.stringify({ message: "Something Went Wrong. Try Again." }));
  }
  
})

server.listen(port, () => {
  console.log("server running at ", port);
});
