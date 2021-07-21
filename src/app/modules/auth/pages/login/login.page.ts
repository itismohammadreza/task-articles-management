import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ag-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnDestroy {
  constructor(private authService: AuthService, private router: Router) {
  }

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  destroySignal$ = new Subject<void>();

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).pipe(takeUntil(this.destroySignal$)).subscribe((res: any) => {
        if (res) {
          localStorage.setItem('token', res.user.token);
          this.router.navigate(['/']);
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroySignal$.next();
    this.destroySignal$.complete();
  }
}
