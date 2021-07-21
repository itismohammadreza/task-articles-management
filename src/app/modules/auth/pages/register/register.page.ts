import { Component } from '@angular/core';
import { AuthService } from '@core/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ng-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {

  constructor(private authService: AuthService, private router: Router) {
  }

  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });
  destroySignal$ = new Subject<void>();

  async onSubmit() {
    if (this.form.valid) {
      await this.authService.register(this.form.value).pipe(takeUntil(this.destroySignal$)).toPromise();
      this.router.navigate(['/auth/login']);
    }
  }
}
