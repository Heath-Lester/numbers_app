import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallSelectionTableComponent } from './ball-selection-table.component';

describe('BallSelectionTableComponent', () => {
  let component: BallSelectionTableComponent;
  let fixture: ComponentFixture<BallSelectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallSelectionTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BallSelectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
