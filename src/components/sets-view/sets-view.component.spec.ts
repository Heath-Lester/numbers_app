import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsViewComponent } from './sets-view.component';

describe('SetsViewComponent', () => {
  let component: SetsViewComponent;
  let fixture: ComponentFixture<SetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
