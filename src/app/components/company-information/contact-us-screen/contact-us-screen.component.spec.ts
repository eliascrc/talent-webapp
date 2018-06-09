import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsScreenComponent } from './contact-us-screen.component';

describe('ContactUsScreenComponent', () => {
  let component: ContactUsScreenComponent;
  let fixture: ComponentFixture<ContactUsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
