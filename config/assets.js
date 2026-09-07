const path = require('path');
const { packageSource } = require('./aliases');
const {
  addExclude,
  cloneUse,
  flattenRules,
  hasLoader,
  loaderEntries,
  ruleMatches,
} = require('./webpack-rules');

const UI_SOURCE = packageSource('ui');
const UI_FONTS = path.join(UI_SOURCE, 'assets', 'fonts');
const UI_ICONS = path.join(UI_SOURCE, 'assets', 'icons');
const STYLE_SAMPLE = path.join(UI_SOURCE, 'components', '__frontend-kit-style.less');
const FONT_SAMPLE = path.join(UI_FONTS, '__frontend-kit-font.woff2');
const SVG_SAMPLE = path.join(UI_ICONS, '__frontend-kit-icon.svg');

function reuseLoaderRule(config, { loader, resource, rule }) {
  const handlers = flattenRules(config.module.rules)
    .filter((candidate) => hasLoader(candidate, loader));

  if (!handlers.length || handlers.some((candidate) => ruleMatches(candidate, resource))) {
    return;
  }

  config.module.rules.unshift({ ...rule, use: cloneUse(handlers[0]) });
}

function patchReusableLoaders(config) {
  reuseLoaderRule(config, {
    loader: 'mini-css-extract-plugin',
    resource: STYLE_SAMPLE,
    rule: { test: /\.less$/, include: [UI_SOURCE], sideEffects: true },
  });
  reuseLoaderRule(config, {
    loader: '@svgr/webpack',
    resource: SVG_SAMPLE,
    rule: { test: /\.svg$/i, include: [UI_ICONS], resourceQuery: /react/ },
  });
}

function patchFonts(config) {
  let rules = flattenRules(config.module.rules);

  for (const rule of rules) {
    if (ruleMatches(rule, FONT_SAMPLE) && hasLoader(rule, 'ignore-loader')) {
      addExclude(rule, UI_FONTS);
    }
  }

  rules = flattenRules(config.module.rules);
  const hasFontHandler = rules.some((rule) =>
    ruleMatches(rule, FONT_SAMPLE)
    && !hasLoader(rule, 'ignore-loader')
    && (rule.type?.startsWith('asset') || loaderEntries(rule).length > 0),
  );

  if (hasFontHandler) {
    return;
  }

  config.module.rules.push({
    test: /\.(woff2?|ttf|eot)$/i,
    include: [UI_FONTS],
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name].[contenthash][ext]',
    },
  });
}

function patchAssets(config) {
  patchReusableLoaders(config);
  patchFonts(config);
  return config;
}

module.exports = { patchAssets };
