import yaml from 'js-yaml';

const parse = (data, format) => {
  const parsers = { yml: yaml.load, json: JSON.parse };
  return parsers[format](data);
};

export default parse;
