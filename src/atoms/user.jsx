import { atom } from 'recoil';

const userTradingLogList = atom({
  key: 'userTradingLogList',
  default: [],
});

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
