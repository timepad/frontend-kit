import svgr from "vite-plugin-svgr";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    // Ensure the plugin is present in Storybook's Vite pipeline
    config.plugins = [
      ...(config.plugins ?? []),
      svgr({
        svgrOptions: {
          replaceAttrValues: {
            "#1C1C1C": "currentColor",
          },
        },
      }),
    ];
    return config;
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
