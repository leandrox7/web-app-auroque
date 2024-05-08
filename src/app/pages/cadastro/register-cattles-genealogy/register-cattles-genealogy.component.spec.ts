import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCattlesGenealogyComponent } from './register-cattles-genealogy.component';

describe('RegisterCattlesGenealogyComponent', () => {
  let component: RegisterCattlesGenealogyComponent;
  let fixture: ComponentFixture<RegisterCattlesGenealogyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCattlesGenealogyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCattlesGenealogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
