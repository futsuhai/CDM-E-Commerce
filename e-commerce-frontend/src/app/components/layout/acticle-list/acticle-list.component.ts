import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-acticle-list',
  templateUrl: './acticle-list.component.html',
  styleUrls: ['./acticle-list.component.scss'],
  host: {
    class: 'article-list'
  }
})
export class ActicleListComponent implements OnInit {

  public articles$!: Observable<IArticle[]>;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles();
  }
}
