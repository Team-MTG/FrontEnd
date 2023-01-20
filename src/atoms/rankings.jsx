import axios from 'axios';
import { atom, selector } from 'recoil';
import { totalUserCountState } from './info';
import { userRankState } from './user';

const pageNum = atom({
  key: 'pageNum',
  default: 1,
});
export { pageNum };

const rankList = atom({
  key: 'rankList',
  default: [],
});
export { rankList };

const isLoaded = atom({
  key: 'isLoaded',
  default: false,
});
export { isLoaded };

const rankingsState = atom({
  key: 'rankingsState',
  default: selector({
    key: 'rankingsState/Default',
    get: async ({ get }) => {
      if (get(userRankState) === 0) {
        return null;
      }
      const res = await axios.get(`${import.meta.env.VITE_API}/api/rankings`, {
        params: { start: 1, end: get(totalUserCountState) },
      });
      const rankings = res.data;
      console.log(rankings);
      return rankings;
    },
  }),
});

export { rankingsState };
