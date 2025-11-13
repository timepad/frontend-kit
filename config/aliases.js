const path = require('path');
const KIT_ROOT = path.dirname(require.resolve('frontend-kit/package.json'));
const PKGS = ['ui', 'hooks', 'utils'];

function aliases() {
  const map = {};
  for (const name of PKGS) {
    map[`@frontend-kit/${name}`] = path.join(KIT_ROOT, 'packages', name, 'src');
  }
  return map;
}

function includes() {
  // каталоги, которые надо прогнать через ts-loader
  return PKGS.map((name) => path.join(KIT_ROOT, 'packages', name));
}

module.exports = { aliases, includes, KIT_ROOT, PKGS };
