import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallTableFilterComponent } from './ball-table-filter.component';

describe('BallTableFilterComponent', () => {
  let component: BallTableFilterComponent;
  let fixture: ComponentFixture<BallTableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallTableFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BallTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
