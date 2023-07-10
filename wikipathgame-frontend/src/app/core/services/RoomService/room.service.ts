import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { generateRandomString } from 'src/app/utils/randomGenerator.utils';
import { SocketConstants } from 'src/app/utils/socket.constants';
import { Player } from '../../models/Player.model';
import { GameService } from '../GameService/game.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private socket: Socket, private gameService: GameService) {}

  public createRoom(pseudo: string): void {
    const player = new Player(pseudo, this.socket.ioSocket.id, true);
    this.gameService.currentPlayer = player;

    this.socket.emit(
      SocketConstants.CREATE_ROOM,
      generateRandomString(),
      player
    );
  }

  public joinRoom(roomName: string, pseudo: string): void {
    const player = new Player(pseudo, this.socket.ioSocket.id);
    this.gameService.currentPlayer = player;

    this.socket.emit(SocketConstants.JOIN_ROOM, roomName, player);
  }
}
