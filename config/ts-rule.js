const { includes } = require('./aliases');
const { createResolveModuleName, resolveModuleName } = require('./resolve-module');
const { addExclude, loaderName } = require('./webpack-rules');

function isTsLoader(loader) {
  return /(^|[\\/])ts-loader(?:[\\/]|$|\?)/.test(loaderName(loader) || '');
}

function patchLoaderOptions(options = {}) {
  if (options.resolveModuleName?.__frontendKitResolver) {
    return options;
  }

  return {
    ...options,
    resolveModuleName: options.resolveModuleName
      ? createResolveModuleName(options.resolveModuleName)
      : resolveModuleName,
  };
}

function patchLoader(loader) {
  if (typeof loader === 'string') {
    return { loader, options: patchLoaderOptions() };
  }

  return { ...loader, options: patchLoaderOptions(loader.options) };
}

function patchRule(rule) {
  if (!rule || typeof rule !== 'object') {
    return { rule, hasTsLoader: false };
  }

  const patchedRule = { ...rule };
  let hasTsLoader = false;

  if (isTsLoader(rule?.loader)) {
    patchedRule.options = patchLoaderOptions(rule.options);
    hasTsLoader = true;
  }

  if (Array.isArray(rule?.use)) {
    patchedRule.use = rule.use.map((loader) => {
      if (!isTsLoader(loader)) return loader;
      hasTsLoader = true;
      return patchLoader(loader);
    });
  } else if (isTsLoader(rule?.use)) {
    patchedRule.use = patchLoader(rule.use);
    hasTsLoader = true;
  }

  for (const key of ['oneOf', 'rules']) {
    if (!Array.isArray(rule[key])) continue;

    const nested = rule[key].map(patchRule);
    patchedRule[key] = nested.map((result) => result.rule);
    hasTsLoader ||= nested.some((result) => result.hasTsLoader);
  }

  return { rule: patchedRule, hasTsLoader };
}

function patchTypeScriptRules(rules) {
  return rules.map((rule) => {
    const result = patchRule(rule);
    return result.hasTsLoader
      ? addExclude(result.rule, includes())
      : result.rule;
  });
}

function makeTsRule(tsconfig) {
  return {
    test: /\.[jt]sx?$/,
    include: includes(),
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      resolveModuleName,
      ...(tsconfig ? { configFile: tsconfig } : {})
    }
  };
}

module.exports = { makeTsRule, patchTypeScriptRules };
