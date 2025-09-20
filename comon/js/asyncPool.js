// 异步并发池
/**
 * maxCount 异步并发池最大并行数量
 * runningCount 异步并发池当前正在运行的数量
 * taskList 异步并发池任务队列
 * 
 */
class asycnPoolClass {
    constructor(maxCount = 6) {
        this.maxCount = maxCount
        this.runningCount = 0
        this.taskList = []
    }

    // 将异步任务加入异步队列中
    _add(task) {
        return new Promise((resolve, reject) => {
            this.taskList.push({
                task,
                resolve,
                reject
            })
            this._run()
        })
    }

    // 从异步任务队列中取出一个任务执行
    _run() {
        // 只有当当前异步池中正在执行的任务数量小于最大并行数量 && 异步并发池任务队列中还有任务
        while (this.runningCount < this.maxCount && this.taskList.length) {
            const { task, resolve, reject } = this.taskList.shift()
            // 异步并发池当前正在运行的数量++
            this.runningCount++
            // 执行任务
            task().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            }).finally(() => {
                this.runningCount--
                this._run()
            })
        }
    }
}


module.exports = asycnPoolClass
