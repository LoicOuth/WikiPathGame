export interface IPageResponse {
	pageId: number;
	ns: number;
	title: string;
	thumbnail:
		| {
				source: string;
		  }
		| undefined;
}
