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
  rest.get(`${import.meta.env.VITE_API}/api/stocks`, (req, res, ctx) => {
    console.log(req);
    return res(
      ctx.delay(1234),
      ctx.json({
        stocks: [naver, naver, naver, naver, naver, naver],
      })
    );
  }),
  rest.post(`${import.meta.env.VITE_API}/api/rankings`, async (req, res, ctx) => {
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
    return res(
      ctx.delay(1323),
      ctx.json({
        rankings: RANKINGS,
      })
    );
  }),
  rest.post(`${import.meta.env.VITE_API}/api/rankings`, (req, res, ctx) => {
    console.log(req);
    return res(
      ctx.json({
        isSuccess: true,
      })
    );
  }),
];
