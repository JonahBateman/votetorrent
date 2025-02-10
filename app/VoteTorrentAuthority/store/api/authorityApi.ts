import { createApi } from '@reduxjs/toolkit/query/react';
import { Authority } from '../../models';

const MOCK_AUTHORITIES: Authority[] = [
	{
		id: "1",
		image: require("../../assets/images/utah-flag.png"),
		title: "Utah State Elections",
		subtitle: "State • Elections Commission",
		isPinned: true,
	},
	{
		id: "2",
		image: require("../../assets/images/utah-flag.png"),
		title: "Salt Lake County",
		subtitle: "County • Elections Division",
		isPinned: true,
	},
	{
		id: "3",
		image: require("../../assets/images/utah-flag.png"),
		title: "Provo City",
		subtitle: "City • Municipal Elections",
		isPinned: true,
	},
	{
		id: "4",
		image: require("../../assets/images/utah-flag.png"),
		title: "Weber County",
		subtitle: "County • Elections Division",
		isPinned: false,
	},
	{
		id: "5",
		image: require("../../assets/images/utah-flag.png"),
		title: "Logan City",
		subtitle: "City • Municipal Elections",
		isPinned: false,
	},
  {
    id: "6",
    image: require("../../assets/images/utah-flag.png"),
    title: "Orem City",
    subtitle: "City • Municipal Elections",
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
      
      if (args.type === 'pinAuthority') {
        await new Promise(resolve => setTimeout(resolve, 200));
        mockAuthorities = mockAuthorities.map(authority => 
          authority.id === args.payload 
            ? { ...authority, isPinned: true }
            : authority
        );
        return { data: true };
      }
      
      throw new Error('Unknown operation');
    } catch (error) {
      return { error };
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
        pinAuthority: builder.mutation<void, string>({
            query: (id) => ({ 
                type: 'pinAuthority',
                payload: id 
            }),
            // Optimistically update the cache
            onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    authorityApi.util.updateQueryData('getAuthorities', undefined, (draft) => {
                        const authority = draft.find(a => a.id === id);
                        if (authority) {
                            authority.isPinned = true;
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
    usePinAuthorityMutation,
} = authorityApi;