const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/",(req, res, next)=>{
  res.send("Bonjour"+JSON.stringify(req.query.text));
});

app.post("/", (req, res, next) => {
  res.send("Un mari aimant" + JSON.stringify(req.body));
});



app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
