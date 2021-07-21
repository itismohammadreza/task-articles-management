import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ArticleService } from '@core/http';
import { TableColDef, Article } from '@shared/models';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UtilsService } from '@core/utils';

@Component({
  selector: 'ng-articles-list',
  templateUrl: './articles-list.page.html',
  styleUrls: ['./articles-list.page.scss']
})
export class ArticlesListPage implements OnInit {

  constructor(private articleService: ArticleService,
              private confirmService: ConfirmationService,
              private vcRef: ViewContainerRef,
              private utilsService: UtilsService,
              private router: Router) {
  }

  articles: Article[];
  articlesCount: number;
  colDef: TableColDef[] = [
    {field: 'title', header: 'Title'},
    {field: 'author.username', header: 'Author'},
    {field: 'tags', header: 'Tags'},
    {field: 'body', header: 'Excerpt', limitTo: 20},
    {field: 'createdAt', header: 'Created'}
  ];
  actions: SelectItem[] = [{label: 'Edit', value: 'edit'}, {label: 'Delete', value: 'delete'}];

  ngOnInit(): void {
    this.loadData(1);
  }

  async loadData(page: number): Promise<void> {
    const {articles, articlesCount} = await this.articleService.get(page).toPromise();
    this.articles = articles;
    this.articlesCount = articlesCount;
  }

  onPageChange(event: any) {
    this.loadData(event.page + 1);
  }

  onSelectAction(action: any, item: Article, index: number) {
    switch (action.value) {
      case 'delete':
        this.confirmService.confirm({
          header: 'Delete Article',
          message: 'Are you sure to delete article?',
          acceptButtonStyleClass: 'p-button-danger',
          rejectButtonStyleClass: 'p-button-outlined',
          accept: async () => {
            await this.articleService.delete(item.slug).toPromise();
            this.articles.splice(index, 1);
            this.utilsService.successfullToast('Article deleted successfully', this.vcRef);
          }
        });
        break;
      case 'edit':
        this.router.navigate(['/articles/edit', item.slug]);
    }
  }
}
