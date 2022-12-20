import axios from 'axios';
import { atom, selector } from 'recoil';
import { generateRandomNumList } from '../utils/random';

const stocksState = atom({
  key: 'Stocks',
  default: selector({
    key: 'Stocks/Default',
    get: async () => {
      const res = await axios.get(`${import.meta.env.API}/api/stocks`, {
        params: { index: generateRandomNumList(5, 27) },
        paramsSerializer: {
          indexes: null,
        },
      });
      return res.data.stocks;
    },
  }),
});

export { stocksState };
