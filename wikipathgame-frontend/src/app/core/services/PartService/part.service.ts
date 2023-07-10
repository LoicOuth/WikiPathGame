import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketConstants } from 'src/app/utils/socket.constants';
import { PageDto } from '../../models/PageDto';
import { GameService } from '../GameService/game.service';

@Injectable({
  providedIn: 'root',
})
export class PartService {
  public currentPartPath: Array<PageDto> = [];
  public _subTimer = this.socket.fromEvent<number>(SocketConstants.TIMER);

  constructor(private socket: Socket, private gameService: GameService) {}

  public finishPart(): void {
    this.socket.emit(
      SocketConstants.FINISH_PART,
      this.gameService.currentGame?.roomName,
      this.gameService.currentPlayer,
      this.currentPartPath
    );
  }
}
