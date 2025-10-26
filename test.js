
let text = '（注意：有时需要归一化因子，如 $ 1/2\pi $，取决于傅里叶变换的定义方式）'
let ans = ''
const strList = text.split('')
for (let i = 0; i < strList.length; i++) {
    if ((strList[i] === ' ' && strList[i - 1] === '$') || (strList[i] === ' ' && strList[i + 1] === '$')) {
        continue
    }
    ans += strList[i]
}
console.log(ans)
