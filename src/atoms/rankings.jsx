import axios from 'axios';
import { atom, selector } from 'recoil';
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
      return [
        {
          nickname: 'n',
          rank: 1,
          profit: 1.2,
          yield: 999,
        },
      ];
      if (get(userRankState) === 0) {
        return null;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_API}/api/rankings/${encodeURIComponent(get(pageNum))}`
      );
      const rankings = res.data;
      return rankings;
    },
  }),
});

export { rankingsState };
