export class Player {
  public pseudo: string;
  public idSocket: string;
  public points: number;
  public ready: boolean;
  public isMaster: boolean;

  constructor(
    pseudo: string,
    idSocket: string = '',
    isMaster: boolean = false,
    ready: boolean = false,
    points: number = 0
  ) {
    this.pseudo = pseudo;
    this.idSocket = idSocket;
    this.isMaster = isMaster;
    this.ready = ready;
    this.points = points;
  }
}
