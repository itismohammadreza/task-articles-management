import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: '',
        redirectTo: 'articles'
      },
      {
        path: 'articles',
        loadChildren: (): Promise<any> =>
          import('./articles/articles.module').then((m) => m.ArticlesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
