const { aliases } = require('./aliases');
const { patchAssets } = require('./assets');
const { makeTsRule, patchTypeScriptRules } = require('./ts-rule');

function applyTo(config, { tsconfig } = {}) {
  // aliases
  config.resolve = config.resolve || {};
  config.resolve.alias = { ...(config.resolve.alias || {}), ...aliases() };

  // патчим TypeScript-resolve приложения и исключаем frontend-kit из его TS-правил
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  patchAssets(config);
  config.module.rules = patchTypeScriptRules(config.module.rules);

  // исходники frontend-kit компилируются отдельно в transpileOnly-режиме
  config.module.rules.unshift(makeTsRule(tsconfig));

  return config;
}

module.exports = { applyTo };
