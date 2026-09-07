const { aliases } = require('./aliases');
const { patchAssets } = require('./assets');
const { makeTsRule, patchTypeScriptRules } = require('./ts-rule');

function applyTo(config, { tsconfig } = {}) {
  // aliases
  config.resolve = config.resolve || {};
  config.resolve.alias = { ...(config.resolve.alias || {}), ...aliases() };

  // frontend-kit компилируется отдельным правилом, поэтому исключаем его из TS-правил приложения
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  patchAssets(config);
  config.module.rules = patchTypeScriptRules(config.module.rules);

  // исходники frontend-kit компилируются отдельно в transpileOnly-режиме
  config.module.rules.unshift(makeTsRule(tsconfig));

  return config;
}

module.exports = { applyTo };
