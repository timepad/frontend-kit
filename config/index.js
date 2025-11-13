const { aliases, includes } = require('./aliases');
const { makeTsRule, excludeKitFrom } = require('./ts-rule');

function applyTo(config, { tsconfig } = {}) {
  // aliases
  config.resolve = config.resolve || {};
  config.resolve.alias = { ...(config.resolve.alias || {}), ...aliases() };

  // вставим наше правило ts-loader в начало
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  config.module.rules.unshift(makeTsRule({ tsconfig }));

  // исключим наши каталоги из любого существующего TS-правила (чтобы не компилировать дважды)
  config.module.rules = config.module.rules.map((r) => {
    const isTs =
      r && r.test && (r.test.toString().includes('tsx') || r.test.toString().includes('ts'));
    return isTs ? excludeKitFrom({ ...r }) : r;
  });

  return config;
}

module.exports = { applyTo, aliases, includes, makeTsRule, excludeKitFrom };
