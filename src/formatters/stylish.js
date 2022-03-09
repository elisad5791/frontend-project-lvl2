import _ from 'lodash';

const pad = (depth) => `  ${' '.repeat(4).repeat(depth - 1)}`;

const prepareValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const items = entries.map(([key, val]) => `${pad(depth + 1)}  ${key}: ${prepareValue(val, depth + 1)}`);
  const body = items.join('\n');
  return `{\n${body}\n${pad(depth)}  }`;
};

const parseLine = (key, value, state, depth) => {
  const chars = { added: '+ ', removed: '- ', unchanged: '  ' };
  const char = chars[state];
  const val = prepareValue(value, depth);
  return `${pad(depth)}${char}${key}: ${val}`;
};

const parseItem = (item, depth) => {
  if (item.state !== 'updated') {
    return parseLine(item.key, item.value, item.state, depth);
  }
  const line1 = parseLine(item.key, item.oldValue, 'removed', depth);
  const line2 = parseLine(item.key, item.newValue, 'added', depth);
  return `${line1}\n${line2}`;
};

const parseDiff = (diff, depth) => {
  const items = diff.map((item) => {
    if (item.state !== 'complex') {
      return parseItem(item, depth + 1);
    }
    return `${pad(depth + 1)}  ${item.key}: ${parseDiff(item.value, depth + 1)}`;
  });
  const body = items.join('\n');
  const padding = depth === 0 ? '' : `${pad(depth)}  `;
  return `{\n${body}\n${padding}}`;
};

const formatStylish = (diff) => parseDiff(diff, 0);

export default formatStylish;
