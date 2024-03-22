import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaBallDetailsComponent } from './mega-ball-details.component';

describe('MegaBallDetailsComponent', () => {
  let component: MegaBallDetailsComponent;
  let fixture: ComponentFixture<MegaBallDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaBallDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MegaBallDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
