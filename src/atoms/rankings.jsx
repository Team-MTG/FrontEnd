import axios from 'axios';
import { atom, selector } from 'recoil';

const rankingsState = atom({
  key: 'rankings',
  default: selector({
    key: 'rankings/Default',
    get: async () => {
      const res = await axios.get('/api/rankings');
      const rankings = res.data.rankings;
      return rankings;
    },
  }),
});

export { rankingsState };
