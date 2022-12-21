import axios from 'axios';
import { atom, selector } from 'recoil';

const rankingsState = atom({
  key: 'rankingsState',
  default: selector({
    key: 'rankingsState/Default',
    get: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API}/api/rankings`);
      const rankings = res.data.rankings;
      return rankings;
    },
  }),
});

export { rankingsState };
