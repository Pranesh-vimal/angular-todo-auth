import { AuthenticationService } from './../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Todo } from './../../interface/todo';
import { TodosService } from './../../services/todos.service';
import { Category } from './../../enum/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor(
    private todoService: TodosService,
    private route: ActivatedRoute,
    public authService: AuthenticationService
  ) {}

  categories = Object.values(Category);

  count: Number = 0;
  pending: Number = 0;
  completed: Number = 0;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.todoService.getTodos();
      this.todoService.todosSource.subscribe((todos) => {
        if (params['category']) {
          todos = todos.filter((todo) => todo.category === params['category']);
        } else {
          todos = todos;
        }

        this.count = todos.length;
        this.pending = todos.filter((todo: Todo) => !todo.completed).length;
        this.completed = todos.filter((todo: Todo) => todo.completed).length;
      });
    });
  }
}
