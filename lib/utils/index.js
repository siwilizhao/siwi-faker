let instance = null
class Utils {
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance
    }

    /**
     * call_user_func
     * @param {*} 类名
     * @param {*} 方法名
     * @param {*} 参数
     */
    async callUserFunc(className, methodName, params) {
        try {
            const HandlerClass = require(`../models/${className}`)
            const handlerClass = new HandlerClass()
            if (Reflect.ownKeys(HandlerClass.prototype).includes(methodName)) {
                return await handlerClass[methodName](params)
            } else {
                console.log('not find method')
                return false
            }
        } catch (error) {
            console.trace(error)
            return false
        }
    }
    
    /**
     * 生成 0到n
     * @param {*} length 
     */
    async randomIndex(length) {
        if (!length) {
            return false
        }
        return Math.floor(Math.random(0, length) * length)
    }
    /**
     * 字母数字随即组合
     */
    async rand() {
        const arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 0 ,1,2,3,4,5,6,7,8,9]
        const length = Math.floor(Math.random(2,10)*10)
        let str = ''
        for (let index = 0; index < length; index++) {
            const index = await this.randomIndex(arr.length)
            str+= arr[index]
        }
        return str
    }
}

module.exports = new Utils()