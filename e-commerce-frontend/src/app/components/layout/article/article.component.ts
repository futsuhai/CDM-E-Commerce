import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/models/article.model';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  host: {
    class: 'article'
  }
})
export class ArticleComponent {

  @Input() article!: IArticle;

  // Вот в такой записи, ангуляр будет ругаться, если ты забудешь передать пропс внутрь компонента
  // @Input({required: true}) article!: IArticle;
}
