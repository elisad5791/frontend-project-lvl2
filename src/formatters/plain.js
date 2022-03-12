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
  const filteredDiff = diff.filter((item) => item.state !== 'unchanged');
  const output = filteredDiff.map((item) => {
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
      const oldVal = prepareValue(item.value.oldValue);
      const newVal = prepareValue(item.value.newValue);
      return `Property '${node}' was updated. From ${oldVal} to ${newVal}`;
    }

    return formatPlain(item.value, newPath);
  }).join('\n');

  return output;
};

export default formatPlain;
