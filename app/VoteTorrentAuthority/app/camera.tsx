import React from "react";
import {
	Button,
	StyleSheet,
	View,
	Text,
	ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useCameraPermissions, CameraView, CameraType } from "expo-camera";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function CameraScreen() {
	const { colors } = useTheme();
	const { t } = useTranslation();
	const router = useRouter();
	const [facing, setFacing] = useState<CameraType>("back");
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color={colors.text} />
			</View>
		);
	}

	if (!permission.granted) {
		// Camera permissions are not granted
		return (
			<View style={styles.container}>
				<Text style={styles.message}>{t("cameraPermissionMessage")}</Text>
				<Button onPress={requestPermission} title={t("grantPermission")} />
			</View>
		);
	}

	return (
		<>
			<Stack.Screen
				options={{
					headerLeft: () => (
						<FontAwesome6
							name="xmark"
							size={24}
							color={colors.text}
							// This is using onPressIn because of a bug with onPress in headers
							onPressIn={() => router.back()}
						/>
					),
					title: t("scanQrCode"),
					headerTitleAlign: "center",
					headerShadowVisible: false,
				}}
			/>
			<Text>Hello</Text>
			<View style={styles.container}>
				{/* TODO get this working right */}
				<CameraView style={styles.camera} facing={facing}></CameraView>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	camera: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	message: {
		marginBottom: 16,
	},
});
