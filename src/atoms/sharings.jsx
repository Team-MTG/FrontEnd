import axios from 'axios';
import { atom, selector, selectorFamily } from 'recoil';

const shareList = atom({
  key: 'shareList',
  default: [],
});
export { shareList };

const sharingsState = selectorFamily({
  key: 'sharingsState',
  get:
    (shareNum) =>
    async ({ get }) => {
      const { data: sharings } = await axios.get(
        `${import.meta.env.VITE_API}/api/sharing?sharedNumber=${encodeURIComponent(shareNum)}`
      );
      const { data: rankings } = await axios.get(`${import.meta.env.VITE_API}/api/rankings`, {
        params: { start: 1, end: 30 },
      });

      return { ...sharings, rankings };
    },
});

export { sharingsState };
