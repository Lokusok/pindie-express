const globalRouter = require('express').Router();

const gamesRouter = require('./games');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');

globalRouter.use('/games', gamesRouter);
globalRouter.use('/categories', categoriesRouter);
globalRouter.use('/users', usersRouter);

module.exports = globalRouter;
