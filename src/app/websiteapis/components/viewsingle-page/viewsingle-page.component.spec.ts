import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsinglePageComponent } from './viewsingle-page.component';

describe('ViewsinglePageComponent', () => {
  let component: ViewsinglePageComponent;
  let fixture: ComponentFixture<ViewsinglePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsinglePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
