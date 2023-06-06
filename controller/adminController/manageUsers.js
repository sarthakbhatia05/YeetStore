/* eslint-disable require-jsdoc */
const {getAllUsers, deleteUserById} = require('../../db/queries/userQueries')
async function showUsers(req, res, next) {
  try {
    const users = await getAllUsers()
    res.render('admin/usersdata', {user: users})
  } catch (err) {
    next(err)
  }
}

async function deleteUser(req, res, next) {
  try {
    const userid = req.query.id
    deleteUserById(userid)
    res.redirect('/admin/users')
  } catch (err) {
    next(err)
  }
}


module.exports = {showUsers, deleteUser}
