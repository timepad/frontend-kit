const path = require('path');
const KIT_ROOT = path.resolve(__dirname, '..');
const PKGS = ['ui', 'hooks', 'utils'];

function packageSource(name) {
  if (!PKGS.includes(name)) {
    return undefined;
  }

  return path.join(KIT_ROOT, 'packages', name, 'src');
}

function aliases() {
  const map = {};
  for (const name of PKGS) {
    map[`@frontend-kit/${name}`] = packageSource(name);
  }
  return map;
}

function includes() {
  // каталоги, которые надо прогнать через ts-loader
  return PKGS.map((name) => path.join(KIT_ROOT, 'packages', name));
}

module.exports = { aliases, includes, packageSource, KIT_ROOT, PKGS };
