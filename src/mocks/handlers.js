import { rest } from 'msw';
import test1 from './test2.json';
import test2 from './testStock.json';

export const handlers = [
  rest.get(`${import.meta.env.VITE_API}/api/stocks`, (req, res, ctx) => {
    console.log(req);
    return res(
      ctx.delay(1234),
      ctx.json({
        stocks: [
          { stockname: '삼성전자', log: test1 },
          { stockname: '현대차', log: test2 },
          { stockname: '엘지', log: test2 },
          { stockname: '테슬라', log: test1 },
          { stockname: '뿅', log: test2 },
        ],
      })
    );
  }),
  rest.get(`${import.meta.env.VITE_API}/api/rankings`, (req, res, ctx) => {
    return res(
      ctx.delay(1323),
      ctx.json({
        rankings: [
          {
            id: '123',
            name: 'hsmroof',
            rank: 1,
            profit: 90,
            total: 90000,
          },
          {
            id: '124',
            name: 'hacho',
            rank: 2,
            profit: 30,
            total: 30000,
          },
          {
            id: '125',
            name: 'hyeonzii',
            rank: 3,
            profit: 20,
            total: 10000,
          },
          {
            id: '126',
            name: 'hyeonzii',
            rank: 4,
            profit: 20,
            total: 10000,
          },
          {
            id: '127',
            name: 'hyeonzii',
            rank: 5,
            profit: 20,
            total: 10000,
          },
          {
            id: '128',
            name: 'hyeonzii',
            rank: 6,
            profit: 20,
            total: 10000,
          },
          {
            id: '129',
            name: 'hyeonzii',
            rank: 7,
            profit: 20,
            total: 10000,
          },
          {
            id: '130',
            name: 'hyeonzii',
            rank: 8,
            profit: 20,
            total: 10000,
          },
        ],
      })
    );
  }),
];
