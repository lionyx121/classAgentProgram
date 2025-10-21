let str = '$ y(t) xxxxxxx sdjakldjskl  $'
let ans = ''

const strList = str.split('')
for (let i = 0; i < strList.length; i++) {
    if ((strList[i] === ' ' && str[i - 1] === '$') || (strList[i] === ' ' && str[i + 1] === '$')) {
        continue
    }
    ans += strList[i]
}

console.log(ans)