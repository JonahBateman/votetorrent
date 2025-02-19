import { createApi } from '@reduxjs/toolkit/query/react';
import { Authority } from '../../models';

const MOCK_AUTHORITIES: Authority[] = [
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
		domainName: "saltlakecounty.gov",
		cid: "QmZjkl4GIafds123",
		address: "/dns/saltlakecounty.gov/tcp/443/p2p/QmZjds123",
		signature: "[valid]",
		isPinned: true,
	},
	{
		id: "3",
		image: require("../../assets/images/utah-flag.png"),
		title: "Provo City",
		domainName: "provo.gov",
		cid: "QmZjkl4GIafds123",
		address: "/dns/provo.gov/tcp/443/p2p/QmZjkl4GIafds123",
		signature: "[valid]",
		isPinned: true,
	},
	{
		id: "4",
		image: require("../../assets/images/utah-flag.png"),
		title: "Weber County",
		domainName: "webercounty.gov",
		cid: "QmZjkl4GIafds123",
		address: "/dns/webercounty.gov/tcp/443/p2p/QmZjkl4GIafds123",
		signature: "[valid]",
		isPinned: false,
	},
	{
		id: "5",
		image: require("../../assets/images/utah-flag.png"),
		title: "Logan City",
		domainName: "logancity.gov",
		cid: "QmZjkl4GIafds123",
		address: "/dns/logancity.gov/tcp/443/p2p/QmZjkl4GIafds123",
		signature: "[valid]",
		isPinned: false,
	},
  {
    id: "6",
    image: require("../../assets/images/utah-flag.png"),
    title: "Orem City",
    domainName: "orem.gov",
    cid: "QmZjkl4GIafds123",
    address: "/dns/orem.gov/tcp/443/p2p/QmZjkl4GIafds123",
    signature: "[valid]",
    isPinned: false,
  },
];

let mockAuthorities = [...MOCK_AUTHORITIES];

// Custom base query for P2P operations
const p2pBaseQuery = () => 
  async (args: any) => {
    try {
      if (args.type === 'getAuthorities') {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockAuthorities };
      }
      
      if (args.type === 'pinToggleAuthority') {
        await new Promise(resolve => setTimeout(resolve, 200));
        mockAuthorities = mockAuthorities.map(authority => 
          authority.id === args.payload 
            ? { ...authority, isPinned: !authority.isPinned }
            : authority
        );
        return { data: null };
      }
      
      throw new Error(`Unknown operation type: ${args.type}`);
    } catch (error: any) {
      return { 
        error: { 
          status: 'CUSTOM_ERROR',
          data: error?.message ?? 'Unknown error'
        }
      };
    }
  };

export const authorityApi = createApi({
    reducerPath: 'authorityApi',
    baseQuery: p2pBaseQuery(),
    tagTypes: ['Authority'],
    endpoints: (builder) => ({
        getAuthorities: builder.query<Authority[], void>({
            query: () => ({ type: 'getAuthorities' }),
            providesTags: ['Authority'],
        }),
        pinToggleAuthority: builder.mutation<void, string>({
            query: (id) => ({ 
                type: 'pinToggleAuthority',
                payload: id 
            }),
            // Optimistically update the cache
            onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    authorityApi.util.updateQueryData('getAuthorities', undefined, (draft) => {
                        const authority = draft.find(a => a.id === id);
                        if (authority) {
                            authority.isPinned = !authority.isPinned;
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ['Authority'],
        }),
    }),
});

export const {
    useGetAuthoritiesQuery,
    usePinToggleAuthorityMutation,
} = authorityApi;