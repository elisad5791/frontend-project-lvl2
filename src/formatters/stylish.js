import _ from 'lodash';

const pad = (txt, count) => txt.split('\n')
  .map((item) => `${' '.repeat(count)}${item}`)
  .join('\n');

const transform = (obj) => {
  const entries = Object.entries(obj);
  return entries.map(([key, value]) => ({ key, value }));
};

const prepareValue = (value) => {
  if (_.isPlainObject(value)) {
    return formatStylish(transform(value), false);
  }
  if (Array.isArray(value)) {
    return formatStylish(value, false);
  }
  return value;
};

const formatStylish = (diff, firstIter = true) => {
  const output = diff.map((item) => {
    if (item.state === 'updated') {
      const oldVal = prepareValue(item.oldValue);
      const newVal = prepareValue(item.newValue);
      return `- ${item.key}: ${oldVal}\n+ ${item.key}: ${newVal}`;
    }

    const val = prepareValue(item.value);
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
