import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InGameGuard } from 'src/app/guards/InGameGuard/in-game.guard';
import { AppLayoutComponent } from './app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'room',
        loadChildren: () =>
          import('../../pages/room/room.module').then((m) => m.RoomModule),
        canActivate: [InGameGuard],
        canDeactivate: [InGameGuard],
      },
      {
        path: 'leaderboard',
        loadChildren: () =>
          import('../../pages/leaderboard/leaderboard.module').then(
            (m) => m.LeaderboardModule
          ),
        canActivate: [InGameGuard],
        canDeactivate: [InGameGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppLayoutRoutingModule {}
