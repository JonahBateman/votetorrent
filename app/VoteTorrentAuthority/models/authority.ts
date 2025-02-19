//needs to be updated to use correct fields
export interface Authority {
	id: string;
	image: any;
	title: string;
	domainName: string;
	cid: string;
	address: string;
	signature: string;
	isPinned?: boolean;
}