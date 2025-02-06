import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
	const { t } = useTranslation();

	return (
		<Tabs initialRouteName="elections" screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name="elections"
				options={{
					title: t("elections"),
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="calendar" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="signers"
				options={{
					title: t("signers"),
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="users" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="authorities"
				options={{
					title: t("authorities"),
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="building" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
