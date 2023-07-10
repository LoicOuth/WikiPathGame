export class Page {
	public title: string;
	public pic: string | null;
	public html: string | null;

	constructor(
		title: string,
		html: string | null = null,
		pic: string | null = null
	) {
		this.title = title;
		this.pic = pic;
		this.html = html;
	}
}
