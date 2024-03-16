import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsViewComponent } from './predictions-view.component';

describe('PredictionsViewComponent', () => {
  let component: PredictionsViewComponent;
  let fixture: ComponentFixture<PredictionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
