const bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var https = require('https');
const path = require('path');

//var privateKey = fs.readFileSync('./key.pem', 'utf8');
//var certificate = fs.readFileSync('./cert.pem', 'utf8');

//var credentials = { key: privateKey, cert: certificate, passphrase: '789456123' };
var express = require('express');
var app = express();
var dapp = express();
const upload = require('express-fileupload');

var cors = require('cors');
var _month;

app.use(upload());
app.use('/public', express.static(__dirname + '/public'));

// your express configuration here

app.use(bodyParser.json());

app.use(express.urlencoded({
    extended: true
}));
const ftp = require("basic-ftp");



app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*'/*'X-Requested-With,content-type'*/);

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    // Pass to next layer of middleware
    next();
});

var corsOptions = {
    origin: ['http://localhost:3000/', 'https://donations.treepoets.com/'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

example();

async function example() {

try {

    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "ftp.slash-dapp.com",
            user: "ftpNew@slash-dapp.com",
            password: "Rochana@123",
            secure: true,
            secureOptions: {
                rejectUnauthorized: false, // Bypass SSL verification (not recommended for production)
            },
        })
        console.log(await client.list())
        await client.uploadFrom("./uploads/3.txt", "./uploads/3.txt");
        await client.downloadTo("./uploads/3.txt", "./uploads/3.txt");
    }
    catch(err) {
        console.log(err)
    }
    client.close();
    console.log("DONE?");


} catch (err) {

    console.log("error :" + err);
}

app.listen(process.env.PORT || 5000, () => {
    console.log("running on port 5000");
});
}