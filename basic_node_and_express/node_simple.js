// Here we require in the 'events' module and save a reference to it in an events variable
let events = require('events');

let listenerCallback = (data) => {
    console.log('Celebrate ' + data);
}

// create an event emitter
let myEmitter = new events.EventEmitter();

// assign listerner callback function to a named event
myEmitter.on('celebration', listenerCallback);

// emit a 'celebration' event
myEmitter.emit('celebration', 'creativity')

//-----------------------------
let { testNumber } = require('./game.js');

process.stdout.write("I'm thinking of a number from 1 through 10. What do you think it is? \n(Write \"quit\" to give up.)\n\nIs the number ... ");

let playGame = (userInput) => {
    let input = userInput.toString().trim();
    testNumber(input);
};

process.stdin.on('data', playGame)


//_____________________________
const api = require('./api.js');

// Not an error-first callback
let callbackFunc = (data) => {
    console.log(`Something went right. Data: ${data}\n`);
};

try {
    api.naiveErrorProneAsyncFunction('problematic input', callbackFunc);
} catch (err) {
    console.log(`Something went wrong. ${err}\n`);
}

//_____________________________
const fs = require('fs');

let secretWord = "cheeseburgerpizzabagels";

let wordSearch = (err, data) => {
    if (err) {
        console.log(`Something went wrong: ${err}`);
    } else {
        console.log(`Provided file contained: ${data}`);
    }
};

fs.readFile('./finalFile.txt', 'utf-8', wordSearch)


// Readable Streams
const readline = require('readline');
const fs = require('fs');

const myInterface = readline.createInterface({
    input: fs.createReadStream('shoppingList.txt')
})

const printData = (data) => {
    console.log(`Item: ${data}`)
}

myInterface.on('line', printData)


// Create an HTTP Server
const http = require('http');
let { requestListener } = require('./callbackFile.js');
const PORT = process.env.PORT || 4001;

const server = http.createServer(requestListener)

server.listen(PORT)