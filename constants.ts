//constants.ts & types.ts: Define the underlying data structures
//(the "source of truth") for the visualizations and ensure the code is type-safe.

import { MarketData, EconomyNode } from './types';

export const MARKET_GROWTH_DATA: MarketData[] = [
  { year: 2015, marketSize: 15, skinEconomy: 8, digitalFashion: 0.5 },
  { year: 2016, marketSize: 22, skinEconomy: 12, digitalFashion: 0.8 },
  { year: 2017, marketSize: 35, skinEconomy: 18, digitalFashion: 1.2 },
  { year: 2018, marketSize: 52, skinEconomy: 28, digitalFashion: 2.1 },
  { year: 2019, marketSize: 78, skinEconomy: 45, digitalFashion: 3.5 },
  { year: 2020, marketSize: 110, skinEconomy: 65, digitalFashion: 5.2 },
  { year: 2021, marketSize: 156, skinEconomy: 92, digitalFashion: 12.4 },
  { year: 2022, marketSize: 190, skinEconomy: 115, digitalFashion: 18.1 },
  { year: 2023, marketSize: 245, skinEconomy: 145, digitalFashion: 28.5 },
  { year: 2024, marketSize: 310, skinEconomy: 180, digitalFashion: 42.0 },
];

export const ECONOMY_NODES: EconomyNode[] = [
  { id: '1', group: 'Platform', label: 'Roblox', value: 85 },
  { id: '2', group: 'Platform', label: 'Fortnite', value: 72 },
  { id: '3', group: 'Platform', label: 'Minecraft', value: 65 },
  { id: '4', group: 'Skin', label: 'CS:GO Skins', value: 95 },
  { id: '5', group: 'Skin', label: 'Dota 2 Items', value: 45 },
  { id: '6', group: 'Fashion', label: 'RTFKT', value: 55 },
  { id: '7', group: 'Fashion', label: 'Gucci Vault', value: 38 },
  { id: '8', group: 'Fashion', label: 'DressX', value: 25 },
  { id: '9', group: 'Asset', label: 'Metaverse Land', value: 60 },
  { id: '10', group: 'Asset', label: 'Virtual Cars', value: 30 },
];