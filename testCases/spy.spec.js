const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const cart = require('../controller/cartController')

describe('check function', function() {
  it('function count', function() {
    const spyObj = sinon.spy(cart.changeQty, 'findIndexOfProduct')
    cart.changeQty()
    expect(spyObj.calledWith(1, 2)).to.be.true
  })
})
