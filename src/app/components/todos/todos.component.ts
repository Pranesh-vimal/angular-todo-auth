import { Category } from './../../enum/category';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from './../../interface/todo';
import { TodosService } from './../../services/todos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(
    private todoService: TodosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  todos: Todo[] = [];
  categories = Object.values(Category);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['category'] && !this.categories.includes(params['category'])) {
        this.router.navigate(['/']);
      }
      this.todoService.getTodos();
      this.todoService.todosSource.subscribe((todos) => {
        if (params['category']) {
          this.todos = todos.filter(
            (todo) => todo.category === params['category']
          );
        } else {
          this.todos = todos;
        }
      });
    });
  }

  changeStatus(id: Object): void {
    this.todoService.changeStatus(id);
  }

  deleteTodo(id: Object): void {
    this.todoService.deleteTodo(id);
  }
}
