class person {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log('HI')
    }
}

Object.prototype.myNew = function (ctx, ...args) {
    const obj = {}
    obj.__proto__ = ctx.prototype
    this.constructor.apply(obj, args)
    return obj
}

