import React from "react";
import "../i18n";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { ThemeProvider, useTheme } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { darkTheme, lightTheme } from "../theme/themes";
import { store } from "../store";

function StackLayout() {
	const { colors } = useTheme();

	return (
		<>
			<StatusBar />
			<Stack screenOptions={{}}>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerLeft: () => (
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Pressable>
									<FontAwesome name="bars" size={24} color={colors.text} />
								</Pressable>
							</View>
						),
						headerRight: () => (
							<Pressable>
								<FontAwesome name="user-circle" size={24} color={colors.text} />
							</Pressable>
						),
						headerTitle: () => (
							<Text
								style={{
									color: colors.text,
									textAlign: "center",
									width: "100%",
								}}
							>
								Username @ Authority Name
							</Text>
						),
						headerShadowVisible: false,
					}}
				/>
			</Stack>
		</>
	);
}

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === "dark" ? darkTheme : lightTheme}>
			<Provider store={store}>
				<StackLayout />
			</Provider>
		</ThemeProvider>
	);
}
