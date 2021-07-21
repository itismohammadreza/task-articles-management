import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { ErrorService } from '@core/utils';
import { UtilsService } from '@core/utils';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private title: Title,
    private errorService: ErrorService,
    private utilsService: UtilsService,
    private vcRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
    this.router.events.pipe(filter((e: any) => e instanceof ActivationStart)).subscribe((event: ActivatedRoute) => {
      const data = event.snapshot.data;
      this.title.setTitle(data['title']);
    });

    this.errorService.getError().subscribe((error) => {
      if (error) {
        this.utilsService.showToast(
          {
            summary: error.title,
            detail: error.message,
            severity: 'error',
            life: 10000
          },
          this.vcRef
        );
      }
    });
  }
}
