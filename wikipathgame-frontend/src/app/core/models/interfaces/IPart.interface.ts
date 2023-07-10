import { IPage } from '../interfaces/IPage.interface';
import { Player } from '../Player.model';

export interface IPart {
  inGame: boolean;
  startPage: IPage;
  endPage: IPage;
  winner: Player | null;
  number: number;
  winnerPath: Array<IPage>;
}
