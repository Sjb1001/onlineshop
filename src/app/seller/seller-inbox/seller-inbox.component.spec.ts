import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerInboxComponent } from './seller-inbox.component';

describe('SellerInboxComponent', () => {
  let component: SellerInboxComponent;
  let fixture: ComponentFixture<SellerInboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerInboxComponent]
    });
    fixture = TestBed.createComponent(SellerInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
