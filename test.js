const p = new Promise((res, rej) => {
    res(1)
}).then(val => {
    console.log('then', val)
}).finally((val) => {
    console.log('finally', val)
})
