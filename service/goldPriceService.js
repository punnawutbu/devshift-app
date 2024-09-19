const request = require("request");
const cheerio = require("cheerio");
const nodeCache = require("node-cache");

const cache = new nodeCache();
const cacheKey = "thaiGold";
const urlGTA = "https://www.goldtraders.or.th/default.aspx";
const monthTh = {
  "01": "มกราคม",
  "02": "กุมภาพันธ์",
  "03": "มีนาคม",
  "04": "เมษายน",
  "05": "พฤษภาคม",
  "06": "มิถุนายน",
  "07": "กรกฎาคม",
  "08": "สิงหาคม",
  "09": "กันยายน",
  "10": "ตุลาคม",
  "11": "พฤศจิกายน",
  "12": "ธันวาคม",
};

const getGoldPrice = () => {
  return new Promise((resolve, reject) => {
    let data = cache.get(cacheKey);

    if (!data) {
      request(urlGTA, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          let dateTime = $("#DetailPlace_uc_goldprices1_lblAsTime > b > font")
            .text()
            .split(" ");
          let date = dateTime[0].split("/");
          let update_time = `${dateTime[1]} ${dateTime[2]} ${dateTime[3]}`;
          let gold_sell = $(
            "#DetailPlace_uc_goldprices1_lblOMSell > b > font"
          ).text();
          let gold_buy = $(
            "#DetailPlace_uc_goldprices1_lblOMBuy > b > font"
          ).text();
          let goldBar_sell = $(
            "#DetailPlace_uc_goldprices1_lblBLSell > b > font"
          ).text();
          let goldBar_buy = $(
            "#DetailPlace_uc_goldprices1_lblBLBuy > b > font"
          ).text();
          data = {
            buy_bar: goldBar_buy,
            sell_bar: goldBar_sell,
            buy_ornament: gold_buy,
            sell_ornament: gold_sell,
            date: `${date[0]} ${monthTh[date[1]]} ${date[2]}`,
            time: `${dateTime[4]} ${dateTime[5]}`,
            updatetime: update_time,
          };
          cache.set(cacheKey, data, 120);
          resolve(data);
        } else {
          console.log(`Error fetching gold price: ${error}`);
          resolve(null);
        }
      });
    } else {
      resolve(data);
    }
  });
};

module.exports = { getGoldPrice };
