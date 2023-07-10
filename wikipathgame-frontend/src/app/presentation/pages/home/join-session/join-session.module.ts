import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { JoinSessionRoutingModule } from './join-session-routing.module';
import { JoinSessionComponent } from './join-session.component';

@NgModule({
  declarations: [JoinSessionComponent],
  imports: [SharedModule, JoinSessionRoutingModule],
})
export class JoinSessionModule {}
