import { Todo } from './../interface/todo';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  private url = 'https://todo-angular-78078-default-rtdb.firebaseio.com/todos';

  private subjectTodos = new Subject<Todo[]>();
  todosSource = this.subjectTodos.asObservable();

  private subjectTodo = new Subject<Todo>();
  todoSource = this.subjectTodo.asObservable();

  todos: Todo[] = [];

  async getTodos() {
    this.http.get<Todo[]>(`${this.url}.json`).subscribe((data) => {
      this.todos = [];
      if (data) {
        this.todos = Object.keys(data).map((key: any) => {
          data[key].id = key;
          return data[key];
        });
      }
      this.subjectTodos.next(this.todos);
    });
  }

  async addTodo(todo: Todo): Promise<any> {
    if (!todo.id) {
      todo.created_at = new Date().toISOString();
    }
    return this.http.post(`${this.url}.json`, todo).subscribe((data) => {
      if (data) {
        return true;
      }

      return false;
    });
  }

  changeStatus(todo: any): void {
    todo.completed = !todo.completed;

    this.http.patch(`${this.url}/${todo.id}.json`, todo).subscribe((data) => {
      if (data) {
        this.getTodos();
      }
    });
  }

  async deleteTodo(todo: Object) {
    this.http.delete(`${this.url}/${todo}.json`).subscribe((data) => {
      if (!data) {
        this.getTodos();
      }
    });
  }

  async updateTodo(todo: Todo): Promise<any> {
    return this.http
      .patch(`${this.url}/${todo.id}.json`, todo)
      .subscribe((data) => {
        if (data) {
          this.getTodos();
          return true;
        }

        return false;
      });
  }

  async getTodo(id: string) {
    this.http.get<Todo>(`${this.url}/${id}.json`).subscribe((data) => {
      this.subjectTodo.next(data);
    });
  }
}
