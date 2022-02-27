import _ from 'lodash';

const pad = (txt, count) => txt.split('\n')
  .map((item) => `${' '.repeat(count)}${item}`)
  .join('\n');

const formatStylish = (diff) => {
  const iter = (node, firstIter = false) => {
    const children = diff.filter((item) => _.isEqual(_.initial(item[0]), node));

    const body = children.map((child) => { 
      const node = `${_.last(child[0])}`;
      const val1 = child[1] === '[complex value]' ? iter(child[0]) : child[1];
      if (child[3] === 'removed') return `- ${node}: ${val1}`;
      const val2 = child[2] === '[complex value]' ? iter(child[0]) : child[2];
      if (child[3] === 'added') return `+ ${node}: ${val2}`;
      if (child[3] === 'updated') return `- ${node}: ${val1}\n+ ${node}: ${val2}`;
      const val = val1 ? val1 : val2;
      return `  ${node}: ${val}`;
    }).join('\n');

    const count = firstIter ? 2 : 4;
    const padBody = pad(body, count);
    const end = firstIter ? '' : '  ';
    const output = `{\n${padBody}\n${end}}`;
    return output;
  };
  
  return iter([], true);
}

export default formatStylish;