import { rest } from 'msw';
import naver from './naver.json';

const RANKINGS = [
  {
    nickName: 'hello',
    rank: 1,
    profit: 0.3,
    yield: 9999,
  },
];

const SHARING = {
  myRank: 1,
  myNickname: '닉네임',
  myProfit: 1,
  myYield: 1,
  otherRanking: [
    {
      rank: 2,
      nickname: '닉네임',
      profit: 1,
      yield: 1,
    },
    {
      rank: 3,
      nickname: '닉네임',
      profit: 1,
      yield: 1,
    },
  ],
};

export const handlers = [
  rest.head(`${import.meta.env.VITE_API}/api/rankings`, (req, res, ctx) => {
    return req.passthrough();
    return res(ctx.set('X-Total-Count', '10000'));
  }),
  rest.head(`${import.meta.env.VITE_API}/api/stocks`, (req, res, ctx) => {
    return req.passthrough();
    return res(ctx.set('X-Total-Count', '900'));
  }),
  rest.get(`${import.meta.env.VITE_API}/api/stocks`, (req, res, ctx) => {
    return req.passthrough();
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
  rest.get(`${import.meta.env.VITE_API}/api/sharing`, (req, res, ctx) => {
    return req.passthrough();
    return res(ctx.delay(1323), ctx.json(SHARING));
  }),
];
