import { Lang } from './enums/Lang.enum';
import { Part } from './Part.model';
import { Player } from './Player.model';

export class Game {
	public roomName: string;
	public maxPart: number;
	public timeBetweenParts: number;
	public parts: Array<Part>;
	public isStarted: boolean;
	public players: Array<Player>;
	public lang: Lang;

	constructor(
		roomName: string,
		maxPart: number,
		players: Array<Player>,
		isStarted: boolean = false,
		parts: Array<Part> = [],
		lang: Lang = Lang.FR,
		timeBetweenParts: number = 15
	) {
		this.roomName = roomName;
		this.maxPart = maxPart;
		this.players = players;
		this.isStarted = isStarted;
		this.parts = parts;
		this.lang = lang;
		this.timeBetweenParts = timeBetweenParts;
	}
}
