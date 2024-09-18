const express = require('express');
const router = express.Router();
const { getGoldPrice } = require('../services/goldPriceService');

router.get("/gold-price", async (req, res) => {
  try {
    const goldPrice = await getGoldPrice();
    res.json(goldPrice); // ส่งข้อมูลเป็น JSON
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
