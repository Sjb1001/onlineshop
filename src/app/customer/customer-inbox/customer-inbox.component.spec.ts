import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInboxComponent } from './customer-inbox.component';

describe('CustomerInboxComponent', () => {
  let component: CustomerInboxComponent;
  let fixture: ComponentFixture<CustomerInboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerInboxComponent]
    });
    fixture = TestBed.createComponent(CustomerInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
