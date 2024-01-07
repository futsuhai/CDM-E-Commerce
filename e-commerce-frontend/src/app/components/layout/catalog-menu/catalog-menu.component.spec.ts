import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogMenuComponent } from './catalog-menu.component';

describe('CatalogMenuComponent', () => {
  let component: CatalogMenuComponent;
  let fixture: ComponentFixture<CatalogMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalogMenuComponent]
    });
    fixture = TestBed.createComponent(CatalogMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
