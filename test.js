const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const x = getRandomNumber(1, 5)
console.log(x)