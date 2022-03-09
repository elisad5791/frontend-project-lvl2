import _ from 'lodash';

const prepareValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (diff, path = []) => {
  const output = diff.map((item) => {
    const newPath = path.concat(item.key);
    const node = newPath.join('.');

    if (item.state === 'removed') {
      return `Property '${node}' was removed`;
    }

    if (item.state === 'added') {
      const val = prepareValue(item.value);
      return `Property '${node}' was added with value: ${val}`;
    }

    if (item.state === 'updated') {
      const oldVal = prepareValue(item.oldValue);
      const newVal = prepareValue(item.newValue);
      return `Property '${node}' was updated. From ${oldVal} to ${newVal}`;
    }

    if (item.state === 'complex') {
      return formatPlain(item.value, newPath);
    }

    return '';
  }).filter((item) => item).join('\n');

  return output;
};

export default formatPlain;
