import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosListCardComponent } from './videos-list-card.component';

describe('VideosListCardComponent', () => {
  let component: VideosListCardComponent;
  let fixture: ComponentFixture<VideosListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
