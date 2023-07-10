export class Player {
	public pseudo: string;
	public idSocket: string;
	public points: number;
	public ready: boolean;
	public isMaster: boolean;

	constructor(
		pseudo: string,
		idSocket: string,
		isMaster: boolean = false,
		points: number = 0,
		ready: boolean = false
	) {
		this.pseudo = pseudo;
		this.idSocket = idSocket;
		this.points = points;
		this.ready = ready;
		this.isMaster = isMaster;
	}
}
