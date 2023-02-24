import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailsCardComponent } from './video-details-card.component';

describe('VideoDetailsCardComponent', () => {
  let component: VideoDetailsCardComponent;
  let fixture: ComponentFixture<VideoDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
