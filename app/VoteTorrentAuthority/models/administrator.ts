export const mockAdmins: Administrator[] = [
	{
		id: "1",
		image: require("../assets/images/stock-man.jpg"),
		name: "John Doe",
		position: "County Clerk",
		cid: "QmX40sdfn2T54",
	},
	{
		id: "2",
		image: require("../assets/images/stock-woman.jpg"),
		name: "Jane Smith",
		position: "Assistant County Clerk",
		cid: "QmY40sdfn2T54",
	},
];

export interface Administrator {
	id: string;
	image: any;
	name: string;
	position: string;
	cid: string;
}