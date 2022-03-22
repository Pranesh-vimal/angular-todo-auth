import { TodoviewRoutingModule } from './todoview-routing.module';
import { TodoviewComponent } from './todoview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TodoviewComponent],
  imports: [CommonModule, TodoviewRoutingModule],
})
export class TodoviewModule {}
