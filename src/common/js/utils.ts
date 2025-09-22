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

