import React, { useState, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useTheme } from "@react-navigation/native";

interface CollapsibleSectionProps {
	title: string;
	children: React.ReactNode;
	searchPlaceholder?: string;
	onSearch?: (text: string) => void;
}

export function CollapsibleSection({
	title,
	children,
	searchPlaceholder = "Search...",
	onSearch,
}: CollapsibleSectionProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [searchText, setSearchText] = useState("");
	const { colors } = useTheme();

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
				<View style={styles.titleContainer}>
					<ThemedText type="subtitle">{title}</ThemedText>
					<FontAwesome
						color={colors.text}
						name={isExpanded ? "chevron-up" : "chevron-down"}
						size={16}
						style={styles.chevron}
					/>
				</View>
			</TouchableOpacity>
			{isExpanded && (
				<>
					<View
						style={[styles.searchContainer, { backgroundColor: colors.card }]}
					>
						<FontAwesome name="search" size={16} color={colors.text} />
						<TextInput
							style={[styles.searchInput, { color: colors.text }]}
							placeholder={searchPlaceholder}
							placeholderTextColor={colors.text}
							value={searchText}
							onChangeText={(text) => {
								setSearchText(text);
								onSearch?.(text);
							}}
						/>
					</View>
					{children}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 16,
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	chevron: {
		marginLeft: 8,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		paddingLeft: 16,
		marginTop: 8,
		marginBottom: 8,
		borderRadius: 32,
	},
	searchInput: {
		flex: 1,
		marginLeft: 8,
		padding: 4,
	},
});
