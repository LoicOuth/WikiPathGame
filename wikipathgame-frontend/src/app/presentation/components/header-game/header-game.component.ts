import { Component, Input } from '@angular/core';
import { IGame } from 'src/app/core/models/interfaces/IGame.interface';
import { IPart } from 'src/app/core/models/interfaces/IPart.interface';
import { GameService } from 'src/app/core/services/GameService/game.service';
import { PlayerService } from 'src/app/core/services/PlayerService/player.service';

@Component({
  selector: 'header-game',
  templateUrl: './header-game.component.html',
})
export class HeaderGameComponent {
  @Input('showLoader') showLoader: boolean = false;
  public currentPart?: IPart;
  public path: string = '';

  constructor(
    public gameService: GameService,
    private playerService: PlayerService
  ) {
    this.gameService._subGame.subscribe((game: IGame) => {
      this.currentPart = game.parts[game.parts.length - 1];

      this.path = `/game/${this.currentPart?.endPage.title.replace(
        /\s/g,
        '_'
      )}`;
    });

    this.currentPart =
      this.gameService.currentGame?.parts[
        this.gameService.currentGame?.parts.length - 1
      ];

    this.path = `/game/${this.currentPart?.endPage.title.replace(/\s/g, '_')}`;
  }

  public leaveGame(): void {
    this.playerService.leaveRoom();
  }
}
