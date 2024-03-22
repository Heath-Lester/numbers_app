import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaBallViewComponent } from './mega-ball-view.component';

describe('MegaBallViewComponent', () => {
  let component: MegaBallViewComponent;
  let fixture: ComponentFixture<MegaBallViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaBallViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MegaBallViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
