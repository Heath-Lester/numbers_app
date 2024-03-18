import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaBallTableComponent } from './mega-ball-table.component';

describe('MegaBallTableComponent', () => {
  let component: MegaBallTableComponent;
  let fixture: ComponentFixture<MegaBallTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaBallTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MegaBallTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
