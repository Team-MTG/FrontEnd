import { atom } from 'recoil';

const gameOverState = atom({
  key: 'gameOverState',
  default: false,
});
export { gameOverState };
