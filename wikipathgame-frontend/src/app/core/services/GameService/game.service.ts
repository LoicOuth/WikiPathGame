import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { SocketConstants } from 'src/app/utils/socket.constants';
import { IGame } from '../../models/interfaces/IGame.interface';
import { Player } from '../../models/Player.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public currentGame?: IGame;
  public currentPlayer?: Player;
  public _subGame = this.socket.fromEvent<IGame>(SocketConstants.GAME_CHANGE);

  constructor(private socket: Socket, private router: Router) {}

  public startService(): void {
    this._subGame.subscribe((game) => (this.currentGame = game));

    this.socket.fromEvent(SocketConstants.END_GAME).subscribe(() => {
      this.currentGame = undefined;
      this.router.navigate(['']);
    });
  }

  public gameSettingChange(): void {
    this.socket.emit(SocketConstants.GAME_SETTING_CHANGE, this.currentGame);
  }

  public startGame(): void {
    this.socket.emit(SocketConstants.START_GAME, this.currentGame?.roomName);
  }
}
