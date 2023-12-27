const { Router } = require("express");
const User = require("./models/User");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get("/users", checkAuth({ transient: true }), async (req, res, next) => {
  if (req.user) {
    req.query.id = req.user.id;
  }
  const users = await User.findAll({
    where: req.query,
  });
  res.json(users);
});

router.use(checkAuth());

router.post("/users", async (req, res, next) => {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/users/:id", async (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id)) return res.sendStatus(403);
  const user = await User.findByPk(parseInt(req.params.id));
  if (!user) res.sendStatus(404);
  else res.json(user);
});