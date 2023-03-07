import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoUploadVideosComponent } from './add-video-upload-videos.component';

describe('AddVideoUploadVideosComponent', () => {
  let component: AddVideoUploadVideosComponent;
  let fixture: ComponentFixture<AddVideoUploadVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideoUploadVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideoUploadVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
