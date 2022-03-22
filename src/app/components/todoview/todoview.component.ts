import { Todo } from './../../interface/todo';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from 'src/app/services/todos.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todoview',
  templateUrl: './todoview.component.html',
  styleUrls: ['./todoview.component.scss'],
})
export class TodoviewComponent implements OnInit, OnDestroy {
  constructor(
    private todoService: TodosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  todo!: Todo;

  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.todoService.getTodo(params['id']);
      this.subscription = this.todoService.todoSource.subscribe((todo) => {
        if (todo) {
          this.todo = todo;
        } else {
          this.router.navigate(['/']);
        }
      });
    });
  }

  toggleStatus(): void {
    this.todoService.changeStatus(this.todo);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
