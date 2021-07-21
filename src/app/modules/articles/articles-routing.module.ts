import { NgModule, Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesListPage } from '@modules/articles/pages/articles-list/articles-list.page';
import { ArticlesModifyPage } from '@modules/articles/pages/articles-modify/articles-modify.page';

const routes: Routes = [
  {
    path: '',
    component: ArticlesListPage
  },
  {
    path: 'page/:page',
    component: ArticlesListPage
  },
  {
    path: 'create',
    component: ArticlesModifyPage
  },
  {
    path: 'edit/:slug',
    component: ArticlesModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {
}
