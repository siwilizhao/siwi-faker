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
            const first_index = await utils.random(first_names.length)
            first_name += first_names[first_index]
        }
        
        const last_names = data['LAST_NAME']
        const last_index = await utils.random(last_names.length)

        return `${last_names[last_index]}${first_name}`
    }
    async firstName() {
        const file = path.resolve('lib/json/chinese', 'user.json')
        const data = await siwiJson.getJson(file)
        const first_names = data['FIRST_NAME']
        const first_index = await utils.random(first_names.length)
        return `${first_names[first_index]}`
    }
    async lastName() {
        const file = path.resolve('lib/json/chinese', 'user.json')
        const data = await siwiJson.getJson(file)
        const last_names = data['LAST_NAME']
        const last_index = await utils.random(last_names.length)
        return `${last_names[last_index]}`
    }
    async password() {
        const password = await unique.random()
        return await md5.sign(password)
    }
    async email() {
        const file = path.resolve('lib/json/chinese', 'email.json')
        const email = await siwiJson.getJson(file)
        let suffix = email['SUFFIX']
        const index = await utils.random(suffix.length)

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
        const index = await utils.random(prefix.length)
        return `${prefix[index]}${Math.floor(Math.random(0,100000000)*100000000)}`
    }
    async telephone() {

    }
    async zipcode() {

    }
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
        const index = await utils.random(provinces.length)
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
        const index = await utils.random(cities.length)
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
        const index = await utils.random(counties.length)
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
        const chinese = this.getChinese()
        for (const index in chinese) {
            if (Object.keys(chinese[index]).includes(city)) {
                return index
            }
        }
        return false
    }

    /**
     * 
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
}

module.exports = new Faker()