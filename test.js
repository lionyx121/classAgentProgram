const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

var dailyTemperatures = function (temperatures) {
    const ans = Array(temperatures.length).fill(0)
    const stack = [0]
    for (let i = 1; i < temperatures.length; i++) {
        while (true) {
            // 如果栈的长度为0, 存下标
            if (stack.length === 0) {
                stack.push(i)
                break
            }
            const temperaturesVal = temperatures[i]
            const stackVal = temperatures[stack[stack.length - 1]]
            // 如果temperaturesVal > stackVal 更新栈
            if(temperaturesVal > stackVal){
                const index = stack.pop()
                // 去更新答案
                ans[index] = i - index
            }
            // 如果temperaturesVal <= stackVal 存下标
            if(temperaturesVal <= stackVal){
                stack.push(i)
                break
            }
        }
    }
    return ans
};

const res = dailyTemperatures(temperatures)
console.log(res)