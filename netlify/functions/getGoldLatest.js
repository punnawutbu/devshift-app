const axios = require("axios");

const API_URL =
  "https://www.goldtraders.or.th/api/GoldPrices/Latest?readjson=true";

const CACHE_KEY = "GOLD_LATEST";
const CACHE_TTL_SEC = 10;

let memoryCache =
  global.__goldLatestCache || (global.__goldLatestCache = new Map());

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

function commonHeaders() {
  // ทำให้เหมือนเรียกจาก browser มากขึ้น (ช่วยแก้ 403 จาก WAF ได้บ่อย)
  return {
    Accept: "application/json,text/plain,*/*",
    "Accept-Language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    Referer: "https://www.goldtraders.or.th/",
    Origin: "https://www.goldtraders.or.th",
    // บาง WAF ชอบ header นี้
    Connection: "keep-alive",
  };
}

function okJson(body, extraHeaders = {}) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

function errJson(statusCode, body) {
  return {
    statusCode: statusCode || 500,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  // เผื่อมี preflight (ป้องกันไว้)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  try {
    const cached = getCache();
    if (cached) return okJson(cached, { "x-cache": "HIT" });

    const res = await axios.get(API_URL, {
      timeout: 8000,
      headers: commonHeaders(),
      // เผื่อ upstream ส่ง non-2xx จะได้เข้า catch เดิม
      validateStatus: () => true,
    });

    if (res.status < 200 || res.status >= 300) {
      // สำคัญ: ส่ง status จริงกลับ (เช่น 403) จะได้ debug ง่าย
      const rawText =
        typeof res.data === "string"
          ? res.data.slice(0, 800)
          : JSON.stringify(res.data || {}).slice(0, 800);

      return errJson(res.status, {
        ok: false,
        source: "goldtraders.latest",
        status: res.status,
        error: `Upstream HTTP ${res.status}`,
        rawText,
      });
    }

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

      // เก็บ raw ไว้ (แต่ถ้ากังวล payload ใหญ่ค่อยปิด)
      raw: p,
    };

    setCache(data);

    return okJson(data, { "x-cache": "MISS" });
  } catch (err) {
    // axios error แบบจริงจัง
    const status = err?.response?.status || 500;
    const data = err?.response?.data;
    const rawText =
      typeof data === "string"
        ? data.slice(0, 800)
        : JSON.stringify(data || {}).slice(0, 800);

    return errJson(status, {
      ok: false,
      source: "goldtraders.latest",
      status,
      error: err?.message || "Unknown error",
      rawText,
    });
  }
};
