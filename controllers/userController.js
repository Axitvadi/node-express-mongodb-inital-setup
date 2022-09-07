const User = require('../models/user')
const { prepareSuccessResponse } = require('../utils/responseHandler')

exports.getUser = async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id).select('-password')
  if (!user) {
    const error = new Error('User not found.')
    error.statusCode = 404
    throw error
  }

  const result = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone
  }

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'User retrieved successfully.'))
}

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password')

  const result = users.map((user) => {
    return {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone
    }
  })

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'Users retrieved successfully.'))
}

exports.updateUser = async (req, res) => {
  const id = req.params.id

  const preUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone
  }

  const user = await User.findByIdAndUpdate(id, preUser, { new: true })
  if (!user) {
    const error = new Error('Could not find user.')
    error.statusCode = 404
    throw error
  }

  const result = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone
  }

  return res
    .status(200)
    .json(prepareSuccessResponse(result, 'User updated successfully.'))
}

exports.deleteUser = async (req, res) => {
  const id = req.params.id
  const user = await User.findByIdAndRemove(id)
  if (!user) {
    const error = new Error('Could not find user.')
    error.statusCode = 404
    throw error
  }
  return res
    .status(200)
    .json(prepareSuccessResponse({}, 'User deleted successfully.'))
}
