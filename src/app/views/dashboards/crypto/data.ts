// Crypto Coin Data
const CryptoCoinData = [
  {
    id: 1,
    icon: 'assets/img/crypto/bitcoin.svg',
    icon_name: "Bitcoin",
    icon_type: "BTC",
    price: "$ 33.568,60",
    persantage: "+12.4%",
    persantage_type: "success-color",
    chart: "assets/img/crypto/bitcoin_chart.svg",
  },
  {
    id: 2,
    icon: 'assets/img/crypto/ethereum.svg',
    icon_name: "Ethereum",
    icon_type: "ETH",
    price: "$ 1.367,82",
    persantage: "-0.2%",
    persantage_type: "danger-color",
    chart: "assets/img/crypto/ethereum_chart.svg",
  },
  {
    id: 3,
    icon: 'assets/img/crypto/litecoin.svg',
    icon_name: "Litecoin",
    icon_type: "LTC",
    price: "$ 132,71",
    persantage: "+2.4%",
    persantage_type: "success-color",
    chart: "assets/img/crypto/litecoin_chart.svg",
  },
  {
    id: 4,
    icon: 'assets/img/crypto/ethereum.svg',
    icon_name: "Ethereum",
    icon_type: "ETH",
    price: "$ 1.367,82",
    persantage: "-0.2%",
    persantage_type: "danger-color",
    chart: "assets/img/crypto/ethereum_chart.svg",
  },
];

// Market Data
const MarketData = [
  {
    id: 1,
    icon: 'assets/img/crypto/litecoin.svg',
    icon_name: "LTC/USD",
    time: "March",
    price: "$120.25",
    persantage: "1.24%",
    persantage_type: "success-color"
  },
  {
    id: 2,
    icon: 'assets/img/crypto/bitcoin.svg',
    icon_name: "BTC/USD",
    time: "January",
    price: "$149.50",
    persantage: "2.24%",
    persantage_type: "danger-color"
  },
  {
    id: 3,
    icon: 'assets/img/crypto/ethereum.svg',
    icon_name: "ETH/USD",
    time: "February",
    price: "$220.25",
    persantage: "3.27%",
    persantage_type: "success-color"
  },
  {
    id: 4,
    icon: 'assets/img/crypto/xrp.svg',
    icon_name: "XRP/USD",
    time: "June",
    price: "$210.25",
    persantage: "2.27%",
    persantage_type: "success-color"
  },
  {
    id: 5,
    icon: 'assets/img/crypto/bitcoin.svg',
    icon_name: "BTC/USD",
    time: "April",
    price: "$100.25",
    persantage: "1.49%",
    persantage_type: "danger-color"
  },
];

// Recent Data
const recentData = [
  {
      id: 1,
      icon: "uil uil-arrow-down",
      type: "danger",
      title: "Sell Bitcoin",
      time: "4min ago",
      price: "- $100.21",
  },
  {
    id: 2,
    icon: "uil uil-arrow-up",
    type: "success",
    title: "Buy Ethereum",
    time: "7min ago",
    price: "+ $500",
  },
  {
    id: 3,
    icon: "uil uil-arrow-up",
    type: "success",
    title: "Buy Litecoin",
    time: "8min ago",
    price: "- $250",
  },
  {
    id: 4,
    icon: "uil uil-arrow-down",
    type: "danger",
    title: "Sell Bitcoin",
    time: "January 24th, 2021 at 12:15 AM",
    price: "- $330",
  },
  {
    id: 5,
    icon: "uil uil-arrow-up",
    type: "success",
    title: "Buy Ripple",
    time: "January 24th, 2021 at 2:15 AM",
    price: "+ $250",
  },
];

export { CryptoCoinData, MarketData, recentData };
