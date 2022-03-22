import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from './../../services/todos.service';
import { Category } from './../../enum/category';
import { Todo } from './../../interface/todo';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  todo: Todo = {
    id: '',
    title: '',
    description: '',
    category: '',
    completed: false,
    created_at: new Date().toISOString(),
  };

  categories = Object.values(Category);

  constructor(
    private todoService: TodosService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.todoService.getTodos();
      this.todoService.todosSource.subscribe((todos) => {
        if (params['id']) {
          this.todo =
            todos.find((todo) => todo.id === params['id']) || this.todo;
        }
      });
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (
      !this.todo.title ||
      !this.todo.category ||
      !this.todo.description ||
      !this.todo.category ||
      !this.todo.created_at
    ) {
      this.toastr.error('Please fill all the fields', 'Error', {
        timeOut: 3000,
        progressBar: true,
      });
      return;
    }

    if (String(this.todo.completed) === 'false') {
      this.todo.completed = false;
    } else {
      this.todo.completed = true;
    }

    if (this.todo.id) {
      if (await this.todoService.updateTodo(this.todo)) {
        this.router.navigate(['/']);
      }
    } else {
      if (await this.todoService.addTodo(this.todo)) {
        this.router.navigate(['']);
      }
    }
  }
}
