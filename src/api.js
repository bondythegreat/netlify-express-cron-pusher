const express = require("express");
const serverless = require("serverless-http");
const pusherController = require("../controllers/Pusher.controller");

const app = express();

const router = express.Router();
router.get("/", pusherController.index);
router.get("/stop", pusherController.stop);
router.get("/about", (req, res) => {
  res.json({ msg: "hello about" });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
