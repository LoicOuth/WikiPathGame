import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/core/models/Player.model';
import { GameService } from 'src/app/core/services/GameService/game.service';
import { PartService } from 'src/app/core/services/PartService/part.service';
import { PlayerService } from 'src/app/core/services/PlayerService/player.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {
  public timer: number = 60;
  public sortedPlayer: Array<Player> = [];
  constructor(
    private partService: PartService,
    public gameService: GameService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.partService._subTimer.subscribe(
      (timer: number) => (this.timer = timer)
    );

    this.sortedPlayer = this.gameService.currentGame!.players.sort(
      (playerA: Player, playerB: Player) => {
        if (playerA.points > playerB.points) return -1;

        if (playerA.points < playerB.points) return 1;

        return 0;
      }
    );
  }

  public leaveRoom(): void {
    this.playerService.leaveRoom();
  }
}
