import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListComponent } from './acticle-list.component';

describe('ActicleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ArticleListComponent]
});
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
