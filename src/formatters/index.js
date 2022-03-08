import formatStylish from './stylish.js';
import formatJson from './json.js';
import formatPlain from './plain.js';

const getFormatting = (diff, formatName) => {
  const formatters = {
    plain: formatPlain,
    json: formatJson,
    stylish: formatStylish,
  };
  const format = formatters[formatName];
  return format(diff);
};

export default getFormatting;
