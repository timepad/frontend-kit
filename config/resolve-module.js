const path = require('path');
const { packageSource } = require('./aliases');

const FRONTEND_KIT_IMPORT_RE = /^@frontend-kit\/([^/]+)(?:\/(.+))?$/;

function resolveFrontendKitTarget(moduleName) {
  const match = FRONTEND_KIT_IMPORT_RE.exec(moduleName);
  if (!match) {
    return undefined;
  }

  const [, packageName, subpath] = match;
  const source = packageSource(packageName);
  if (!source) {
    return undefined;
  }

  return subpath ? path.join(source, subpath) : path.join(source, 'index.ts');
}

function createResolveModuleName(fallbackResolver) {
  const resolver = (
    moduleName,
    containingFile,
    compilerOptions,
    moduleResolutionHost,
    parentResolver,
  ) => {
    const target = resolveFrontendKitTarget(moduleName);

    if (!target && fallbackResolver) {
      return fallbackResolver(
        moduleName,
        containingFile,
        compilerOptions,
        moduleResolutionHost,
        parentResolver,
      );
    }

    const resolvedOptions = target ? {
      ...compilerOptions,
      paths: {
        ...compilerOptions.paths,
        [moduleName]: [target],
      },
    } : compilerOptions;

    return parentResolver(
      moduleName,
      containingFile,
      resolvedOptions,
      moduleResolutionHost,
    );
  };

  Object.defineProperty(resolver, '__frontendKitResolver', { value: true });
  return resolver;
}

const resolveModuleName = createResolveModuleName();

module.exports = { createResolveModuleName, resolveModuleName };
