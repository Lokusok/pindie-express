const games = require('../models/game');

const findAllGames = async (req, res, next) => {
  req.gamesArray = await games.find({})
    .populate('categories')
    .populate({
      path: 'users',
      select: '-password',
    });
  next();
};

const createGame = async (req, res, next) => {
  try {
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.status(400).send("Error creating game");
  }
};

const findGameById = async (req, res, next) => {
  try {
    req.game = await games.findById(req.params.id)
      .populate('categories')
      .populate({
        path: 'users',
        select: '-password',
      });
  next();
  } catch (error) {
    res.status(404).send({ message: "Game not found" });
  }
}; 

const updateGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка обновления игры" });
  }
};

const deleteGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.status(400).send({ message: "Error deleting game" });
  }
};

const checkEmptyFields = async (req, res, next) => {
  if(req.isVoteRequest) {
    next();
    return;
  } 

  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
    // а ответим кодом 400 — данные неверны.
    res.status(400).send({ message: "Заполни все поля" });
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
};

// Файл middlewares/games.js

const checkIfCategoriesAvaliable = async (req, res, next) => {
  if(req.isVoteRequest) {
    next();
    return;
  } 

  // Проверяем наличие жанра у игры
  if (!req.body.categories || req.body.categories.length === 0) {
    res.headers = { "Content-Type": "application/json" };
    res.status(400).send({ message: "Выбери хотя бы одну категорию" });
  } else {
    next();
  }
};

// Файл middlewares/games.js

const checkIfUsersAreSafe = async (req, res, next) => {
  // Проверим, есть ли users в теле запроса
  if (!req.body.users) {
    next();
    return;
  }
  // Cверим, на сколько изменился массив пользователей в запросе
  // с актуальным значением пользователей в объекте game
  // Если больше чем на единицу, вернём статус ошибки 400 с сообщением
  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res
      .status(400)
      .send(
        "Нельзя удалять пользователей или добавлять больше одного пользователя"
      );
  }
};

const checkIsVoteRequest = async (req, res, next) => {
  // Если в запросе присылают только поле users
  if (Object.keys(req.body).length === 1 && req.body.users) {
    req.isVoteRequest = true;
  }
  next();
}; 

module.exports = {
  checkIsVoteRequest,
  findAllGames,
  createGame,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe,
};
