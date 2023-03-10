import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoQuestionComponent } from './add-video-question.component';

describe('AddVideoQuestionComponent', () => {
  let component: AddVideoQuestionComponent;
  let fixture: ComponentFixture<AddVideoQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVideoQuestionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddVideoQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
