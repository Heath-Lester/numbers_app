import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTableFilterComponent } from './set-table-filter.component';

describe('SetTableFilterComponent', () => {
  let component: SetTableFilterComponent;
  let fixture: ComponentFixture<SetTableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetTableFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
