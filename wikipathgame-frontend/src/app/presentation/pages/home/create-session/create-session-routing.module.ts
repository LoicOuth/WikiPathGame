import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSessionComponent } from './create-session.component';

const routes: Routes = [{ path: '', component: CreateSessionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSessionRoutingModule {}
