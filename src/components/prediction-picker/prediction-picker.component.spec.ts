import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionPickerComponent } from './prediction-picker.component';

describe('PredictionPickerComponent', () => {
  let component: PredictionPickerComponent;
  let fixture: ComponentFixture<PredictionPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictionPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
