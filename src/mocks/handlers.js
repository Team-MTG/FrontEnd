import { rest } from 'msw';
import test1 from './test2.json';
import test2 from './testStock.json';

export const handlers = [
  rest.get('/api/stocks', (req, res, ctx) => {
    return res(
      ctx.delay(1234),
      ctx.json({
        stocks: [test1, test2, test1, test2, test1],
      })
    );
  }),
  rest.get('/api/rankings', (req, res, ctx) => {
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
            rank: 3,
            profit: 20,
            total: 10000,
          },
          {
            id: '127',
            name: 'hyeonzii',
            rank: 3,
            profit: 20,
            total: 10000,
          },
          {
            id: '128',
            name: 'hyeonzii',
            rank: 3,
            profit: 20,
            total: 10000,
          },
          {
            id: '129',
            name: 'hyeonzii',
            rank: 3,
            profit: 20,
            total: 10000,
          },
          {
            id: '130',
            name: 'hyeonzii',
            rank: 3,
            profit: 20,
            total: 10000,
          },
        ],
      })
    );
  }),
];
