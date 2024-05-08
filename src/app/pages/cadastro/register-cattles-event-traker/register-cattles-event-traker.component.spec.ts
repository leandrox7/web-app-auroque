import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCattlesEventTrakerComponent } from './register-cattles-event-traker.component';

describe('RegisterCattlesEventTrakerComponent', () => {
  let component: RegisterCattlesEventTrakerComponent;
  let fixture: ComponentFixture<RegisterCattlesEventTrakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCattlesEventTrakerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCattlesEventTrakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
