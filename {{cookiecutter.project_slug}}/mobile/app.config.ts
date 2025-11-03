import { ExpoConfig } from "expo/config";

export default (): ExpoConfig => ({
  name: "DeepNeuroMobile",
  slug: "deepneuro-mobile",
  scheme: "deepneuro",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    enabled: true
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.deepneuro.app"
  },
  extra: {
    API_BASE_URL: process.env.API_BASE_URL ?? "http://127.0.0.1:8888"
  }
});

