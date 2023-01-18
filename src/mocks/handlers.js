import { rest } from 'msw';
import naver from './naver.json';

const RANKINGS = [
  {
    userId: '1234',
    name: 'hello',
    rank: 1,
    rate: 0.3,
    totalCash: 9999,
  },
];

export const handlers = [
  rest.head(`${import.meta.env.VITE_API}/api/rankings`, (req, res, ctx) => {
    // return req.passthrough();
    return res(ctx.set('X-Total-Count', '10000'));
  }),
  rest.get(`${import.meta.env.VITE_API}/api/stocks`, (req, res, ctx) => {
    // return req.passthrough();
    return res(ctx.json([naver, naver, naver, naver, naver, naver]));
  }),
  rest.post(`${import.meta.env.VITE_API}/api/rankings`, async (req, res, ctx) => {
    return req.passthrough();
    const { name, totalCash, rate } = await req.json();
    RANKINGS.push({
      userId: RANKINGS.length + 1,
      name,
      rank: RANKINGS.length + 1,
      rate,
      totalCash,
    });
    return res(
      ctx.delay(2000),
      ctx.json({
        userId: RANKINGS.length,
        name,
        rank: RANKINGS.length,
        rate,
        totalCash,
      })
    );
  }),
  rest.get(`${import.meta.env.VITE_API}/api/rankings`, (req, res, ctx) => {
    return req.passthrough();
    return res(
      ctx.delay(1323),
      ctx.json({
        rankings: RANKINGS,
      })
    );
  }),
];
