import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/core/services/GameService/game.service';
import { PlayerService } from 'src/app/core/services/PlayerService/player.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
  private subscription?: Subscription;
  public isLoading: boolean = false;

  constructor(
    public gameService: GameService,
    public playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.gameService._subGame.subscribe((game) => {
      if (game.isStarted && game.parts.length > 0) {
        this.router.navigate([
          'game',
          game.parts[0].startPage.title.replace(/\s/g, '_'),
        ]);
        this.isLoading = false;
      } else if (game.isStarted) {
        this.isLoading = true;
      }
    });
  }

  public checkIfReady(): boolean {
    return this.gameService.currentGame?.players.some((el) => !el.ready)!;
  }

  public startGame(): void {
    this.gameService.startGame();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
