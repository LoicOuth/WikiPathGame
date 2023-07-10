import { Page } from './Page.model';
import { Player } from './Player.model';

export class Part {
	public inGame: boolean;
	public startPage: Page;
	public endPage: Page;
	public number: number;
	public winner: Player | null;
	public winnerPath: Array<Page> = [];

	constructor(
		inGame: boolean,
		startPage: Page,
		endPage: Page,
		number: number,
		winner: Player | null = null
	) {
		this.inGame = inGame;
		this.winner = winner;
		this.number = number;
		this.startPage = startPage;
		this.endPage = endPage;
	}
}
