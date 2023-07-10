import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HrefToRouterLinkDirective } from '../directives/href-to-router-link.directive';
import { ModalComponent } from '../presentation/components/modal/modal.component';

@NgModule({
  declarations: [HrefToRouterLinkDirective, ModalComponent],
  imports: [CommonModule, FormsModule],
  exports: [
    CommonModule,
    FormsModule,

    //Directives
    HrefToRouterLinkDirective,

    //Component
    ModalComponent,
  ],
})
export class SharedModule {}
