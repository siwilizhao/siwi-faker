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
    async random(length) {
        if (!length) {
            return false
        }
        return Math.floor(Math.random(0, length) * length)
    }
}

module.exports = new Utils()