import { atom } from 'recoil';

const userNameState = atom({
  key: 'userName',
  default: '',
});
export { userNameState };

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
