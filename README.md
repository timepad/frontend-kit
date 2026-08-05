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
├── config/                         # готовые helpers для Webpack потребителя
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
@import "../../assets/tokens/index.less";

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
    background: var(--accent-notification);
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

### 2. Подключите Webpack helper

Helper добавляет aliases для всех пакетов и отдельное правило `ts-loader` для исходников `frontend-kit`. Отдельно изменять `tsconfig.json` не требуется.

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

Обычно больше ничего настраивать не нужно. Проверьте только, что существующие правила проекта обрабатывают Less, SVG и шрифты из `node_modules/frontend-kit`. Если у правила задан ограничивающий `include`, добавьте туда директорию `frontend-kit`. `ts-loader` должен быть установлен, так как его использует helper.

Готовый helper рассчитан на Webpack. Для другого сборщика aliases и обработку source-файлов нужно настроить отдельно.

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

Стили компонентов и дизайн-токены подключаются их внутренними Less-импортами. Светлая тема применяется через `:root`, тёмная — атрибутом на общем контейнере:

```html
<html data-theme="dark">
```

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
