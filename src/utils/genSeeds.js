import { generateRandomNumList } from './random';

const genSeeds = (number, stockCount) => {
  const stocksIndex = generateRandomNumList(number, stockCount - 1);
  const parts = generateRandomNumList(number, 9);

  const seeds = stocksIndex.map((stock, index) => {
    const seed = '' + stock + parts[index];
    return '0'.repeat(4 - seed.length) + seed;
  });
  console.log(seeds);
  return seeds;
};
export default genSeeds;
