import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/core/services/GameService/game.service';
import { RoomService } from 'src/app/core/services/RoomService/room.service';
import { DEFAULT_PSEUDO } from 'src/app/utils/utils.constants';

@Component({
  selector: 'app-join-session',
  templateUrl: './join-session.component.html',
})
export class JoinSessionComponent {
  public pseudo: string = '';
  public gameCode: string = '';
  public errorCode: boolean = false;
  private subscription?: Subscription;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private gameService: GameService
  ) {}

  public joinRoom(): void {
    this.errorCode = false;

    if (this.gameCode.length <= 0) this.errorCode = true;
    else {
      if (this.pseudo.length <= 0) this.pseudo = DEFAULT_PSEUDO;

      this.roomService.joinRoom(this.gameCode, this.pseudo);

      this.subscription = this.gameService._subGame.subscribe(() =>
        this.router.navigate(['room'])
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
