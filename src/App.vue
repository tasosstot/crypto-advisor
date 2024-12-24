<template>
  <div>
    <h1>Crypto Advisor</h1>
    <p>Your cryptocurrency trading assistant</p>
    <button @click="getCryptoData">Fetch Cryptocurrency Data</button>

    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color: red">{{ error }}</div>

    <ul v-if="cryptoData.length">
      <li v-for="(data, index) in cryptoData" :key="index">
        Time: {{ data.time }}, Price: ${{ data.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchCryptoData } from "./services/api";

export default {
  name: "App",
  data() {
    return {
      cryptoData: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async getCryptoData() {
      this.loading = true;
      this.error = null;
      try {
        const rawData = await fetchCryptoData();
        const parsedData = this.parseCryptoData(rawData);
        this.cryptoData = parsedData;
      } catch (err) {
        this.error = "Failed to fetch cryptocurrency data.";
      } finally {
        this.loading = false;
      }
    },
    parseCryptoData(rawData) {
      const timeSeries = rawData["Time Series (Digital Currency Intraday)"];
      if (!timeSeries) {
        this.error = "No data available for the selected cryptocurrency.";
        return [];
      }

      // Map the time series data into an array of objects
      return Object.entries(timeSeries).map(([time, values]) => ({
        time,
        price: parseFloat(values["1a. price (USD)"]).toFixed(2),
      }));
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

h1 {
  color: #333;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  font-size: 16px;
}
</style>
