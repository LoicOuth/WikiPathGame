import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderGameComponent } from '../../components/header-game/header-game.component';
import { SidebarGameComponent } from '../../components/sidebar-game/sidebar-game.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [GameComponent, HeaderGameComponent, SidebarGameComponent],
  imports: [GameRoutingModule, SharedModule],
})
export class GameModule {}
