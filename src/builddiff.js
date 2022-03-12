import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], state: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], state: 'removed' };
    }
    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], state: 'unchanged' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, value: buildDiff(obj1[key], obj2[key]), state: 'complex' };
    }
    return { key, value: { oldValue: obj1[key], newValue: obj2[key] }, state: 'updated' };
  });

  return diff;
};

export default buildDiff;
