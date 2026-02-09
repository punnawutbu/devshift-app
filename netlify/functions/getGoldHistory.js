const axios = require("axios");

function commonHeaders() {
  return {
    Accept: "application/json,text/plain,*/*",
    "Accept-Language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    Referer: "https://www.goldtraders.or.th/",
    Origin: "https://www.goldtraders.or.th",
    "Accept-Encoding": "gzip, deflate, br",

    // optional but often helps with WAF heuristics
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
  };
}

function okJson(body, extraHeaders = {}) {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      "Access-Control-Allow-Origin": "*",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

function errJson(statusCode, body) {
  return {
    statusCode: statusCode || 500,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
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
    const startDate = event.queryStringParameters?.startDate;
    const endDate = event.queryStringParameters?.endDate;

    if (!startDate || !endDate) {
      return errJson(400, {
        ok: false,
        message: "startDate and endDate are required",
      });
    }

    const url = `https://www.goldtraders.or.th/api/GoldPricesDaily/pricechanges?StartDate=${encodeURIComponent(
      startDate
    )}&EndDate=${encodeURIComponent(endDate)}`;

    const resp = await axios.get(url, {
      timeout: 12000,
      headers: commonHeaders(),
      validateStatus: () => true,
      responseType: "json",
    });

    if (resp.status < 200 || resp.status >= 300) {
      const rawText =
        typeof resp.data === "string"
          ? resp.data.slice(0, 800)
          : JSON.stringify(resp.data || {}).slice(0, 800);

      return errJson(resp.status, {
        ok: false,
        source: "goldtraders.history",
        status: resp.status,
        error: `Upstream HTTP ${resp.status}`,
        rawText,
      });
    }

    // ✅ คืน raw array ตรง ๆ
    return okJson(resp.data);
  } catch (err) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data;
    const rawText =
      typeof data === "string"
        ? data.slice(0, 800)
        : JSON.stringify(data || {}).slice(0, 800);

    return errJson(status, {
      ok: false,
      source: "goldtraders.history",
      status,
      message: "getGoldHistory failed",
      error: err?.message || String(err),
      rawText,
    });
  }
};
