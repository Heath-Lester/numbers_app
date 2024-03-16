import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTableComponent } from './number-table.component';

describe('NumberTableComponent', () => {
  let component: NumberTableComponent;
  let fixture: ComponentFixture<NumberTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
