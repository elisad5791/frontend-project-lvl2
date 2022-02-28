const formatPlain = (diff) => {
  const changes = diff.filter((item) => item[3] !== 'saved')
    .map((item) => {
      const status = item[3];

      const path = item[0].join('.');
      const firstVal = (typeof item[1] === 'string' && item[1] !== '[complex value]') ? `'${item[1]}'` : item[1];
      const secondVal = (typeof item[2] === 'string' && item[2] !== '[complex value]') ? `'${item[2]}'` : item[2];

      const commonPart = `Property '${path}' was ${status}`;
      const addedPart = ` with value: ${secondVal}`;
      const updatedPart = `. From ${firstVal} to ${secondVal}`;

      if (status === 'added') return `${commonPart}${addedPart}`;
      if (status === 'updated') return `${commonPart}${updatedPart}`;
      return `${commonPart}`;
    }, '');
  const output = changes.join('\n');
  return output;
};

export default formatPlain;
