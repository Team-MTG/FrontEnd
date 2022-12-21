import axios from 'axios';
import { atom, selector } from 'recoil';
import { gameOverState } from './game';

const userNameState = atom({
  key: 'userNameState',
  default: '',
});
export { userNameState };

const userRankState = atom({
  key: 'userRankState',
  default: selector({
    key: 'userRankState/Default',
    get: async ({ get }) => {
      if (get(gameOverState) === false) {
        return 0;
      }
      const res = await axios.post(`${import.meta.env.VITE_API}/api/rankings`, {
        name: get(userNameState),
        totalCash: get(userCashState),
        rate: get(userRateState) * 100,
      });
      console.log(res);
      return res.data.rank;
    },
  }),
});
export { userRankState };

const userCashState = atom({
  key: 'userCashState',
  default: 5000000,
});
export { userCashState };

const userRateState = selector({
  key: 'userRateState',
  get: ({ get }) => {
    const userCash = get(userCashState);
    return userCash / 5000000 - 1;
  },
});
export { userRateState };

const userTradingLogListState = atom({
  key: 'userTradingLogList',
  default: [],
});
export { userTradingLogListState };

/* 
[
  {
    phase: 0,
    [
      {
        action: 'buy',
        price: 2000,
        date: '2021-03-05'
      },
      {
        action: 'sell',
        price: 2000,
        date: '2021-03-08'
      }
    ]
  }
]

*/
