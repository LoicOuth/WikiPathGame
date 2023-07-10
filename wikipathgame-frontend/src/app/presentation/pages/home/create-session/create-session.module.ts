import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CreateSessionRoutingModule } from './create-session-routing.module';
import { CreateSessionComponent } from './create-session.component';

@NgModule({
  declarations: [CreateSessionComponent],
  imports: [CreateSessionRoutingModule, SharedModule],
})
export class CreateSessionModule {}
