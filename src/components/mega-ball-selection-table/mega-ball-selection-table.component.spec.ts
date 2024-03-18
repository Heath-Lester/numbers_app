import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaBallSelectionTableComponent } from './mega-ball-selection-table.component';

describe('MegaBallSelectionTableComponent', () => {
  let component: MegaBallSelectionTableComponent;
  let fixture: ComponentFixture<MegaBallSelectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaBallSelectionTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MegaBallSelectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
