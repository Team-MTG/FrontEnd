import axios from 'axios';
import { atom, selector } from 'recoil';

const totalStockCountState = atom({
  key: 'totalStockCountState',
  default: selector({
    key: 'totalStockCountState/Default',
    get: async () => {
      const {
        headers: { 'x-total-count': stockCount },
      } = await axios.head(`${import.meta.env.VITE_API}/api/stocks`);
      if (stockCount === undefined) throw Error('네트워크 오류');
      return stockCount;
    },
  }),
});
export { totalStockCountState };

const totalUserCountState = atom({
  key: 'totalUserCountState',
  default: selector({
    key: 'totalUserCountState/Default',
    get: async () => {
      try {
        const {
          headers: { 'x-total-count': userCount },
        } = await axios.head(`${import.meta.env.VITE_API}/api/rankings`);
        return Number(userCount);
      } catch (error) {
        return 0;
      }
    },
  }),
});
export { totalUserCountState };
