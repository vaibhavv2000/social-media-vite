const NumberConvertor = (num: number) => {
  if (num < 999) return num;

  if (num > 999 && num <= 999999) return `${(num / 1000).toFixed(0)}K`;

  if (num > 999999 && num <= 999999999) return `${(num / 1000000).toFixed(0)}M`;

  if (num > 999999999) return `${(num / 1000000000).toFixed(0)}B`;
};

export default NumberConvertor;