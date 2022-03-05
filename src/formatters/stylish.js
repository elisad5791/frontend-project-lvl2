import _ from 'lodash';

const pad = (txt, count) => txt.split('\n')
  .map((item) => `${' '.repeat(count)}${item}`)
  .join('\n');

const prepareValue = (node) => {
  if (_.isPlainObject(node)) {
    const entries = Object.entries(node);
    return entries.map(([key, value]) => ({ key, value }));
  }
  return node;
};

const formatStylish = (diff, firstIter = true) => {
  const output = diff.map((item) => {
    if (item.state === 'updated') {
      const oldValue = prepareValue(item.oldValue);
      const newValue = prepareValue(item.newValue);
      const oldVal = Array.isArray(oldValue) ? formatStylish(oldValue, false) : oldValue;
      const newVal = Array.isArray(newValue) ? formatStylish(newValue, false) : newValue;
      return `- ${item.key}: ${oldVal}\n+ ${item.key}: ${newVal}`;
    }

    const value = prepareValue(item.value);
    const val = Array.isArray(value) ? formatStylish(value, false) : value;
    const str = ` ${item.key}: ${val}`;

    if (item.state === 'removed') {
      return `-${str}`;
    }

    if (item.state === 'added') {
      return `+${str}`;
    }

    return ` ${str}`;
  }).join('\n');

  const count = firstIter ? 2 : 4;
  const end = firstIter ? '' : '  ';
  const paddedOutput = pad(output, count);
  return `{\n${paddedOutput}\n${end}}`;
};

export default formatStylish;
