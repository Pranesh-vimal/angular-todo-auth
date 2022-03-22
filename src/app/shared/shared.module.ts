import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [],
  imports: [CommonModule, HotToastModule.forRoot()],
  exports: [HotToastModule],
})
export class SharedModule {}
