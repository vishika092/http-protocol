import http from "http"
import url from 'url'
import fs from "fs/promises"

let port = 8080;

let server = http.createServer(async (req, res) => {
    console.log(`request received from Client : `, req.socket.remoteAddress);
    // to log Request HTTP method
    console.log(req.method);


    const parsedURL = url.parse(req.url, true)
    
    let data = await fs.readFile("3_data.js");
    data = JSON.parse(data);
    let cityData = data.filter((cityDetail) => {
        return (cityDetail.name == parsedURL.query.city);
    })

    if(cityData.length == 0){
        res.end("City Not Found !!");
        return;
    }

    let [city] = cityData;
    city = JSON.stringify(city);
    res.end(city);   
})

server.listen(port, () => {
    console.log("server running at ", port);
})
