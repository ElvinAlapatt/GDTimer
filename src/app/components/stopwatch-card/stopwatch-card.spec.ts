import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopwatchCard } from './stopwatch-card';

describe('StopwatchCard', () => {
  let component: StopwatchCard;
  let fixture: ComponentFixture<StopwatchCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopwatchCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopwatchCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
