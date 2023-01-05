const prettyKorNum = (num) => {
  const units = ['', '만', '억', '조', '경'];
  return units.reduce((prev, unit, index) => {
    if (num > 0) {
      if (index > 1) {
        prev = prev.substring(0, prev.lastIndexOf(units[index - 1])) + units[index - 1];
      }
      const split = num % 10000;
      num = Math.floor(num / 10000);
      if (split === 0) return prev;
      return split.toLocaleString('ko-kr') + unit + prev;
    }
    return prev;
  }, '');
};

export default prettyKorNum;
