const utils = require('./utils')
const siwiJson = require('siwi-json')
const path = require('path')
const md5 = require('siwi-md5')
const unique = require('siwi-uniquestring')
class Faker {
    constructor() {
    }

    /**
     * 获取姓名
     * @param {*} length 
     */
    async username(length = 3) {
        const file = path.resolve('lib/json/chinese', 'user.json')
        const data = await siwiJson.getJson(file)
        const first_names = data['FIRST_NAME']
        
        let first_name = ''
        for (let i = 1; i < length; i++) {
            const first_index = await this.randomIndex(first_names.length)
            first_name += first_names[first_index]
        }
        
        const last_names = data['LAST_NAME']
        const last_index = await this.randomIndex(last_names.length)

        return `${last_names[last_index]}${first_name}`
    }

    /**
     * 名称
     */
    async firstName() {
        const file = path.resolve('lib/json/chinese', 'user.json')
        const data = await siwiJson.getJson(file)
        const first_names = data['FIRST_NAME']
        const first_index = await this.randomIndex(first_names.length)
        return `${first_names[first_index]}`
    }

    /**
     * 姓氏
     */
    async lastName() {
        const file = path.resolve('lib/json/chinese', 'user.json')
        const data = await siwiJson.getJson(file)
        const last_names = data['LAST_NAME']
        const last_index = await this.randomIndex(last_names.length)
        return `${last_names[last_index]}`
    }

    /**
     * 生成密码
     */
    async password() {
        const password = await unique.random()
        return await md5.sign(password)
    }

    /**
     * 生成邮箱
     */
    async email() {
        const file = path.resolve('lib/json/chinese', 'email.json')
        const email = await siwiJson.getJson(file)
        let suffix = email['SUFFIX']
        const index = await this.randomIndex(suffix.length)

        const body = await utils.rand()
        return `${body}${suffix[index]}`

    }

    /**
     * 生成手机号
     */
    async phone() {
        const file = path.resolve('lib/json/chinese', 'phone.json')
        const phone = await siwiJson.getJson(file)
        let prefix = []
        for (const key in phone) {
            prefix = prefix.concat(phone[key])
        }
        const index = await this.randomIndex(prefix.length)
        return `${prefix[index]}${Math.floor(Math.random(0,100000000)*100000000)}`
    }

    /**
     * 固定电话
     */
    async telephone() {
        const file = path.resolve('lib/json/chinese', 'telephone.json')
        const phone = await siwiJson.getJson(file)
        let prefix = []
        for (const key in phone) {
            prefix = prefix.concat(phone[key])
        }
        const index = await this.randomIndex(prefix.length)
        return `${prefix[index]}-${Math.floor(Math.random(0, 100000000) * 100000000)}`
    }

    /**
     * 邮政编码
     */
    async zipcode() {
        const file = path.resolve('lib/json/chinese', 'zipcode.json')
        const data = await siwiJson.getJson(file)
        const prefix = data['PREFIX']
        const index = await this.randomIndex(prefix.length)
        return `${prefix[index]}${Math.floor(Math.random(1000, 10000) * 9000)}`
    }

    /**
     * 获取中国省市区数据
     */
    async getChinese() {
        const file = path.resolve('lib/json/chinese', 'area.json')
        const data = await siwiJson.getJson(file)
        return data['CHINESE']
    }

    /**
     * 获取省
     */
    async province() {
        const chinese = await this.getChinese()
        const provinces = Object.keys(chinese)
        const index = await this.randomIndex(provinces.length)
        return provinces[index]
    }

    /**
     * 获取城市
     * @param {*} province 
     */
    async city(province = false) {
        if (!province) {
            province = await this.province()
        }
        const chinese = await this.getChinese()
        const cities = Object.keys(chinese[province])
        const index = await this.randomIndex(cities.length)
        return cities[index]
    }

    /**
     * 获取区/县
     * @param {*} city 
     * @param {*} province 
     */
    async county(city = false, province = false) {
        const chinese = await this.getChinese()
        if (!city && !province) {
            province = await this.province()
            city = await this.city(province)
        } else if (city) {
            const _province = await this.getProvinceByCity(city)
            province = _province == province ? province : _province
        } else if (province && !city) {
            city = await this.city(province)
        }
        const counties = chinese[province][city]
        const index = await this.randomIndex(counties.length)
        return counties[index]
    }

    /**
     * 获取地址
     * @param {*} province 
     * @param {*} city 
     * @param {*} county 
     */
    async address(province = false, city = false, county = false) {
        province = province ? province : await this.province()
        city = city ? city : await this.city(province)
        county = county ? county : await this.county(city, province)
        return `${province} ${city} ${county}`
    }

    /**
     * 根据城市获取省
     * @param {*} city 
     */
    async getProvinceByCity(city) {
        const chinese = await this.getChinese()
        for (const province in chinese) {
            if (Object.keys(chinese[province]).includes(city)) {
                return province
            }
        }
        return false
    }

    /**
     * 生成编码
     * @param {*} id 
     * @param {*} prefix 
     * @param {*} pad 
     * @param {*} length 
     */
    async code(id = false, prefix = 'POD', pad = '0', length = 15) {
        const len = length - prefix.length
        if (!id) {
            id = Math.floor(Math.random(0, 1000000) * 1000000)
        }
        return `${prefix}${String(id).padStart(len, pad)}`
    }

    /**
     * 虚拟订单
     */
    async order() {
        const id = Math.floor(Math.random(0, 100000)*100000)
        const province = await this.province()
        const city = await this.city(province)
        const county = await this.county(city, province)
        const data = {
            id: id,
            code: await this.code(id),
            mobile: await this.phone(),
            province: province,
            city: city,
            county: county,
            zipcode: await this.zipcode(),
            created: Math.floor(Date.now() / 1000),
            name: await this.username(),
            paymode: 'Wechat',
            logistics_company: '圆通',
            logistics_code: '',
            status: 1,
        }
        return data
    }

    /**
     * 从数组中随机返回指定个数
     * @param {Array} arr 
     * @param {Number} length 
     * @param {Boolean} unique 
     */
    async randomArray(arr, length = 1, unique = true) {
        if (arr.length < length) {
            return arr
        }
        const result = []
        for (let i = 0; i < length; i++) {
            const index = await this.randomIndex(arr.length)
            const item = arr[index]
            result.push(item)
            if (unique) {
                arr.splice(index, 1)
            }
        }
        return result
    }
    /**
     * 随机字符串
     * @param {*} str 
     * @param {*} length 
     */
    async randomStr(str, length, unique= false) {
        if (length > str.length) {
            return str
        }
        let result = ''
        for (let i = 0; i < length; i++) {
            const index = await this.randomIndex(str.length)
            result += str[index]
        }
        return result
    }
    
    /**
     * 随机索引
     * @param {*} length 
     */
    async randomIndex(length) {
        return Math.floor(Math.random(0, length) * length)
    }
}

module.exports = new Faker()