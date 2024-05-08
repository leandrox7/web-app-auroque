import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCattlesComponent } from './list-cattles.component';

describe('ListCattlesComponent', () => {
  let component: ListCattlesComponent;
  let fixture: ComponentFixture<ListCattlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCattlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCattlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
