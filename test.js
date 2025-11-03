const test1 = [1, 2]
const test2 = JSON.parse(JSON.stringify(test1))

test2[0] = 3

console.log(test1)
console.log(test2)