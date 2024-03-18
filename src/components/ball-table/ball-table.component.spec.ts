import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallTableComponent } from './ball-table.component';

describe('BallTableComponent', () => {
  let component: BallTableComponent;
  let fixture: ComponentFixture<BallTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BallTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
