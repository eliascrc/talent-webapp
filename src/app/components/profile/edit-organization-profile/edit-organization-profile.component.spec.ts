import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganizationProfileComponent } from './edit-organization-profile.component';

describe('EditOrganizationProfileComponent', () => {
  let component: EditOrganizationProfileComponent;
  let fixture: ComponentFixture<EditOrganizationProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrganizationProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrganizationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
