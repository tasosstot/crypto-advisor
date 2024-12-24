import axios from "axios";

const API_BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = "2FOTEQF1B1KZQQAN";

export const fetchCryptoData = async (
  symbol = "BTC",
  market = "USD",
  interval = "15min"
) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        function: "CRYPTO_INTRADAY",
        symbol,
        market,
        interval,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};
