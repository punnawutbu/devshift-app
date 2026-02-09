const axios = require("axios");

const API_URL =
  "https://www.goldtraders.or.th/api/GoldPrices/Latest?readjson=true";

const CACHE_KEY = "GOLD_LATEST";
const CACHE_TTL_SEC = 10;

let memoryCache = global.__goldLatestCache || (global.__goldLatestCache = new Map());

function getCache() {
  const hit = memoryCache.get(CACHE_KEY);
  if (!hit) return null;
  if (Date.now() > hit.exp) return null;
  return hit.val;
}
function setCache(val) {
  memoryCache.set(CACHE_KEY, {
    val,
    exp: Date.now() + CACHE_TTL_SEC * 1000,
  });
}

exports.handler = async () => {
  try {
    const cached = getCache();
    if (cached) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify(cached),
      };
    }

    const res = await axios.get(API_URL, {
      timeout: 5000,
      headers: { Accept: "application/json" },
    });

    const p = res.data || {};

    const data = {
      source: "goldtraders.latest",
      goldPriceID: p.goldPriceID ?? null,
      asTime: p.asTime ?? null,
      seq: p.seq ?? null,
      priceSeq: p.priceSeq ?? null,

      // bar
      bar_buy: p.bL_BuyPrice ?? null,
      bar_sell: p.bL_SellPrice ?? null,

      // ornament 96.5
      orn_buy: p.oM965_BuyPrice ?? null,
      orn_sell: p.oM965_SellPrice ?? null,

      // meta
      usd_thb: p.bahtPerUSD ?? null,
      gold_spot: p.goldSpot ?? null,

      // change
      change_prev: p.priceChangeFromPrevRow ?? null,
      change_day: p.priceChangeFromPrevDayLast ?? null,

      raw: p,
    };

    setCache(data);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    const message = err?.message || "Unknown error";
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: message }),
    };
  }
};
