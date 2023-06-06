/* eslint-disable require-jsdoc */
function userInfo(req, res) {
  const information = {
    user: res.locals.user,
    phone: req.body.phone,
    address: {
      country: req.body.country,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pin,
    },
  }

  return information
}

module.exports = userInfo
