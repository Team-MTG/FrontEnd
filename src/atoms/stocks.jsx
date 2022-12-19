import axios from 'axios';
import { atom, selector } from 'recoil';

const stockLogListState = atom({
  key: 'StockLogList',
  default: selector({
    key: 'StockLogList/Default',
    get: async () => {
      const res = await axios.get('/api/stocks');
      const stockLogList = res.data.stocks;
      return stockLogList;
    },
  }),
});

export { stockLogListState };
