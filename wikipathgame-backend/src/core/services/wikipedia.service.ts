import axios from 'axios';
import { IPageResponse } from '../../utils/apiResponse/IPages.response';
import { replaceHeigthInUrlPicture } from '../../utils/string.utils';
import { Lang } from '../models/enums/Lang.enum';
import { Page } from '../models/Page.model';

const wikiApiUrl =
	'wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=pageimages&grnlimit=2';

export class WikipediaService {
	private static _instance?: WikipediaService;

	constructor() {
		if (WikipediaService._instance) throw new Error('Use Singleton.instance');

		WikipediaService._instance = this;
	}

	public getTwoRandomPages = async (lang: Lang): Promise<Array<Page>> => {
		let finalArray: Array<Page> = [];

		try {
			let response = await axios.get(`https://${lang}.${wikiApiUrl}`);

			for (let i = 0; i < Object.keys(response.data.query.pages).length; i++) {
				let pageResponse = response.data.query.pages[
					Object.keys(response.data.query.pages)[i]
				] as IPageResponse;

				const responseHtml = await axios.get(
					encodeURI(
						`https://${lang}.wikipedia.org/w/api.php?origin=*&action=parse&page=${pageResponse.title.replace(
							/\s/g,
							'_'
						)}&format=json`
					)
				);

				finalArray.push(
					new Page(
						pageResponse.title,
						responseHtml.data.parse.text[
							Object.keys(responseHtml.data.parse.text)[0]
						],
						pageResponse.thumbnail != undefined
							? replaceHeigthInUrlPicture(pageResponse.thumbnail.source)
							: null
					)
				);
			}
		} catch (error: any) {
			console.error(error);
		}

		return finalArray;
	};

	static get instance() {
		return (
			WikipediaService._instance ??
			(WikipediaService._instance = new WikipediaService())
		);
	}
}
