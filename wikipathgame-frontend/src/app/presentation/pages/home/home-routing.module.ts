import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'session/create', pathMatch: 'full' },
      {
        path: 'session/create',
        loadChildren: () =>
          import('./create-session/create-session.module').then(
            (m) => m.CreateSessionModule
          ),
      },
      {
        path: 'session/join',
        loadChildren: () =>
          import('./join-session/join-session.module').then(
            (m) => m.JoinSessionModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
