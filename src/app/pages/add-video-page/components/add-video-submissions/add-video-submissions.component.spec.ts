import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoSubmissionsComponent } from './add-video-submissions.component';

describe('AddVideoSubmissionsComponent', () => {
  let component: AddVideoSubmissionsComponent;
  let fixture: ComponentFixture<AddVideoSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideoSubmissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideoSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
