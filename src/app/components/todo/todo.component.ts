import { Todo } from './../../interface/todo';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: any;
  @Output() emitChangeStatus: EventEmitter<Number> = new EventEmitter();
  @Output() emitDeleteTodo: EventEmitter<Number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changeStatus(id: Number): void {
    this.emitChangeStatus.emit(id);
  }

  deleteTodo(id: Number): void {
    this.emitDeleteTodo.emit(id);
  }
}
