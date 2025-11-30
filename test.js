const test = () => {
    setTimeout(() => {
        return {
            data1: 'data1',
            data2: 'data2',
        }
    }, 50)
}

// 测试异步函数
test().then(data => {
    console.log(data)
})
