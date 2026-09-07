# frontend-kit

Общая React-библиотека компонентов, хуков, утилит, иконок и дизайн-токенов Timepad.

Репозиторий организован как монорепозиторий на Yarn Workspaces:

| Пакет | Содержимое | Импорт |
| --- | --- | --- |
| `@frontend-kit/ui` | React-компоненты, иконки, стили и токены | `@frontend-kit/ui` |
| `@frontend-kit/hooks` | Общие React-хуки | `@frontend-kit/hooks` |
| `@frontend-kit/utils` | Утилиты, не привязанные к конкретному приложению | `@frontend-kit/utils` |

> Сейчас пакеты распространяются в source-режиме: потребитель получает `.ts`/`.tsx`, Less, SVG и шрифты и компилирует их своей сборкой. Готового `dist` и автоматической публикации в npm/GitHub Packages в репозитории нет.

## Содержание

- [Локальный запуск](#локальный-запуск)
- [Структура](#структура)
- [Добавление компонента](#добавление-компонента)
- [Добавление хука](#добавление-хука)
- [Добавление утилиты](#добавление-утилиты)
- [Добавление иконок и токенов](#добавление-иконок-и-токенов)
- [Проверка изменений](#проверка-изменений)
- [Подключение в другой репозиторий](#подключение-в-другой-репозиторий)
- [Использование](#использование)
- [Известные ограничения](#известные-ограничения)
- [Обновление зависимости](#обновление-зависимости)

## Локальный запуск

Требуются Node.js 18+ и Yarn 1.x.

```bash
git clone git@github.com:timepad/frontend-kit.git
cd frontend-kit
yarn install
yarn storybook
```

Storybook откроется по адресу <http://localhost:6006>.

Основные команды:

```bash
# Запустить Storybook
yarn storybook

# Проверить типы UI-пакета
yarn workspace @frontend-kit/ui type-check

# Собрать статический Storybook
yarn build-storybook
```

## Структура

```text
frontend-kit/
├── config/
│   ├── index.js                    # Webpack helper для потребителя
│   ├── tsconfig.json               # TypeScript preset для IDE и tsc
│   └── types.d.ts                  # декларации Less и SVG-модулей
├── packages/
│   ├── ui/
│   │   ├── .storybook/
│   │   └── src/
│   │       ├── assets/
│   │       │   ├── fonts/
│   │       │   ├── icons/
│   │       │   └── tokens/
│   │       ├── components/
│   │       └── index.ts            # публичный API @frontend-kit/ui
│   ├── hooks/
│   │   └── src/index.ts            # публичный API @frontend-kit/hooks
│   └── utils/
│       └── src/index.ts            # публичный API @frontend-kit/utils
├── package.json
└── tsconfig.base.json
```

Публичным считается только то, что экспортировано из `src/index.ts` соответствующего пакета. Не импортируйте внутренние файлы библиотеки по длинным путям: их структура может измениться без сохранения обратной совместимости.

## Добавление компонента

### 1. Создайте директорию компонента

Используйте существующую структуру и `PascalCase` для имени директории и компонента:

```text
packages/ui/src/components/Badge/
├── Badge.tsx
├── Badge.stories.tsx
├── badge.less
├── badge.types.ts
└── index.ts
```

### 2. Опишите публичные типы

```ts
// badge.types.ts
import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  appearance?: "neutral" | "accent";
}
```

### 3. Реализуйте компонент

Для CSS-классов используйте helpers из `@frontend-kit/utils`, а для значений — существующие дизайн-токены.

```tsx
// Badge.tsx
import type { FC } from "react";
import { classNames, component } from "@frontend-kit/utils";

import "./badge.less";
import type { BadgeProps } from "./badge.types";

export const Badge: FC<BadgeProps> = ({
  label,
  appearance = "neutral",
  className,
  ...rest
}) => (
  <span
    className={classNames(
      component("badge")({ [`appearance-${appearance}`]: true }),
      className,
    )}
    {...rest}
  >
    {label}
  </span>
);
```

Префикс `c` для класса добавляет `component()`. В примере получится `cbadge cbadge--appearance-neutral`.

### 4. Добавьте стили

```less
// badge.less
@import (reference) "../../assets/tokens/index.less";

.cbadge {
  display: inline-flex;
  border-radius: var(--radius-8);
  padding: var(--space-4) var(--space-8);

  &--appearance-neutral {
    color: var(--text-primary);
    background: var(--bg-secondary);
  }

  &--appearance-accent {
    color: var(--text-inverted);
    background: var(--accent-active);
  }
}
```

Не добавляйте в компонент глобальные reset-стили и значения цветов/отступов, для которых уже есть токены.

### 5. Добавьте Storybook

Минимальная история должна показывать основной сценарий и позволять проверить публичные props:

```tsx
// Badge.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    label: "Badge",
    appearance: "neutral",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
```

Для интерактивных компонентов добавьте истории состояний: hover/focus, disabled, loading, ошибки, крайние значения и разные размеры.

### 6. Откройте публичный экспорт

```ts
// components/Badge/index.ts
export { Badge } from "./Badge";
export type { BadgeProps } from "./badge.types";
```

```ts
// packages/ui/src/index.ts
export { Badge } from "./components/Badge";
export type { BadgeProps } from "./components/Badge";
```

Без последнего шага компонент нельзя будет импортировать из `@frontend-kit/ui`.

## Добавление хука

Хук размещается в `packages/hooks/src`, называется с префикса `use` и не должен зависеть от конкретного приложения.

```ts
// packages/hooks/src/useBoolean.ts
import { useCallback, useState } from "react";

export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((current) => !current), []);

  return { value, on, off, toggle };
};
```

Добавьте его в публичный API:

```ts
// packages/hooks/src/index.ts
export * from "./useBoolean";
```

Рекомендации для хуков:

- не обращайтесь к глобальным объектам во время рендера, если хук должен работать с SSR;
- мемоизируйте возвращаемые callbacks, когда их стабильность является частью контракта;
- не скрывайте внутри хука состояние конкретного продукта или API-клиент приложения;
- экспортируйте публичные типы аргументов и результата, если они нетривиальны.

## Добавление утилиты

Утилиты без React-зависимостей размещайте в `packages/utils/src`. Связанные helpers можно объединять в поддиректории.

```ts
// packages/utils/src/helpers/clamp.ts
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
```

Откройте экспорт на каждом уровне barrel-файлов:

```ts
// packages/utils/src/helpers/index.ts
export { clamp } from "./clamp";

// packages/utils/src/index.ts
export * from "./helpers";
```

Если утилите нужна новая runtime-зависимость, добавляйте её в `dependencies` пакета `packages/utils/package.json`, а не в корневые `devDependencies`.

## Добавление иконок и токенов

### Иконки

1. Поместите SVG в подходящую категорию внутри `packages/ui/src/assets/icons`.
2. Соблюдайте схему имени: `<Name>-<Size>-<Fill|Outline>.svg`.
3. Добавьте импорт с query `?react` в `packages/ui/src/assets/icons/index.ts`.
4. Экспортируйте компонент из того же файла как `Icon<Name><Size><Fill|Outline>`.

```ts
import IconCalendar24Outline from "./objects/Calendar-24-Outline.svg?react";

export {
  IconCalendar24Outline,
};
```

Перед добавлением убедитесь, что такой иконки ещё нет. Не меняйте `viewBox` и геометрию согласованного SVG без сверки с дизайном.

### Дизайн-токены

Токены находятся в `packages/ui/src/assets/tokens`:

- `color-constants.less` — базовые цвета;
- `palette.less` — палитра;
- `scale.less` — отступы и радиусы;
- `fonts.less` — шрифты;
- `themes.less` — семантические переменные светлой и тёмной тем;
- `index.less` — единая точка подключения токенов.

Новый токен должен иметь семантическое имя и, если применимо, значение для обеих тем. Компоненты используют CSS variables (`var(--text-primary)`), а не внутренние Less-переменные карты.

## Проверка изменений

Перед pull request:

```bash
yarn workspace @frontend-kit/ui type-check
yarn build-storybook
```

Также вручную проверьте:

- новая сущность экспортируется из публичного `index.ts`;
- компонент и его состояния отображаются в Storybook;
- внешний `className` и нативные HTML-атрибуты не теряются;
- для интерактивного элемента доступны keyboard/focus-состояния и корректная семантика;
- нет импорта модулей конкретного приложения;
- изменение публичных props не ломает существующих потребителей.

В репозитории пока нет общих команд lint и test, поэтому Storybook и TypeScript — обязательный минимум проверки.

## Подключение в другой репозиторий

### 1. Установите репозиторий как Git-зависимость

Рекомендуется фиксировать конкретный commit SHA, чтобы сборка приложения была воспроизводимой:

```json
{
  "dependencies": {
    "frontend-kit": "https://github.com/timepad/frontend-kit.git#<commit-sha>"
  }
}
```

Затем выполните:

```bash
yarn install
```

У разработчика и CI должен быть доступ к репозиторию `timepad/frontend-kit`. В приложении должны быть установлены `react` и `react-dom` версии 18.

### 2. Подключите TypeScript preset

Webpack aliases из helper доступны только во время Webpack-сборки. IDE и отдельный `tsc --noEmit` не читают `webpack.config.js`, поэтому для них подключите TypeScript preset в `tsconfig.json` приложения:

#### Проект без собственных `paths` (OTP)

```json
{
  "extends": "frontend-kit/config/tsconfig.json"
}
```

Добавьте `extends` к существующему `tsconfig.json`, не удаляя его `compilerOptions`, `include` и `exclude`.

Preset добавляет:

- `paths` для `@frontend-kit/ui`, `@frontend-kit/hooks` и `@frontend-kit/utils`;
- декларации модулей для Less и `*.svg?react`, подключаемые публичным entrypoint UI;
- `allowUmdGlobalAccess`, необходимый для проверки source-компонентов в проектах с classic JSX.

Остальные настройки TypeScript остаются в приложении. В частности, preset не меняет `jsx` всего проекта.

Preset также не задаёт `files`, `include` и `exclude`. Поэтому собственные ambient-декларации потребителя, например `custom.d.ts` с `declare module "*.svg"`, продолжают входить в TypeScript-программу. Декларации Less и `*.svg?react` frontend-kit подключаются из публичного entrypoint `@frontend-kit/ui`.

Если приложение уже наследует другой `tsconfig`, не содержащий `compilerOptions.paths`, и использует TypeScript 5+, конфигурации можно перечислить массивом. Более поздние конфигурации имеют больший приоритет:

```json
{
  "extends": [
    "./tsconfig.base.json",
    "frontend-kit/config/tsconfig.json"
  ]
}
```

#### Проект с собственными `paths` (NTP)

TypeScript не объединяет объекты `compilerOptions.paths`: `paths` приложения полностью заменяет `paths` из preset. Поэтому сохраните `extends`, но добавьте aliases frontend-kit в существующий объект вручную.

Для NTP с `baseUrl: "src"` конфигурация выглядит так:

```json
{
  "extends": "frontend-kit/config/tsconfig.json",
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "*": [
        "*",
        "src/*"
      ],
      "@frontend-kit/ui": [
        "../node_modules/frontend-kit/packages/ui/src/index.ts"
      ],
      "@frontend-kit/ui/*": [
        "../node_modules/frontend-kit/packages/ui/src/*"
      ],
      "@frontend-kit/hooks": [
        "../node_modules/frontend-kit/packages/hooks/src/index.ts"
      ],
      "@frontend-kit/hooks/*": [
        "../node_modules/frontend-kit/packages/hooks/src/*"
      ],
      "@frontend-kit/utils": [
        "../node_modules/frontend-kit/packages/utils/src/index.ts"
      ],
      "@frontend-kit/utils/*": [
        "../node_modules/frontend-kit/packages/utils/src/*"
      ]
    }
  }
}
```

Значения начинаются с `../node_modules`, потому что TypeScript считает их относительно `baseUrl: "src"`. `tsconfig.dev.json`, наследующий этот основной конфиг, отдельно менять не требуется.

После изменения перезапустите TypeScript Service в IDE.

### 3. Подключите Webpack helper

Helper добавляет Webpack aliases для всех пакетов и создаёт отдельное `transpileOnly`-правило для исходников `frontend-kit`. Из обычных правил `ts-loader` приложения эти исходники исключаются, чтобы не компилировать их дважды. Только это отдельное правило использует `jsx: "react-jsx"`; настройка `jsx` приложения не изменяется.

Также helper подключает ресурсы UI-kit к существующей конфигурации приложения:

- переиспользует найденный loader `mini-css-extract-plugin` для Less-файлов `@frontend-kit/ui`;
- переиспользует всю существующую Less-chain приложения, включая `css-loader`, `postcss-loader` и `less-loader`;
- подключает SVG-иконки UI-kit через существующий `@svgr/webpack`;
- не даёт существующему `ignore-loader` отбрасывать шрифты UI-kit;
- если отдельного обработчика для этих шрифтов нет, добавляет Webpack 5 `asset/resource` и складывает файлы в `fonts/`.

TypeScript resolve настраивается preset из предыдущего шага и одинаково работает в IDE, отдельном `tsc` и `ts-loader`.

```js
// webpack.config.js
const kit = require("frontend-kit/config");

module.exports = (env, argv) => {
  const config = {
    // существующая конфигурация приложения
  };

  return kit.applyTo(config, {
    tsconfig: argv.mode === "production"
      ? "tsconfig.json"
      : "tsconfig.dev.json",
  });
};
```

Если приложение экспортирует готовый объект, подключение ещё короче:

```js
const kit = require("frontend-kit/config");
const config = {
  // существующая конфигурация приложения
};

module.exports = kit.applyTo(config, { tsconfig: "tsconfig.json" });
```

В приложении должны быть установлены `ts-loader`, `css-loader`, `less-loader` и `@svgr/webpack`. Helper переиспользует Less- и SVG-loaders из существующих правил приложения. Если приложение не использует `mini-css-extract-plugin`, оно должно самостоятельно добавить loader, который вставляет или извлекает стили.

Готовый helper рассчитан на Webpack. Для другого сборщика aliases и обработку source-файлов нужно настроить отдельно.

Если сборка проекта с classic JSX выдаёт `TS2686: React refers to a UMD global`, сначала проверьте, что проект наследует актуальный `frontend-kit/config/tsconfig.json`. Затем обновите SHA зависимости, выполните `yarn install` и убедитесь, что в `node_modules/frontend-kit` установлена свежая версия. Переключать весь проект на `jsx: "react-jsx"` не требуется: helper применяет эту настройку только к исходникам frontend-kit.

### Локальная проверка интеграции

Чтобы проверить ещё не влитые изменения в соседнем проекте, временно укажите локальный путь:

```json
{
  "dependencies": {
    "frontend-kit": "file:../frontend-kit"
  }
}
```

После проверки верните Git URL с SHA и обновите lock-файл приложения. Не коммитьте машинно-зависимый `file:` путь.

## Использование

Импортируйте сущности только из корня публичного пакета:

```tsx
import {
  Button,
  IconCheck24Outline,
  Snackbar,
} from "@frontend-kit/ui";

export const SaveExample = () => (
  <div>
    <Button
      label="Сохранить"
      icon={<IconCheck24Outline />}
      onClick={() => console.log("save")}
    />
    <Snackbar.Success label="Сохранено" />
  </div>
);
```

```tsx
import { useAuth } from "@frontend-kit/hooks";

export const Profile = () => {
  const { user } = useAuth();
  return <div>{user}</div>;
};
```

```ts
import { classNames, component } from "@frontend-kit/utils";

const className = classNames(
  component("card")({ selected: true }),
  "additional-class",
);
```

Стили компонентов и дизайн-токены подключаются автоматически при импорте из `@frontend-kit/ui`. Глобальные CSS variables и `@font-face` добавляются один раз. Less-файлы помечены как side effects, поэтому при импорте из корневого barrel-файла Webpack может включить стили других реэкспортируемых компонентов, даже если их React-экспорты затем удалены tree shaking. Не импортируйте `assets/tokens/index.less` в приложении повторно.

Светлая тема применяется через `:root`, тёмная — атрибутом на общем контейнере:

```html
<html data-theme="dark">
```

## Известные ограничения

### React 16

Публичные пакеты frontend-kit рассчитаны на React 18. В UI есть компоненты, использующие `useId`; корневой `@frontend-kit/ui` реэкспортирует их вместе с остальными компонентами. Поэтому проект на React 16/типах React 17 может получить `TS2305: Module 'react' has no exported member 'useId'`, даже если импортирует только компонент без React 18 API. Webpack и TypeScript helpers не решают эту несовместимость.

### Совместное использование с `front-components`

У frontend-kit и старого `front-components` пока нет изолированных CSS namespaces. Например, оба Counter используют селектор `.ccounter`, поэтому правила старого компонента участвуют в cascade нового.

Кроме того, Less-файлы компонентов `front-components` импортируют его общий `assets/css/bundle.less`. Если приложение уже подключает этот bundle отдельно, DevTools может показывать одинаковое правило старого `.ccounter { position: relative; }` два раза. Это дублирование создаёт `front-components`, а не Webpack helper frontend-kit. До разделения namespaces проверяйте пересечения классов при переносе каждого компонента.

## Обновление зависимости

1. Выберите commit в `frontend-kit`, который прошёл проверки и влит в основную ветку.
2. Замените SHA в `package.json` приложения.
3. Обновите зависимость и lock-файл:

```bash
yarn install
```

4. Запустите type-check, тесты и production-сборку приложения.
5. Проверьте изменённые компоненты в реальных сценариях приложения.

Не используйте ветку `master` без фиксации SHA: установка без lock-файла в разные дни может получить разный код.
