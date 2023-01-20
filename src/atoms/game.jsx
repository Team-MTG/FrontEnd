import { atom, selector } from 'recoil';

const gameSeedState = atom({
  key: 'gameSeedState',
  default: null,
});
export { gameSeedState };

const gameRoundState = atom({
  key: 'gameRoundState',
  default: 0,
});
export { gameRoundState };

const roundLogState = atom({
  key: 'roundLogState',
  default: [],
});
export { roundLogState };
