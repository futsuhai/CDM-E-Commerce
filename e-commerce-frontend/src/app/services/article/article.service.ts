import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { IArticle } from 'src/app/models/article.model';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  get api(): string {
    return `/api/articles`;
  }

  constructor(private restService: RestService) { }

  public getArticles(): Observable<IArticle[]> {
    const endpoint: string = `${this.api}/GetArticles`;
    return this.restService.restGET<IArticle[]>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log('An error occurred while fetching articles:', error);
        return [];
      })
    );
  }
}
