import formatStylish from './stylish.js';
import formatJson from './json.js';
import formatPlain from './plain.js';

const getFormatter = (formatName) => {
  if (formatName === 'plain') return formatPlain;
  if (formatName === 'json') return formatJson;
  return formatStylish;
};

export default getFormatter;