/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
// Learn more https://docs.expo.io/guides/customizing-metro

const path = require("path");
const exclusionList = require("metro-config/private/defaults/exclusionList").default;
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const rootNodeModules = path.resolve(__dirname, "node_modules");
const nestedSvgModules = [
  path.resolve(rootNodeModules, "@aramir/react-native-barcode/node_modules/react-native-svg"),
  path.resolve(rootNodeModules, "@getpapillon/papicons/node_modules/react-native-svg"),
];

const escapePath = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

config.resolver.assetExts.push("json", "txt");
config.resolver.blockList = exclusionList(
  nestedSvgModules.map((modulePath) => new RegExp(`${escapePath(modulePath)}\\/.*`)),
);
config.resolver.extraNodeModules = {
  "react-native-svg": path.resolve(rootNodeModules, "react-native-svg"),
};

// Web/desktop: some packages declare entry points that do not exist in their published
// files (esup-multi.js points "module" at a missing index.mjs). Pin them to what ships.
const PINNED = {
  "esup-multi.js": path.resolve(rootNodeModules, "esup-multi.js/dist/index.js"),
  // Native-only modules replaced by web implementations.
  "react-native-linear-gradient": path.resolve(__dirname, "stubs/web/react-native-linear-gradient.tsx"),
  "react-native-dynamic-theme": path.resolve(__dirname, "stubs/web/react-native-dynamic-theme.js"),
  "react-native-webview": path.resolve(__dirname, "stubs/web/react-native-webview.tsx"),
  "@expo/ui/swift-ui": path.resolve(__dirname, "stubs/web/native-ui.js"),
  "@expo/ui/swift-ui/modifiers": path.resolve(__dirname, "stubs/web/native-ui.js"),
  "@expo/ui/jetpack-compose": path.resolve(__dirname, "stubs/web/native-ui.js"),
};
const upstreamResolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web" && PINNED[moduleName]) {
    return { type: "sourceFile", filePath: PINNED[moduleName] };
  }
  return (upstreamResolve ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = config;
