const { includes } = require('./aliases');

function makeTsRule(opts = {}) {
  const { tsconfig, transpileOnly = true, test = /\.[jt]sx?$/ } = opts;
  return {
    test,
    include: includes(),
    loader: 'ts-loader',
    options: {
      transpileOnly,
      ...(tsconfig ? { configFile: tsconfig } : {})
    }
  };
}

// Помощник: добавить exclude для наших папок в существующее правило
function excludeKitFrom(rule) {
  const inc = includes();
  const prev = Array.isArray(rule.exclude) ? rule.exclude : (rule.exclude ? [rule.exclude] : []);
  rule.exclude = [...prev, ...inc];
  return rule;
}

module.exports = { makeTsRule, excludeKitFrom };
