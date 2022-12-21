import axios from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import { generateRandomNumList } from '../utils/random';

const stocksState = selectorFamily({
  key: 'stocksState',
  get: (stocksNumber) => async () => {
    const {
      data: { stocks },
    } = await axios.get(`${import.meta.env.VITE_API}/api/stocks`, {
      params: { index: generateRandomNumList(stocksNumber, 27) },
      paramsSerializer: {
        indexes: null,
      },
    });
    return stocks;
  },
});

export { stocksState };
