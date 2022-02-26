import _ from 'lodash';
import readAndParse from './parsers.js';

const getDiff = (obj1, obj2) => {
  const iter = (tree1, tree2, path) => {
    const tree = { ...tree1, ...tree2 };
    const keys = _.sortBy(Object.keys(tree));
    return keys.reduce((acc, key) => {
      const newPath = path.concat(key);
      const value1 = _.get(obj1, newPath);
      const value2 = _.get(obj2, newPath);
      const keyDel = `${key}_del`;
      const keyAdd = `${key}_add`;
      if (!_.isPlainObject(value1) || !_.isPlainObject(value2)) {
        if (!_.has(obj1, newPath)) return { ...acc, [keyAdd]: value2 };
        if (!_.has(obj2, newPath)) return { ...acc, [keyDel]: value1 };
        if (value1 === value2) return { ...acc, [key]: value1 };
        return { ...acc, [keyDel]: value1, [keyAdd]: value2 };
      }
      return { ...acc, [key]: iter(value1, value2, newPath) };
    }, {});
  };

  return iter(obj1, obj2, []);
};

const pad = (txt, count) => txt.split('\n')
  .map((item) => `${' '.repeat(count)}${item}`)
  .join('\n');

const stylish = (obj, start = true) => {
  const entries = Object.entries(obj);
  const body = entries.map(([key, value]) => {
    const newValue = _.isPlainObject(value) ? stylish(value, false) : value;
    if (key.endsWith('_add')) return `+ ${key.replace('_add', '')}: ${newValue}`;
    if (key.endsWith('_del')) return `- ${key.replace('_del', '')}: ${newValue}`;
    return `  ${key}: ${newValue}`;
  }).join('\n');
  const count = start ? 2 : 4;
  const end = start ? '' : '  ';
  const padBody = pad(body, count);
  return `{\n${padBody}\n${end}}`;
};

const generateDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = readAndParse(filepath1);
  const obj2 = readAndParse(filepath2);

  const diff = getDiff(obj1, obj2);
  const formater = eval(format);   
  const result = formater(diff);
  return result;
};

export default generateDiff;
