import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromoModalComponent } from './add-promo-modal.component';

describe('AddPromoModalComponent', () => {
  let component: AddPromoModalComponent;
  let fixture: ComponentFixture<AddPromoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPromoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
