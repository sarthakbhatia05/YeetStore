const chai = require('chai')
const assert = chai.assert
const should = chai.should()
const expect = chai.expect

describe('aspect Check', function() {
  const username = 'Sarthak'
  it('check string', function() {
    assert.typeOf(username, 'string')
  })

  it('is equal', function() {
    assert.equal(username, 'Sarthak')
  })
  it('length match', function() {
    assert.lengthOf(username, 7)
  })
})

describe('Should Check', function() {
  const userName = 'Sarthak'
  it('check string', function() {
    userName.should.be.a('string')
  })
  it('equal', function() {
    userName.should.equal('Sarthak')
  })
})

describe('Expect Check', function() {
  const userName = 'Sarthak'
  const obj1 = {
    item: [{
      id: 1,
      name: 'Tshirt',
    }],
    title: 'Clothes',
    address: [{
      phone_no: [999999999],
      country: 'India',
    }],
  }
  it('check string', function() {
    expect(userName).to.be.a('string')
  })
  it('equal', function() {
    expect(userName).to.equal('Sarthak')
  })

  it('Test Object', function() {
    expect(obj1).to.have.property('item').with.lengthOf(1)
  })

  it('all keys are present', function() {
    expect(obj1).to.have.all.keys('item', 'title', 'address')
  })
  it('contains phone no', function() {
    expect(obj1).to.have.nested.property('address[0].phone_no[0]')
  })

  it('Country check', function() {
    expect(obj1).to.have.nested.include({'address[0].country': 'India'})
  })
})
