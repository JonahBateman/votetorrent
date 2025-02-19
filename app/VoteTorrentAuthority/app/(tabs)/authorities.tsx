import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { InfoCard } from "../../components/InfoCard";
import { CollapsibleSection } from "../../components/CollapsibleSection";
import { ChipButton } from "../../components/ChipButton";
import { ThemedText } from "../../components/ThemedText";
import { useDispatch, useSelector } from "react-redux";
import {
	selectPinnedAuthorities,
	togglePin,
	selectFilteredUnpinnedAuthorities,
} from "@/store/slices/authoritySlice";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { RootState } from "@/store";

export default function Authorities() {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState("");
	const pinnedAuthorities = useSelector(selectPinnedAuthorities);
	const unpinnedAuthorities = useSelector((state: RootState) =>
		selectFilteredUnpinnedAuthorities(state, searchText)
	);
	const { t } = useTranslation();
	const router = useRouter();

	const handlePinToggle = (id: string) => {
		dispatch(togglePin(id));
	};

	return (
		<ScrollView style={styles.container}>
			{pinnedAuthorities.length > 0 ? (
				pinnedAuthorities.map((authority) => (
					<InfoCard
						key={authority.id}
						image={authority.image}
						title={authority.title}
						additionalInfo={[
							{ label: "CID", value: authority.cid },
							{ label: "Address", value: authority.address },
						]}
						icon={"chevron-right"}
						onPress={() => {
							router.push({
								pathname: "/authorityDetails",
								params: {
									authorityId: authority.id,
								},
							});
						}}
					/>
				))
			) : (
				<ThemedText style={styles.emptyText}>
					{t("noPinnedAuthorities")}
				</ThemedText>
			)}

			<View style={styles.buttonContainer}>
				<ChipButton
					label={t("addAuthority")}
					icon="circle-plus"
					onPress={() => {
						console.log("Add authority pressed");
					}}
				/>
			</View>

			<CollapsibleSection
				title={t("find")}
				searchPlaceholder={t("filterAuthorities")}
				onSearch={setSearchText}
			>
				{unpinnedAuthorities.length > 0 ? (
					unpinnedAuthorities.map((authority) => (
						<InfoCard
							key={authority.id}
							image={authority.image}
							title={authority.title}
							additionalInfo={[
								{ label: "CID", value: authority.cid },
								{ label: "Address", value: authority.address },
							]}
							icon={"thumb-tack"}
							onPress={() => handlePinToggle(authority.id)}
						/>
					))
				) : (
					<ThemedText style={styles.emptyText}>No authorities found</ThemedText>
				)}
			</CollapsibleSection>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 16,
	},
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginVertical: 8,
	},
	emptyText: {
		textAlign: "center",
		marginVertical: 16,
		opacity: 0.7,
	},
});
