import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoSurveyComponent } from './add-video-survey.component';

describe('AddVideoSurveyComponent', () => {
  let component: AddVideoSurveyComponent;
  let fixture: ComponentFixture<AddVideoSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVideoSurveyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddVideoSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
