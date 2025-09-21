const test = '123'

let t = 0
let timer = setInterval(() => {
    if (t > 100) {
        clearInterval(timer)
    } else {
        test += '1'
    }
}, 100)

let showData = ''
const typeWriter = (num) => {
    setInterval(() => {
        if (showData.length < test.length) {
            showData += test[showData.length]
            console.log(showData)
        }
    }, 25)
}
typeWriter()

