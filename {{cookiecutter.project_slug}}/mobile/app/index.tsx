import { useEffect } from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Index() {
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    })();
  }, []);

  return null;
};
