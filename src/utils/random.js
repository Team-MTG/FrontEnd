const generateRandomNumList = (len, bound) => {
  const rands = new Array(len);
  const randSet = new Set();
  for (let i = 0; i < len; ++i) {
    let rand = Math.floor(Math.random() * bound);
    while (randSet.has(rand)) {
      rand = Math.floor(Math.random() * bound);
    }
    rands.push(rand);
    randSet.add(rand);
  }
  return rands;
};

export { generateRandomNumList };
