const expect = require('chai').expect
describe('utils.js', () => {
    const utils = require('../lib/utils/')
    it('random',async () => {
        const length = 34
        const r = await utils.random(34)
        console.log(r)
        expect(r).to.be.a('number')
        const f = await utils.random()
        console.log(f)
        expect(f).to.equal(false)
    });
});