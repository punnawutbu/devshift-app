const axios = require("axios");

function commonHeaders() {
  return {
    Accept: "application/json,text/plain,*/*",
    "Accept-Language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    Referer: "https://www.goldtraders.or.th/",
    Origin: "https://www.goldtraders.or.th",
    Connection: "keep-alive",
  };
}

function okJson(body) {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function errJson(statusCode, body) {
  return {
    statusCode: statusCode || 500,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
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
      message: "getGoldHistory failed",
      status,
      error: err?.message || String(err),
      rawText,
    });
  }
};
