import { atom, selector } from 'recoil';

const gameSeedState = atom({
  key: 'gameSeedState',
  default: null,
});
export { gameSeedState };

const gameOverState = atom({
  key: 'gameOverState',
  default: false,
});
export { gameOverState };

const gameRoundState = atom({
  key: 'gameRoundState',
  default: 0,
});
export { gameRoundState };

const tradeLogState = atom({
  key: 'TradeLogState',
  default: { buy: [], sell: [] },
});
export { tradeLogState };

const roundLogState = atom({
  key: 'roundLogState',
  default: [],
});
export { roundLogState };
