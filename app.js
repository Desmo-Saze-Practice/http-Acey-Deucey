// TODO

const http = require('http');

const functions = require('./functions');

const PORT = 3000;

const host = 'http://localhost:3000';

let min = 1;
let max = 100;

let makeGuess = (min, max) => {
    return Math.floor((max + min) / 2);
}

let guess = makeGuess(min, max);
// let target = functions.getRandomNumber(min, max);

const server = http.createServer((req, res) => {

    res.setHeader('Content-type', 'text/html; charset=utf-8');

    // if (req.url !== '/favicon.ico') {
    if (req.url !== '/favicon.ico') {
        if (req.url === '/') {
            res.write(`Pick a number and help me finding it by using the routes /more /less /bravo.<br>Is your number ${guess} ?`);
        }

        else if (req.url === '/more') {
            console.log(guess, min, max);
            min = guess;
            guess = makeGuess(min, max);
            res.write(`ok it's more... Is your number ${guess} ? Use one of these routes : /more /less /bravo to proceed.<br>
            `);
            console.log(guess, min, max);
        }
        else if (req.url === '/less') {
            max = guess;
            guess = makeGuess(min, max);
            res.write(`ok it's less... Is your number ${guess} ? Use one of these routes : /more /less /bravo to proceed.`);
        }
        else if (req.url === '/bravo') {
            res.write(`We found it ! Your number was ${guess}. Congratulations !`);
        } else {
            res.write(`Are you lost or something ? Help me find your number by using one of these routes : /more /less /bravo.<br>Is your number ${guess} ?`);
        }
    } else {
        res.write('');
    }
    res.end();
});

server.listen(3000, () => {
    console.log(`server listening on port ${PORT} at http://localhost:3000`);
})