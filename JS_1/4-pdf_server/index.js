import http from 'http';
import https from "https"
import url from 'url';
import fs from 'fs';

let port = 8080;
let httpsPort = 443;

let students = ["ATANU", "DHINKAR", "HENRY", "UTSAV_KUMAR", "VISHIKA", "SAAD", "ZOHEB"];

let httpServer = http.createServer((req, res) => {
    let httpsURL = `https://${req.headers.host}/${req.url}`
    res.writeHead(301, {location : httpsURL})
    res.end()
});

let httpsServer = https.createServer((req, res) => {
    reportCardDetails(req, res);
})


httpServer.listen(port, () => {
    console.log("Server running at port", port);
});
httpsServer.listen(httpsPort, ()=> {
    console.log("https Server Running at port", httpsPort);
})


function reportCardDetails(req, res) {
    const parseUrl = url.parse(req.url, true);
    let studentName = parseUrl.query.studentname;

    if (req.method === "GET" && parseUrl.pathname === "/report" && studentName && students.includes(studentName.toUpperCase())) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/pdf');

        // Create a readable stream for the PDF file
        const readStream = fs.createReadStream(`./pdfs/${studentName.toUpperCase()}.pdf`);

        // Pipe the readable stream to the response
        readStream.pipe(res);

    } else {
        res.statusCode = 404;
        res.end("NOT Found!!");
    }
}

