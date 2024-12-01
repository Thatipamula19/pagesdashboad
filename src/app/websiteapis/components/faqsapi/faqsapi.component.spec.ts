import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsapiComponent } from './faqsapi.component';

describe('FaqsapiComponent', () => {
  let component: FaqsapiComponent;
  let fixture: ComponentFixture<FaqsapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqsapiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
