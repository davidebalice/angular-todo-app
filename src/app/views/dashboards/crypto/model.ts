// Crypto Coin Model
export interface CryptoCoinModel {
  id: any;
  icon: string;
  icon_name: string;
  icon_type: string;
  price: string;
  persantage: string;
  persantage_type: string;
  chart: string;
}

// Market Model
export interface MarketModel {
  id: any;
  icon: string;
  icon_name: string;
  time: string;
  price: string;
  persantage: string;
  persantage_type: string;
}

// Recent Model
export interface RecentModel {
  id: any;
  icon: string;
  type: string;
  title: string;
  time: string;
  price: string;
}
