import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallDetailsComponent } from './ball-details.component';

describe('BallDetailsComponent', () => {
  let component: BallDetailsComponent;
  let fixture: ComponentFixture<BallDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BallDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
