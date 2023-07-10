import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InGameGuard } from './guards/InGameGuard/in-game.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./presentation/layouts/app-layout/app-layout.module').then(
        (m) => m.AppLayoutModule
      ),
  },
  {
    path: 'game/:page',
    loadChildren: () =>
      import('./presentation/pages/game/game.module').then((m) => m.GameModule),
    canActivate: [InGameGuard],
    canDeactivate: [InGameGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
