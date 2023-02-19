import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailsPageComponent } from './video-details-page.component';

describe('VideoDetailsPageComponent', () => {
  let component: VideoDetailsPageComponent;
  let fixture: ComponentFixture<VideoDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
