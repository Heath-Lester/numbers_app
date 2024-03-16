import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionDetailsComponent } from './prediction-details.component';

describe('PredictionDetailsComponent', () => {
  let component: PredictionDetailsComponent;
  let fixture: ComponentFixture<PredictionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
