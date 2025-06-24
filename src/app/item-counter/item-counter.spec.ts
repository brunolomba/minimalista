import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCounter } from './item-counter';

describe('ItemCounter', () => {
  let component: ItemCounter;
  let fixture: ComponentFixture<ItemCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCounter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
