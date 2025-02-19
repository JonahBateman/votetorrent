import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Authority } from '../../models';
import { RootState } from '..';

const INITIAL_AUTHORITIES: Authority[] = [
	{
		id: "1",
		image: require("../../assets/images/utah-flag.png"),
		title: "Utah State Elections",
		domainName: "utah.gov",
		cid: "QmZjkl4GIafds123",
		address: "/dns/utah.gov/tcp/443/p2p/QmZjkls123",
		signature: "[valid]",
		isPinned: true,
	},
	{
		id: "2",
		image: require("../../assets/images/utah-flag.png"),
		title: "Salt Lake County",
		domainName: "slco.gov",
		cid: "QmZjkl4GIafds123",
		address: "/dns/slco.gov/tcp/443/p2p/QmZjkls123",
		signature: "[valid]",
		isPinned: true,
	},
	{
		id: "3",
		image: require("../../assets/images/utah-flag.png"),
		title: "Utah County",
		domainName: "utahcounty.gov",
		cid: "QmZjkl4GIafds123",
		address: "/dns/utahcounty.gov/tcp/443/p2p/QmZjkls123",
		signature: "[valid]",
		isPinned: true,
	},
	{
		id: "4",
		image: require("../../assets/images/utah-flag.png"),
		title: "Provo City",
		domainName: "provo.gov",
		cid: "QmZjkl4GIafds123",
		address: "/dns/provo.gov/tcp/443/p2p/QmZjkls123",
		signature: "[valid]",
		isPinned: false,
	},
	{
		id: "5",
		image: require("../../assets/images/utah-flag.png"),
		title: "Orem City",
		domainName: "orem.gov",
		cid: "QmZjkl4GIafds123",
		address: "/dns/orem.gov/tcp/443/p2p/QmZjkls123",
		signature: "[valid]",
		isPinned: false,
	},
	{
		id: "6",
		image: require("../../assets/images/utah-flag.png"),
		title: "West Jordan City",
		domainName: "westjordan.gov",
		cid: "QmZjkl4GIafds123",
		address: "/dns/westjordan.gov/tcp/443/p2p/QmZjkls123",
		signature: "[valid]",
		isPinned: false,
	}
];

interface AuthorityState {
	authorities: Authority[];
}

const initialState: AuthorityState = {
	authorities: INITIAL_AUTHORITIES,
};

export const authoritySlice = createSlice({
	name: 'authority',
	initialState,
	reducers: {
		togglePin: (state, action: PayloadAction<string>) => {
			const authority = state.authorities.find(a => a.id === action.payload);
			if (authority) {
				authority.isPinned = !authority.isPinned;
			}
		},
	},
});

export const { togglePin } = authoritySlice.actions;

// Base selector
const selectAuthorityState = (state: RootState) => state.authority;

// Memoized selectors
export const selectAuthorities = createSelector(
	[selectAuthorityState],
	(authorityState) => authorityState.authorities
);

export const selectPinnedAuthorities = createSelector(
	[selectAuthorities],
	(authorities) => authorities.filter(a => a.isPinned)
);

export const selectUnpinnedAuthorities = createSelector(
	[selectAuthorities],
	(authorities) => authorities.filter(a => !a.isPinned)
);

export const selectFilteredUnpinnedAuthorities = createSelector(
	[selectAuthorities, (_state: RootState, search: string) => search],
	(authorities, search) => 
		authorities.filter(
			a => !a.isPinned && 
			a.title.toLowerCase().includes(search.toLowerCase())
		)
);

export default authoritySlice.reducer; 