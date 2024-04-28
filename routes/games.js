const gamesRouter = require('express').Router();

const { sendAllGames, sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted } = require('../controllers/games');
const { findAllGames, createGame, findGameById, updateGame, deleteGame, checkEmptyFields, checkIfCategoriesAvaliable, checkIfUsersAreSafe } = require('../middlewares/games');

gamesRouter.get('/', findAllGames, sendAllGames);
gamesRouter.post('/', findAllGames, checkEmptyFields, createGame, sendGameCreated);
gamesRouter.get('/:id', findGameById, sendGameById);
gamesRouter.put(
  "/:id",
  findGameById,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  updateGame,
  sendGameUpdated
); 
gamesRouter.delete('/:id', deleteGame, sendGameDeleted);

module.exports = gamesRouter;
