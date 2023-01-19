import axios from 'axios';
import { selector } from 'recoil';
import { gameSeedState } from './game';

const stockState = selector({
  key: 'stockState',
  get: async ({ get }) => {
    const gameSeeds = get(gameSeedState);
    if (gameSeeds === null) throw Error('올바른 시드가 아닙니다.');
    const {
      data: { stockAverages, stockPrices },
    } = await axios.get(`${import.meta.env.VITE_API}/api/stocks`, {
      params: { seed: gameSeeds },
      paramsSerializer: {
        indexes: null,
      },
    });
    return stockPrices.map((stock, index) => ({
      ...stock,
      avgProfit: stockAverages[index].userAverageProfit,
    }));
  },
});
export { stockState };
