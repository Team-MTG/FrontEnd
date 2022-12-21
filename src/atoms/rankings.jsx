import axios from 'axios';
import { atom, selector } from 'recoil';
import { userRankState } from './user';

const rankingsState = atom({
  key: 'rankingsState',
  default: selector({
    key: 'rankingsState/Default',
    get: async ({ get }) => {
      if (get(userRankState) === 0) {
        return null;
      }
      const res = await axios.get(`${import.meta.env.VITE_API}/api/rankings`);
      const rankings = res.data;
      return rankings;
    },
  }),
});

export { rankingsState };
