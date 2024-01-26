const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");
require("dotenv").config();

function readAddresses() {
  const file = fs.readFileSync("./data/addresses.json");
  const data = JSON.parse(file);
  return data;
}

router.get("/", (req, res) => {
  const data = readAddresses();
  res.json(data);
});

router.post("/", (req, res) => {
  const newAddress = {
    id: crypto.randomUUID(),
    name: req.body.name,
    apartment_number: req.body.apartment_number,
    streetname: req.body.streetname,
    city: req.body.city,
    postcode: req.body.postcode,
    phone: req.body.phone,
  };
  const data = readAddresses();
  data.push(newAddress);
  const stringified = JSON.stringify(data);
  fs.writeFileSync("./data/addresses.json", stringified);
  res.status(201).json(newAddress);
});

module.exports = router;
