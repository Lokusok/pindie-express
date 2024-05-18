const apiRouter = require("express").Router(); 
const gamesRouter = require("./games");
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const authRouter = require('./categories');

apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", categoriesRouter);
apiRouter.use("/api", gamesRouter); 

module.exports = apiRouter; 
