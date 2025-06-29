import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterCount } from './water-count';

describe('WaterCount', () => {
  let component: WaterCount;
  let fixture: ComponentFixture<WaterCount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterCount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterCount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
