import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { LeaderboardComponent } from './leaderboard.component';

@NgModule({
  declarations: [LeaderboardComponent],
  imports: [SharedModule, LeaderboardRoutingModule],
})
export class LeaderboardModule {}
