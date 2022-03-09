import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const diff = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, state: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { key, state: 'removed', value: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { key, state: 'unchanged', value: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, state: 'complex', value: buildDiff(obj1[key], obj2[key]) };
    }
    return {
      key, state: 'updated', oldValue: obj1[key], newValue: obj2[key],
    };
  });

  return diff;
};

export default buildDiff;
