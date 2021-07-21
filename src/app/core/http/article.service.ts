import { Injectable } from '@angular/core';
import { ApiService } from '@core/http';
import { Observable } from 'rxjs';
import { Article } from '@shared/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends ApiService {
  private readonly endpoint: string = 'articles';

  constructor() {
    super();
  }

  get(page?: number): Observable<{ articles: Article[], articlesCount: number }> {
    return this._get(this.endpoint, {offset: (page - 1) * 10});
  }

  getBySlug(slug: string): Observable<Article> {
    return this._get<Article>(`${this.endpoint}/${slug}`, null, 'article');
  }

  post(article: Article) {
    return this._post(`${this.endpoint}`, {article});
  }

  put(article: Article) {
    return this._put(`${this.endpoint}/${article.slug}`, {article});
  }

  delete(slug: string) {
    return this._delete(`${this.endpoint}/${slug}`);
  }

  getTags(): Observable<string[]> {
    return this._get('tags', null, 'tags');
  }
}
