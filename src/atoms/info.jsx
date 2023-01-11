import axios from 'axios';
import { atom, selector } from 'recoil';

export const totalRankedUserState = atom({
  key: 'totalRankedUserState',
  default: selector({
    key: 'totalRankedUserState/Default',
    get: async () => {
      try {
        const {
          headers: { 'x-total-count': total },
        } = await axios.head(`${import.meta.env.VITE_API}/api/rankings`, {
          timeout: 2000,
        });
        return Number(total);
      } catch (error) {
        return 0;
      }
    },
  }),
});
