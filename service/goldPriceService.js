const request = require("request");
const cheerio = require("cheerio");
const nodeCache = require("node-cache");

const axios = require("axios");
const { Container } = require("postcss");

const API_CACHE_KEY = "thaiGold_api";
const API_URL = "https://static-gold.tothanate.workers.dev/";

const cache = new nodeCache();
const count = 0;
const cacheKey = "thaiGold";
const GTA_URL = "https://www.goldtraders.or.th/default.aspx";

const getGoldPrice = () => {
  return new Promise((resolve, reject) => {
    let data = cache.get(cacheKey);

    if (!data) {
      request(GTA_URL, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html);
          let dateTime = $("#DetailPlace_uc_goldprices1_lblAsTime > b > font")
            .text()
            .split(" ");
          let date = dateTime[0].split("/");
          let update_time = `${dateTime[1]} ${dateTime[2]} ${dateTime[3]}`;
          let gold_sell = $(
            "#DetailPlace_uc_goldprices1_lblOMSell > b > font",
          ).text();
          let gold_buy = $(
            "#DetailPlace_uc_goldprices1_lblOMBuy > b > font",
          ).text();
          let goldBar_sell = $(
            "#DetailPlace_uc_goldprices1_lblBLSell > b > font",
          ).text();
          let goldBar_buy = $(
            "#DetailPlace_uc_goldprices1_lblBLBuy > b > font",
          ).text();
          data = {
            buy_bar: goldBar_buy,
            sell_bar: goldBar_sell,
            buy_ornament: gold_buy,
            sell_ornament: gold_sell,
            date: `${date[0]} ${date[1]} ${date[2]}`,
            time: `${dateTime[4]} ${dateTime[5]}`,
            updatetime: update_time,
          };
          cache.set(cacheKey, data, 120);
          resolve(data);
          // console.log("Get gold price from website");
          // console.log(`Response: ${JSON.stringify(data)}`);
        } else {
          console.log(`Error fetching gold price: ${error}`);
          resolve(null);
        }
      });
    } else {
      resolve(data);
      // console.log("Get gold price from cache");
      // console.log(`Cache Response: ${JSON.stringify(data)}`);
    }
  });
};

const getGoldPriceFromGTA = async () => {
  try {
    const cached = cache.get(API_CACHE_KEY);
    if (cached) return cached;

    const response = await axios.get(API_URL, {
      timeout: 5000,
      headers: { Accept: "application/json" },
    });

    const payload = response.data ?? {};

    const history = Array.isArray(payload.history)
      ? payload.history
      : [];

    const latest = history.at(-1) ?? null;

    const normalized = {
      source: "api",

      metadata: payload.metadata ?? null,

      current: payload.current_prices ?? null,

      history, // ✅ สำคัญ

      latest: latest && {
        time: latest.time ?? null,
        bar_buy: latest.bar_buy ?? null,
        bar_sell: latest.price ?? null,
        ornament_buy: latest.ornament_buy ?? null,
        ornament_sell: latest.ornament_sell ?? null,
        usd_thb: latest.usd_thb ?? null,
        gold_spot: latest.gold_spot ?? null,
        note: latest.note ?? null,
      },
    };

    cache.set(API_CACHE_KEY, normalized, 60);

    return normalized;
  } catch (error) {
    console.error("API gold price error:", error.message);
    return null;
  }
};

module.exports = { getGoldPrice, getGoldPriceFromGTA };
