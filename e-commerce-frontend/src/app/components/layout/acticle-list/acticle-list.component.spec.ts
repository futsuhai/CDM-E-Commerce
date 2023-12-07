import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActicleListComponent } from './acticle-list.component';

describe('ActicleListComponent', () => {
  let component: ActicleListComponent;
  let fixture: ComponentFixture<ActicleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActicleListComponent]
    });
    fixture = TestBed.createComponent(ActicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
