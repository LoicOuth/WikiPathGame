import { Player } from '../Player.model';
import { IPart } from './IPart.interface';

export interface IGame {
  roomName: string;
  maxPart: number;
  parts: Array<IPart>;
  isStarted: boolean;
  players: Array<Player>;
  lang: string;
  timeBetweenParts: number;
}
