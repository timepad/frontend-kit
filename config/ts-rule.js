const { includes } = require('./aliases');
const { addExclude, flattenRules, hasLoader } = require('./webpack-rules');

function patchTypeScriptRules(rules) {
  for (const rule of flattenRules(rules)) {
    if (hasLoader(rule, 'ts-loader')) {
      addExclude(rule, includes());
    }
  }

  return rules;
}

function makeTsRule(tsconfig) {
  return {
    test: /\.[jt]sx?$/,
    include: includes(),
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      ...(tsconfig ? { configFile: tsconfig } : {})
    }
  };
}

module.exports = { makeTsRule, patchTypeScriptRules };
