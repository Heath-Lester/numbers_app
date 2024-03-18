import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallViewComponent } from './ball-view.component';

describe('BallViewComponent', () => {
  let component: BallViewComponent;
  let fixture: ComponentFixture<BallViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BallViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
