const usersRouter = require('express').Router();

const { findAllUsers, createUser, findUserById, updateUser, deleteUser  } = require('../middlewares/users');
const { sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted } = require('../controllers/users');

usersRouter.get('/', findAllUsers, sendAllUsers);
usersRouter.post(
  "/users",
  findAllUsers,
  createUser,
  sendUserCreated
);
usersRouter.get('/:id', findUserById, sendUserById);
usersRouter.put('/:id',
  updateUser,
  sendUserUpdated,
);
usersRouter.delete('/:id', deleteUser, sendUserDeleted);

module.exports = usersRouter;
