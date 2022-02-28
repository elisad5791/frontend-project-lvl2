import _ from 'lodash';
import readAndParse from './parsers.js';
import getFormatter from './formatters/index.js';

const getStatus = (inFirst, inSecond, value1, value2, isNotChangable) => {
  if (isNotChangable) return 'saved';
  if (!inFirst) return 'added';
  if (!inSecond) return 'removed';
  if (value1 === value2) return 'saved';
  return 'updated';
};

const getDiff = (tree1, tree2) => {
  const iter = (obj1, obj2, path, isNotChangable) => {
    const newObj1 = _.isPlainObject(obj1) ? _.cloneDeep(obj1) : {};
    const newObj2 = _.isPlainObject(obj2) ? _.cloneDeep(obj2) : {};
    const obj = { ...newObj1, ...newObj2 };
    const keys = _.sortBy(Object.keys(obj));

    const result = keys.flatMap((key) => {
      const newPath = path.concat(key);
      const val1 = _.get(tree1, newPath, null);
      const val2 = _.get(tree2, newPath, null);
      const isObj1 = _.isPlainObject(val1);
      const isObj2 = _.isPlainObject(val2);
      const newIsNotChangable = !(isObj1 && isObj2);
      const value1 = isObj1 ? '[complex value]' : val1;
      const value2 = isObj2 ? '[complex value]' : val2;

      const inFirst = _.has(tree1, newPath);
      const inSecond = _.has(tree2, newPath);
      const record = [newPath,
        value1,
        value2,
        getStatus(inFirst, inSecond, value1, value2, isNotChangable)];

      if (value1 !== '[complex value]' && value2 !== '[complex value]') {
        return [record];
      }
      return [record, ...iter(val1, val2, newPath, newIsNotChangable)];
    });
    return result;
  };

  const diff = iter(tree1, tree2, [], false);
  return diff;
};

const generateDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = readAndParse(filepath1);
  const obj2 = readAndParse(filepath2);
  const diff = getDiff(obj1, obj2);
  const formatter = getFormatter(formatName);
  return formatter(diff);
};

export default generateDiff;
