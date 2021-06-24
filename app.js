const http = require('http');

const PORT = 3000;

const host = 'http://localhost:3000';

const min = 1;
const max = 100;
let newMin = 1;
let newMax = 100;

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

    res.setHeader('Content-type', 'text/html; charset=utf-8');
    
        if (req.url !== '/favicon.ico') {
            if (req.url === '/') {
            res.write(`Pick a number between ${min-1} and ${max} and help me finding it. Is your number ${guess} ?<br>${buttons}`);
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
            Would you like to replay ?<br>${replay}`);
            newMin = min;
            newMax = max;
            guess = makeGuess(min, max);
        } else {
            res.write(`Are you lost or something ? Help me find your number. Is it ${guess} ?<br>${buttons}`);
        }
    } else {
        res.write('');
    }
    res.end();
});

server.listen(3000, () => {
    console.log(`server listening on port ${PORT} at http://localhost:3000`);
});