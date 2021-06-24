const functions = {
    getRandomNumber: (min, max) => {
        return Math.floor(Math.random(min + max) * max - min);
    },
    makeGuess: (min, max) => {
        return Math.floor((max + min) / 2);
    }
}

module.exports = functions;