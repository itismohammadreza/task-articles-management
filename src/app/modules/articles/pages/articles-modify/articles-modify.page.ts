import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '@core/http';
import { UtilsService } from '@core/utils';

@Component({
  selector: 'ng-articles-modify',
  templateUrl: './articles-modify.page.html',
  styleUrls: ['./articles-modify.page.scss']
})
export class ArticlesModifyPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private utilsService: UtilsService,
              private vcRef: ViewContainerRef,
              private articleService: ArticleService) {
  }

  pageHeader: string = 'Add Article';
  slug: string;
  disableForm: boolean = false;
  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required])
  });
  tags: string[] = [];
  selectedTags: string[] = [];

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.loadTags();
  }

  async loadTags() {
    this.tags = await this.articleService.getTags().toPromise();
    if (this.slug) {
      this.pageHeader = 'Edit Article';
      this.handleEditArticle();
    }
  }

  onAddTag(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value;
      if (!this.tags.includes(value)) {
        this.tags.push(value);
        this.selectedTags.push(value);
      }
    }
  }

  async handleEditArticle(): Promise<void> {
    const article = await this.articleService.getBySlug(this.slug).toPromise();
    const {title, description, body, tagList} = article;
    this.form.setValue({title, description, body});
    this.tags.push(...tagList.filter(t => !this.tags.includes(t)));
    this.selectedTags = tagList;
  }

  async onSubmitForm(): Promise<void> {
    if (this.form.valid) {
      this.disableForm = true;
      if (this.slug) {
        await this.articleService.put({
          ...this.form.value,
          slug: this.slug,
          tagList: this.selectedTags
        }).toPromise().catch(err => this.disableForm = false);
        this.utilsService.successfullToast('Article updated successfully', this.vcRef);
      }
      else {
        await this.articleService.post({
          ...this.form.value,
          tagList: this.selectedTags
        }).toPromise().catch(err => this.disableForm = false);
        this.utilsService.successfullToast('Article created successfully', this.vcRef);
      }
      setTimeout(() => {
        this.disableForm = false;
        this.router.navigate(['/']);
      }, 3000);
    }
  }
}
