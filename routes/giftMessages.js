const express = require("express");
const router = express.Router();
const fs = require("fs");
require("dotenv").config();

function readMessages() {
  try {
    const file = fs.readFileSync("./data/gift-message.json");
    const data = JSON.parse(file);
    return data;
  } catch (error) {
    console.error("Error reading gift messages:", error.message);
    return [];
  }
}

router.post("/", (req, res) => {
  const giftMessage = {
    gifter: "Billy",
    message: req.body.gift_message,
  };

  console.log(giftMessage);

  const data = readMessages();
  data.push(giftMessage);
  const stringified = JSON.stringify(data);
  fs.writeFileSync("./data/gift-message.json", stringified);
  res.status(201).json(giftMessage);

  res.status(200).send("Data received successfully");
});

module.exports = router;
