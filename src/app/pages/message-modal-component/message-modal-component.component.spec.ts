import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageModalComponentComponent } from './message-modal-component.component';

describe('MessageModalComponentComponent', () => {
  let component: MessageModalComponentComponent;
  let fixture: ComponentFixture<MessageModalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageModalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
