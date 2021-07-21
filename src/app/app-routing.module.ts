import { NgModule, Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: (): Promise<Type<any>> =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    loadChildren: (): Promise<Type<any>> =>
      import('./modules/main.module').then((m) => m.MainModule),
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
