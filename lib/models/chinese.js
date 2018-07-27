const Faker = require('../index')
const { chinese } = require('../data/area')
const utils = require('../utils/index')
class Chinese extends Faker {
    constructor() {
        super()
    }
    async username() {

    }
    async password() {

    }
    async email() {

    }
    async phone() {

    }
    async telephone() {

    }
    async zipcode() {

    }
    async address() {

    }

    /**
     * 获取省
     */
    async province() {
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
        const cities = Object.keys(chinese[province])
        const index = await utils.random(cities.length)
        return cities[index]
    }

    /**
     * 获取区/县
     * @param {*} city 
     * @param {*} province 
     */
    async district(city = false, province = false) {

    }

    /**
     * 获取地址
     */
    async address() {
        const province = await this.province()
        const city = await this.city(province)
        const district = await this.district(city)
        return `${province}${city}${district}`
    }

    /**
     * 根据城市获取省
     * @param {*} city 
     */
    async getProvinceByCity(city) {
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

module.exports = new Chinese()