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
      const res = await axios.get(
        `${import.meta.env.VITE_API}/api/sharing?sharedNumber=${encodeURIComponent(shareNum)}`
      );
      console.log(shareNum);
      console.log(res.data);
      const sharings = res.data;
      return sharings;
    },
});

export { sharingsState };
