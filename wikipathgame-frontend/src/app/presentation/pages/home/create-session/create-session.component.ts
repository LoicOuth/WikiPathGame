import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/core/services/GameService/game.service';
import { RoomService } from 'src/app/core/services/RoomService/room.service';
import { DEFAULT_PSEUDO } from 'src/app/utils/utils.constants';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
})
export class CreateSessionComponent {
  public pseudo: string = '';
  private subscription?: Subscription;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private gameService: GameService
  ) {}

  public createRoom(): void {
    if (this.pseudo.length <= 0) this.pseudo = DEFAULT_PSEUDO;

    this.roomService.createRoom(this.pseudo);

    this.subscription = this.gameService._subGame.subscribe(() =>
      this.router.navigate(['room'])
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
