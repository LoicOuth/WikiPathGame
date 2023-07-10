import { NgModule } from '@angular/core';

import { AppLayoutRoutingModule } from './app-layout-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppLayoutComponent } from './app-layout.component';


@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    SharedModule,
    AppLayoutRoutingModule
  ]
})
export class AppLayoutModule { }
