import { Component } from '@angular/core';
import { GameService } from 'src/app/core/services/GameService/game.service';

@Component({
  selector: 'sidebar-game',
  templateUrl: './sidebar-game.component.html',
})
export class SidebarGameComponent {
  constructor(public gameService: GameService) {}
}
