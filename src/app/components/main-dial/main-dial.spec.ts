import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDial } from './main-dial';

describe('MainDial', () => {
  let component: MainDial;
  let fixture: ComponentFixture<MainDial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
