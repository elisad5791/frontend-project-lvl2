import _ from 'lodash';

const pad = (txt, count) => txt.split('\n')
  .map((item) => `${' '.repeat(count)}${item}`)
  .join('\n');

const formatStylish = (diff) => {
  const iter = (node, firstIter = false) => {
    const children = diff.filter((child) => _.isEqual(_.initial(child[0]), node));

    const body = children.map((child) => {
      const childName = `${_.last(child[0])}`;
      const val1 = child[1] === '[complex value]' ? iter(child[0]) : child[1];
      if (child[3] === 'removed') return `- ${childName}: ${val1}`;
      const val2 = child[2] === '[complex value]' ? iter(child[0]) : child[2];
      if (child[3] === 'added') return `+ ${childName}: ${val2}`;
      if (child[3] === 'updated') return `- ${childName}: ${val1}\n+ ${childName}: ${val2}`;
      const val = val1 || val2;
      return `  ${childName}: ${val}`;
    }).join('\n');

    const count = firstIter ? 2 : 4;
    const padBody = pad(body, count);
    const end = firstIter ? '' : '  ';
    const output = `{\n${padBody}\n${end}}`;
    return output;
  };

  return iter([], true);
};

export default formatStylish;
