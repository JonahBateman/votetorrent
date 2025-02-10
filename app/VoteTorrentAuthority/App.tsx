import React, { StrictMode } from "react";
import { ExpoRoot } from "expo-router";

export default function App() {
	const ctx = require.context("./app");
	return (
		<StrictMode>
			<ExpoRoot context={ctx} />
		</StrictMode>
	);
}
