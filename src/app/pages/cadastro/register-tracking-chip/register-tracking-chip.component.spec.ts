import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTrackingChipComponent } from './register-tracking-chip.component';

describe('RegisterTrackingChipComponent', () => {
  let component: RegisterTrackingChipComponent;
  let fixture: ComponentFixture<RegisterTrackingChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTrackingChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterTrackingChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
