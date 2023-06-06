const userModel = require('../../model/userModel')

async function getUser(userEmail) {
  const result = await userModel.findOne({email: userEmail})
  return result
}

function getAllUsers() {
  const result = userModel.find()
  return result
}

async function deleteUserById(id) {
  await userModel.deleteOne({_id: id})
}
function updateUserInfo(email, information) {
  const result = userModel.updateOne({email: email},
      {$set: {information: information}})
  return result
}

module.exports = {getUser, getAllUsers, deleteUserById, updateUserInfo}

