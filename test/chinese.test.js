const expect = require('chai').expect
const chinese = require('../lib/models/chinese')
describe('lib/models/chinese.js', () => {
    // it('province', async() => {
    //     const r = await chinese.province()    
    //     console.log(r)
    // });
    // it('city', async () => {
    //     const r = await chinese.city('山西')
    //     console.log(r)
    // });
    // it('getProvinceByCity', async () => {
    //     const r = await chinese.getProvinceByCity('长安市')
    //     console.log(r)
    // });
    it('code', async() => {
        const r = await chinese.code()
        console.log(r)
    });
});