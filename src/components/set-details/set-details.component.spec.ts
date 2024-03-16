import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDetailsComponent } from './set-details.component';

describe('SetDetailsComponent', () => {
  let component: SetDetailsComponent;
  let fixture: ComponentFixture<SetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
