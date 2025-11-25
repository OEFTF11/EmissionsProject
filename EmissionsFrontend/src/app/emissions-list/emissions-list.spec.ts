import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionsList } from './emissions-list';

describe('EmissionsList', () => {
  let component: EmissionsList;
  let fixture: ComponentFixture<EmissionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmissionsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
