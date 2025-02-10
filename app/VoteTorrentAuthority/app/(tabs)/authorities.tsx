import React, { useState } from "react";
import { ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import AuthorityCard from "../../components/AuthorityCard";
import { CollapsibleSection } from "../../components/CollapsibleSection";
import { ChipButton } from "../../components/ChipButton";
import { ThemedText } from "../../components/ThemedText";
import {
	useGetAuthoritiesQuery,
	usePinAuthorityMutation,
} from "@/store/api/authorityApi";

export default function Authorities() {
	const { data: authorities, isLoading } = useGetAuthoritiesQuery();
	const [pinAuthority] = usePinAuthorityMutation();
	const [searchText, setSearchText] = useState("");

	const pinnedAuthorities = authorities?.filter((a) => a.isPinned) ?? [];
	const unpinnedAuthorities =
		authorities?.filter(
			(a) =>
				!a.isPinned && a.title.toLowerCase().includes(searchText.toLowerCase())
		) ?? [];

	const handlePin = async (id: string) => {
		try {
			await pinAuthority(id);
		} catch (error) {
			console.error("Failed to pin authority:", error);
		}
	};

	if (isLoading) {
		return (
			<View style={styles.centerContainer}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<ScrollView style={styles.container}>
			{pinnedAuthorities.length > 0 ? (
				pinnedAuthorities.map((authority) => (
					<AuthorityCard
						key={authority.id}
						authority={authority}
						onPress={() => {
							console.log(`Pressed ${authority.title}`);
						}}
					/>
				))
			) : (
				<ThemedText style={styles.emptyText}>
					No pinned authorities yet
				</ThemedText>
			)}

			<View style={styles.buttonContainer}>
				<ChipButton
					label="ADD AUTHORITY"
					icon="plus-circle"
					onPress={() => {
						console.log("Add authority pressed");
					}}
				/>
			</View>

			<CollapsibleSection
				title="Find"
				searchPlaceholder="Filter authorities..."
				onSearch={setSearchText}
			>
				{unpinnedAuthorities.length > 0 ? (
					unpinnedAuthorities.map((authority) => (
						<AuthorityCard
							key={authority.id}
							authority={authority}
							onPress={() => handlePin(authority.id)}
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
