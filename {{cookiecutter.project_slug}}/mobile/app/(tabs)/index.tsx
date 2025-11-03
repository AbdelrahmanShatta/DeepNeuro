import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import * as SecureStore from "expo-secure-store";
import { api } from "../../src/api/client";
import { router } from "expo-router";

export default function Home() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        router.replace("/(auth)/login");
        return;
      }
      try {
        const { data } = await api.get("/api/v1");
        setMessage(data?.message ?? "");
      } catch {
        setMessage("");
      }
    })();
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Home</Text>
      <Text style={{ marginBottom: 24 }}>{message ? `API says: ${message}` : ""}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

