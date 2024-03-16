import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberDetailsComponent } from './number-details.component';

describe('NumberDetailsComponent', () => {
  let component: NumberDetailsComponent;
  let fixture: ComponentFixture<NumberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
