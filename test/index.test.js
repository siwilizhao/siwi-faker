const expect = require('chai').expect
const chinese = require('../index')
describe('lib/models/chinese.js', () => {
    // it('province', async() => {
    //     const r = await chinese.province()    
    //     console.log(r)
    // });
    // it('city', async () => {
    //     const r = await chinese.city()
    //     console.log(r)
    // });
    it('county', async () => {
        const r = await chinese.county()
        console.log(r)
    });
    // it('phone', async () => {
    //     const r = await chinese.phone()
    //     console.log(r)
    // });
    // it('email', async () => {
    //     const r = await chinese.email()
    //     console.log(r)
    // });
    // it('getProvinceByCity', async () => {
    //     const r = await chinese.getProvinceByCity('长安市')
    //     console.log(r)
    // });
    // it('code', async() => {
    //     const r = await chinese.code()
    //     console.log(r)
    // });
    // it('username', async() => {
    //     for (let i = 0; i < 10000; i++) {
    //         const r = await chinese.username()
    //         console.log(r)
    //     }

    // });
    // it('firstname', async() => {
    //     const r = await chinese.firstName()
    //     console.log(r)
    // });
    // it('lastname', async() => {
    //     const r = await chinese.lastName()
    //     console.log(r)
    // });
    // it('password', async() => {
    //     const r = await chinese.password()
    //     console.log(r)
    // });
});