const functions = {
    /**
     * 
     * @param {number} min 
     * @param {number} max 
     * @returns a number randomly between min and max
     */
    getRandomNumber: (min, max) => {
        return Math.floor(Math.random(min + max) * max - min);
    },
    /**
     * 
     * @param {number} min 
     * @param {number} max 
     * @returns a number half way between min and max
     */
    makeGuess: (min, max) => {
        return Math.floor((max + min) / 2);
    }
}

module.exports = functions;