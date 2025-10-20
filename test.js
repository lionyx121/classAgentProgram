const test = [
    { className: '左边信号', classKey: '1', pride: 0.5, time: '2025-10-15T18:40:41.265+00:00' },
]

const obj = { id: '左边信号', cosine: 0.3 }

const target = test.find(target => target.className === obj.id)
target.pride += obj.cosine
console.log(test)
