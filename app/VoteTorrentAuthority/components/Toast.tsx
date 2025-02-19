import { Alert, Platform } from "react-native";
import * as Haptics from "expo-haptics";

interface ToastOptions {
	message: string;
	duration?: number;
	haptic?: boolean;
}

export function showToast({
	message,
	duration = 2000,
	haptic = true,
}: ToastOptions) {
	if (Platform.OS === "web") {
		// Use browser's native toast on web
		alert(message);
		return;
	}

	if (haptic) {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
	}

	Alert.alert(
		"",
		message,
		[
			{
				text: "OK",
				onPress: () => {},
				style: "cancel",
			},
		],
		{
			cancelable: true,
			userInterfaceStyle: "unspecified",
		}
	);
}
