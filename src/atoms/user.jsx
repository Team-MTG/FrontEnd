import axios from 'axios';
import { atom, selector } from 'recoil';
import { SEED_MONEY } from '../config';
import { roundLogState } from './game';

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
      const roundLog = get(roundLogState);
      const userName = get(userNameState);
      const body = {
        nickname: userName,
        totalYield: get(userBalanceState) - SEED_MONEY,
        totalProfit: get(userRateState) * 100,
        gameInfo: roundLog,
      };
      console.log(body);
      if (userName === '') {
        throw new Error('비정상적인 Ranking 등록');
      }
      const res = await axios.post(`${import.meta.env.VITE_API}/api/rankings`, body);
      console.log(res.data);
      return res.data;
    },
  }),
});
export { userRankState };

const userBalanceState = atom({
  key: 'userBalanceState',
  default: SEED_MONEY,
});
export { userBalanceState };

const userRateState = selector({
  key: 'userRateState',
  get: ({ get }) => {
    const userCash = get(userBalanceState);
    return userCash / SEED_MONEY - 1;
  },
});
export { userRateState };

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
