// 节流throttle
export const throttle = <T extends (...args: any[]) => any>(fn: T, wait: number) => {
  let last = 0
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      return fn.apply(this, args)
    }
  }
}

// 获取随机数
export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 转换时间为中国时间 并且转换字符串
export const formatCNTime = (utcTime: string) => {
  return new Date(utcTime).toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour12: false,
  })
}