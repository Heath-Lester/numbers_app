import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersViewComponent } from './numbers-view.component';

describe('NumbersViewComponent', () => {
  let component: NumbersViewComponent;
  let fixture: ComponentFixture<NumbersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumbersViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumbersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
