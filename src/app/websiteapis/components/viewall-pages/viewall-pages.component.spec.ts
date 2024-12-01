import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallPagesComponent } from './viewall-pages.component';

describe('ViewallPagesComponent', () => {
  let component: ViewallPagesComponent;
  let fixture: ComponentFixture<ViewallPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewallPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
