const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const cart = require('../services/cartLogics')
const {getUser} = require('../db/queries/userQueries')
const {mockCart} = require('../mockData/mockCartData')
const {user, item} = mockCart()


// describe('Testing Mock', function() {
//   it('count function', function() {
//     const mock = sinon.mock(cart)
//     console.log(user)
//     const expt = mock.expects('createNewCart')
//     expt.exactly(1)
//     expt.withArgs(user, item)
//     cart.ifUserHasNoCart(user, item)
//     mock.verify()
//   })
// })

describe('hahahahah', function() {
  it('Yessir', function() {
    const obj1 = getUser('sarthak@gmail.com')
    console.log(obj1)
    expect(obj1).to.be.a('Promise')
  })
})


