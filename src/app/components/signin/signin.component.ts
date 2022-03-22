import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from './../../interface/user';
import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) {}

  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    created_at: '',
  };

  ngOnInit(): void {}

  onSubmit() {
    const { email, password } = this.user;

    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: ({ message }) => `There was an error: ${message} `,
        })
      )
      .subscribe((res) => {
        this.router.navigate(['/']);
      });
  }
}
