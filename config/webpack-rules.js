function matchesCondition(condition, resource) {
  if (Array.isArray(condition)) {
    return condition.some((item) => matchesCondition(item, resource));
  }

  if (condition instanceof RegExp) {
    condition.lastIndex = 0;
    return condition.test(resource);
  }

  if (typeof condition === 'function') {
    return condition(resource);
  }

  return typeof condition === 'string' && resource.startsWith(condition);
}

function ruleMatches(rule, resource) {
  return (!rule.test || matchesCondition(rule.test, resource))
    && (!rule.include || matchesCondition(rule.include, resource))
    && (!rule.exclude || !matchesCondition(rule.exclude, resource));
}

function flattenRules(rules = []) {
  return rules.flatMap((rule) => {
    if (!rule || typeof rule !== 'object') {
      return [];
    }

    return [
      rule,
      ...flattenRules(rule.oneOf),
      ...flattenRules(rule.rules),
    ];
  });
}

function loaderName(loader) {
  return typeof loader === 'string' ? loader : loader?.loader;
}

function loaderEntries(rule) {
  const use = Array.isArray(rule.use) ? rule.use : rule.use ? [rule.use] : [];
  return rule.loader
    ? [...use, { loader: rule.loader, options: rule.options }]
    : use;
}

function hasLoader(rule, name) {
  return loaderEntries(rule).some((loader) => loaderName(loader)?.includes(name));
}

function cloneLoader(loader) {
  return typeof loader === 'string' ? loader : { ...loader };
}

function cloneUse(rule) {
  if (Array.isArray(rule.use)) {
    return rule.use.map(cloneLoader);
  }

  if (rule.use) {
    return cloneLoader(rule.use);
  }

  return rule.loader
    ? cloneLoader({ loader: rule.loader, options: rule.options })
    : undefined;
}

function addExclude(rule, condition) {
  const exclude = Array.isArray(rule.exclude)
    ? rule.exclude
    : rule.exclude ? [rule.exclude] : [];
  const additions = Array.isArray(condition) ? condition : [condition];

  rule.exclude = [...exclude, ...additions];
  return rule;
}

module.exports = {
  addExclude,
  cloneUse,
  flattenRules,
  hasLoader,
  loaderEntries,
  ruleMatches,
};
