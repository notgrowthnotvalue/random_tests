let express = require('express'); // import web application framework 'express'
let bodyParser = require('body-parser') // used to parse data coming from POST requests

let app = express();  // spin express server

// when user visits root level, show "Hello Express"
app.get("/", function (req, res) {
    res.send("Hello Express")
})

// variables with paths 
const absolutePath = __dirname + '/views/index.html'
const newPath = __dirname + '/public'

// show index.hmtl when access root level
app.get('/', function (req, res) {
    res.sendFile(absolutePath)
})

// get route parameter input from the client
app.get('/:word/echo', (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word
    })
})

// get route parameter input from the client using using a query string 
app.get('/name', (req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.json({
        name: `${firstName} ${lastName}`
    })
})

// Middleware examples

// middleware to handle URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

// get data from post request
app.post('/name', (req, res) => {
    const string = req.body.first + " " + req.body.last;
    res.json({ name: string })
})

// middlware that responds with a JSON object that shows time
app.get('/now', function (req, res, next) {
    req.time = new Date().toString()
    next();
}, function (req, res) {
    res.json(
        { "time": req.time }
    )
})

// middleware that logs out method, path, and ip
app.use(simpleLogger)

function simpleLogger(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
}

// middleware that will serve assets (css) from '/public'
app.use("/public", express.static(newPath))

// if enviromental variable MESSAGE_STYLE equals 'uppercase'
// respond with json that is capitalized 
// else do not capitalize
app.get('/json', function (req, res) {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json(
            { "message": "HELLO JSON" }
        )
    }
    res.json(
        { "message": "Hello json" }
    )
})

module.exports = app;