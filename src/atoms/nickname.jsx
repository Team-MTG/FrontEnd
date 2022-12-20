import { atom } from 'recoil';

const nickname = atom({
  key: 'nickname',
  default: { nick: 'NoName' },
});

export { nickname };
