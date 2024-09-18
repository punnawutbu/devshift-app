const express = require("express");
const app = express();
const goldPriceRoutes = require('./routes/goldPriceRoutes');

// ฟังก์ชันเริ่มต้นเซิร์ฟเวอร์
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ใช้เส้นทางราคาทองคำ
app.use('/api', goldPriceRoutes);

// เริ่มการทำงานของเซิร์ฟเวอร์
const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
