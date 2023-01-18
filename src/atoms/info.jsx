import axios from 'axios';
import { atom, selector } from 'recoil';

const totalUserCountState = atom({
  key: 'totalUserCountState',
  default: selector({
    key: 'totalUserCountState/Default',
    get: async () => {
      try {
        const {
          headers: { 'x-total-count': total },
        } = await axios.head(`${import.meta.env.VITE_API}/api/rankings`);
        return Number(total);
      } catch (error) {
        return 0;
      }
    },
  }),
});
export { totalUserCountState };
