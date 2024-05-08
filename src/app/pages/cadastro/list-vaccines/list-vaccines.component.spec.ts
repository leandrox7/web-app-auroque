import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVaccinesComponent } from './list-vaccines.component';

describe('ListVaccinesComponent', () => {
  let component: ListVaccinesComponent;
  let fixture: ComponentFixture<ListVaccinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVaccinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListVaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
