import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article/article.service';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ArticleComponent],
  templateUrl: './acticle-list.component.html',
  styleUrls: ['./acticle-list.component.scss'],
  host: {
    class: 'article-list'
  }
})
export class ArticleListComponent implements OnInit {

  public articles$!: Observable<IArticle[]>;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles();
  }
}
