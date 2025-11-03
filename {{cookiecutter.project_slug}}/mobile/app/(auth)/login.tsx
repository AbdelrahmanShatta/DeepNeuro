import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { api } from "../../src/api/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/login/access-token", {
        username: email,
        password,
      });
      const token = data?.access_token;
      if (!token) throw new Error("Invalid token response");
      await SecureStore.setItemAsync("token", token);
      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Login failed", e?.message ?? "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign in</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 12, padding: 12, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 12, padding: 12, borderRadius: 8 }}
      />
      <Button title={loading ? "Signing in..." : "Sign in"} onPress={onSubmit} disabled={loading} />
    </View>
  );
}

