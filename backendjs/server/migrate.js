const connection = require("./models/db.js");
require("./models/User");

connection
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .then(() => connection.close());
