import axios from 'axios';
import { atom, selector } from 'recoil';

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
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/rankings`, {
          params: { start: 1, end: 30 },
        });
        const rankings = res.data;
        return rankings;
      } catch (error) {
        return [];
      }
    },
  }),
});

export { rankingsState };
