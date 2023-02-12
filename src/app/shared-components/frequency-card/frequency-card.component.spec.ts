import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyCardComponent } from './frequency-card.component';

describe('FrequencyCardComponent', () => {
  let component: FrequencyCardComponent;
  let fixture: ComponentFixture<FrequencyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequencyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
