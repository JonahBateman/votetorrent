import React from "react";
import "../i18n";
import { FontAwesome6 } from "@expo/vector-icons";
import {
	Pressable,
	Text,
	useColorScheme,
	View,
	StyleSheet,
} from "react-native";
import { ThemeProvider, useTheme } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { darkTheme, lightTheme } from "../theme/themes";
import { store } from "../store";
import { Network } from "../models";
import { showToast } from "../components/Toast";
import { useTranslation } from "react-i18next";

const recentNetworks: Network[] = [
	{
		id: "1",
		name: "Utah Network",
		address: "/dns/utah.gov/tcp/443/p2p/QmZjkls123",
	},
	{
		id: "2",
		name: "Idaho Network",
		address: "/dns/idaho.gov/tcp/443/p2p/QmZjkls123",
	},
];

const networkName = "Network Name";
const username = "Username";

function SplitHeaderTitle() {
	const { colors } = useTheme();
	return (
		<View style={styles.headerContainer}>
			<View style={styles.headerWrapperStart}>
				<Text style={[styles.headerText, { color: colors.text }]}>
					{networkName}
				</Text>
			</View>
			<View style={styles.headerWrapperEnd}>
				<Text style={[styles.headerText, { color: colors.text, opacity: 0.7 }]}>
					{username}
				</Text>
			</View>
		</View>
	);
}

function StackLayout() {
	const { colors } = useTheme();
	const router = useRouter();
	const { t } = useTranslation();

	const handleNetworkPress = () => {
		console.log("Network pressed");
		showToast({
			message: t("switchingNetworks"),
			haptic: true,
		});
		router.push({
			pathname: "/networks",
			params: {
				recentNetworks: JSON.stringify(recentNetworks),
			},
		});
	};

	return (
		<>
			<StatusBar />
			<Stack screenOptions={{}}>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerLeft: () => (
							// This is using onPressIn because of a bug with onPress in headers
							<Pressable onPressIn={handleNetworkPress}>
								<FontAwesome6
									name="circle-nodes"
									size={24}
									color={colors.text}
								/>
							</Pressable>
						),
						headerRight: () => (
							<Pressable>
								<FontAwesome6
									name="circle-user"
									size={24}
									color={colors.text}
								/>
							</Pressable>
						),
						headerTitle: () => <SplitHeaderTitle />,
						headerShadowVisible: false,
					}}
				/>
			</Stack>
		</>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 12,
		flexWrap: "nowrap",
	},
	headerWrapperStart: {
		flex: 1,
	},
	headerWrapperEnd: {
		flex: 1,
		alignItems: "flex-end",
	},
	headerText: {
		fontSize: 18,
	},
});

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
