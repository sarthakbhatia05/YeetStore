const schemas = {
  model_schema: 'myLibrary',
  user_schema: 'users',
  product_schema: 'products',
  order_schema: 'orders',
  cart_schema: 'cart',
  wishlist_schema: 'wishlist',
}

const errors = {
  wrongPhoneNumError: 'Enter correct phone number !',
  couldNotDownload: 'Could Not Download',
  userAlreadyRegistered: ' Already Registered',
  userNotRegistered: 'User not registered',
  wrongPassword: 'Check your password again',
  invalidCredentials: 'Invalid Email/Password',
  alreadyInWishlist: 'Product already in wishlist',
}

const sortBy = {
  price: 'pricehightolow',
}
const orderStatus = {
  orderPending: 'pending',
  orderCompleted: 'completed',
  orderPlaced: 'placed',
}

const pdfFormat = 'Letter'
module.exports = {schemas, errors, orderStatus, pdfFormat, sortBy}
