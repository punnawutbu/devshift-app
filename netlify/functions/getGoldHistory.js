const axios = require("axios");

exports.handler = async (event) => {
  try {
    const startDate = event.queryStringParameters?.startDate;
    const endDate = event.queryStringParameters?.endDate;

    if (!startDate || !endDate) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "startDate and endDate are required" }),
      };
    }

    const url = `https://www.goldtraders.or.th/api/GoldPricesDaily/pricechanges?StartDate=${encodeURIComponent(
      startDate
    )}&EndDate=${encodeURIComponent(endDate)}`;

    const resp = await axios.get(url, {
      timeout: 8000,
      headers: { Accept: "application/json" },
    });

    // ✅ คืน raw array ตรง ๆ
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
      body: JSON.stringify(resp.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: "getGoldHistory failed",
        error: err?.message || String(err),
      }),
    };
  }
};
