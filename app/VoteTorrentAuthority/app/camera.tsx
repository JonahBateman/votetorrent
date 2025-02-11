import React from "react";
import { Button, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Camera, useCameraPermissions, CameraView } from "expo-camera";
import { useTranslation } from "react-i18next";

export default function CameraScreen() {
	const { colors } = useTheme();
	const { t } = useTranslation();
	const router = useRouter();
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading
		return <View />;
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
						<FontAwesome
							name="close"
							size={24}
							color={colors.text}
							onPress={() => router.back()}
						/>
					),
					title: t("scanQrCode"),
					headerShadowVisible: false,
				}}
			/>
			<View style={styles.container}>
				{/* TODO get this working right */}
				<CameraView style={styles.camera}></CameraView>
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
