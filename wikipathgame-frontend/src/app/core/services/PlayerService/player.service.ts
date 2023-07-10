import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { SocketConstants } from 'src/app/utils/socket.constants';
import { GameService } from '../GameService/game.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    private socket: Socket,
    private gameService: GameService,
    private router: Router
  ) {}

  public changePlayerStatus(): void {
    this.gameService.currentPlayer!.ready =
      !this.gameService.currentPlayer?.ready;

    this.socket.emit(
      SocketConstants.CHANGE_PLAYER,
      this.gameService.currentGame?.roomName,
      this.gameService.currentPlayer
    );
  }

  public leaveRoom(): void {
    this.socket.emit(
      SocketConstants.LEAVE_ROOM,
      this.gameService.currentGame?.roomName
    );

    this.gameService.currentPlayer = undefined;
    this.gameService.currentGame = undefined;

    this.router.navigate(['']);
  }
}
