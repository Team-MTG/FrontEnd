import axios from 'axios';
import { selectorFamily } from 'recoil';

const stocksState = selectorFamily({
  key: 'stocksState',
  get: (stockIndexesList) => async () => {
    if (stockIndexesList.length === 0) {
      return [];
    }
    const { data: stocks } = await axios.get(`${import.meta.env.VITE_API}/api/stocks`, {
      params: { index: stockIndexesList },
      paramsSerializer: {
        indexes: null,
      },
    });
    return stocks;
  },
});

export { stocksState };
