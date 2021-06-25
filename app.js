const http = require('http');

const PORT = 3000;

const host = 'http://localhost:3000';

const min = 1;
const max = 100;
let newMin = min;
let newMax = max;

// Buttons for player actions
const buttons = `<a href="${host}/more"><button class="btn">More</button></a>
<a href="${host}/less"><button class="btn">Less</button></a>
<a href="${host}/bravo"><button class="btn">Bravo</button></a>`;

// Buttons to start over
const replay = `<a href="${host}/"><button class="btn">replay</button></a>`;

let makeGuess = (min, max) => {
    return Math.floor((max + min) / 2);
}

let guess = makeGuess(min, max);

const server = http.createServer((req, res) => {

    if (req.url === '/favicon.ico') {
        res.setHeader('content-type', 'imge/x-icon');
        res.end();
        return;
    }

    res.setHeader('Content-type', 'text/html; charset=utf-8');
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Number X</title>
    </head>
    <body>`);

    if (req.url === '/') {

        newMin = min;
        newMax = max;
        res.write(`Pick a number between ${min - min} and ${max} and help me finding it. Is your number ${guess} ?<br>${buttons}`);
    }

    else if (req.url === '/more') {
        newMin = guess++;
        guess = makeGuess(newMin, newMax);
        res.write(`Ok it's more... Is your number ${guess} ?<br>${buttons}`);
    }
    else if (req.url === '/less') {
        newMax = guess--;
        guess = makeGuess(newMin, newMax);
        res.write(`Ok it's less... Is your number ${guess} ?<br>${buttons}`);
    }
    else if (req.url === '/bravo') {
        res.write(`We found it ! Your number was ${guess}. Congratulations !<b>
            Would you like to play again ?<br>${replay}`);
        newMin = min;
        newMax = max;
        guess = makeGuess(min, max);
    } else {
        res.statusCode = 404;
        res.write(`Are you lost or something ? Help me find your number. Is it ${guess} ?<br>${buttons}`);
    }
    res.write(`</body>
    </html>`);

});

server.listen(3000, () => {
    console.log(`server listening on port ${PORT} at ${host}`);
});