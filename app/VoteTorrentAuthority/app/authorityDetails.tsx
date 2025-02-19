import { FontAwesome6 } from "@expo/vector-icons";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { togglePin, selectAuthorities } from "@/store/slices/authoritySlice";
import { ChipButton } from "../components/ChipButton";
import { InfoCard } from "../components/InfoCard";
import { ThemedText } from "../components/ThemedText";
import { mockAdmins } from "../models/administrator";

export default function AuthorityDetails() {
	const { colors } = useTheme() as ExtendedTheme;
	const router = useRouter();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { authorityId } = useLocalSearchParams<{ authorityId: string }>();
	const authorities = useSelector(selectAuthorities);
	const authorityData = authorities.find((a) => a.id === authorityId);

	if (!authorityData) {
		return null;
	}

	const authorityDetails = [
		{ label: t("name"), value: authorityData.title },
		{
			label: t("domainName"),
			value: authorityData.domainName,
		},
		{ label: t("cid"), value: authorityData.cid },
		{ label: t("address"), value: authorityData.address },
		{ label: t("signature"), value: authorityData.signature },
	];

	const adminFields = [
		{ label: t("cid"), value: "QmAsdn$(leRJ456" },
		{ label: t("priorCid"), value: "QmBasdn$2nfs789" },
		{ label: t("handoffSignature"), value: "[valid]" },
		{ label: t("expires"), value: "December 31, 2025" },
	];

	const handlePinToggle = (id: string) => {
		dispatch(togglePin(id));
	};

	return (
		<>
			<Stack.Screen
				options={{
					headerLeft: () => (
						<FontAwesome6
							name="xmark"
							size={24}
							color={colors.text}
							onPressIn={() => router.back()}
						/>
					),
					headerRight: () => (
						<ChipButton
							label={authorityData.isPinned ? t("unpin") : t("pin")}
							icon={authorityData.isPinned ? "thumbtack-slash" : "thumbtack"}
							onPress={() => handlePinToggle(authorityData.id)}
						/>
					),
					title: "",
					headerShadowVisible: false,
				}}
			/>
			<ScrollView style={styles.container}>
				<View style={styles.section}>
					<ThemedText type="title">{t("authority")}</ThemedText>
					<Image
						source={authorityData.image}
						style={styles.authorityImage}
						resizeMode="contain"
					/>
					{authorityDetails.map((field) => (
						<View key={field.label} style={styles.field}>
							<ThemedText type="defaultSemiBold">{field.label}: </ThemedText>
							<ThemedText>{field.value}</ThemedText>
						</View>
					))}
				</View>

				<View style={styles.section}>
					<ThemedText type="title">{t("administration")}</ThemedText>
					{adminFields.map((field) => (
						<View key={field.label} style={styles.field}>
							<ThemedText type="defaultSemiBold">{field.label}: </ThemedText>
							<ThemedText>{field.value}</ThemedText>
						</View>
					))}

					{mockAdmins.map((admin) => (
						<InfoCard
							key={admin.id}
							image={admin.image}
							title={admin.name}
							additionalInfo={[
								{
									label: t("position"),
									value: admin.position,
								},
								{ label: t("cid"), value: admin.cid },
							]}
							icon="chevron-right"
							onPress={() => console.log(`Pressed ${admin.name}`)}
						/>
					))}

					<TouchableOpacity
						style={[styles.handoffButton, { backgroundColor: colors.contrast }]}
						onPress={() => console.log("Hand-off")}
					>
						<ThemedText style={[styles.handoffText, { color: colors.card }]}>
							{t("handoff")}
						</ThemedText>
						<FontAwesome6
							name="triangle-exclamation"
							size={16}
							color={colors.warning}
							style={styles.handoffIcon}
						/>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	section: {
		marginBottom: 24,
	},
	authorityImage: {
		height: 100,
		alignSelf: "center",
		marginVertical: 16,
	},
	field: {
		flexDirection: "row",
	},
	handoffButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 12,
		borderRadius: 32,
		marginTop: 16,
	},
	handoffIcon: {
		marginLeft: 8,
	},
	handoffText: {
		fontWeight: "bold",
	},
});
