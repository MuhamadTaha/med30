import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoChooseAudienceComponent } from './add-video-choose-audience.component';

describe('AddVideoChooseAudienceComponent', () => {
  let component: AddVideoChooseAudienceComponent;
  let fixture: ComponentFixture<AddVideoChooseAudienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideoChooseAudienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideoChooseAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
