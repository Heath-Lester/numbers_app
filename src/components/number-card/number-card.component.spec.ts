import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberCardComponent } from './number-card.component';

describe('NumberCardComponent', () => {
  let component: NumberCardComponent;
  let fixture: ComponentFixture<NumberCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
